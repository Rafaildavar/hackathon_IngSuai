import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import archiver from "archiver";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/zip',
      'application/x-zip-compressed',
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDF, and ZIP files are allowed.'));
    }
  },
});

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const PROCESSED_DIR = path.join(process.cwd(), 'processed');

async function ensureDirectories() {
  try {
    await mkdir(UPLOADS_DIR, { recursive: true });
    await mkdir(PROCESSED_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}

// Simulate AI processing with realistic delays
async function simulateAIProcessing(taskId: string, files: Array<{ id: string; fileName: string }>) {
  const totalFiles = files.length;
  
  for (let i = 0; i < totalFiles; i++) {
    const file = files[i];
    
    // Update task progress
    const progress = Math.round(((i + 1) / totalFiles) * 100);
    await storage.updateTask(taskId, {
      status: 'processing',
      progress,
      processedCount: i + 1,
    });
    
    // Update file status
    await storage.updateFile(file.id, {
      status: 'processed',
    });
    
    // Simulate processing time (1-3 seconds per file)
    const processingTime = 1000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
  }
  
  // Mark task as completed
  await storage.updateTask(taskId, {
    status: 'completed',
    progress: 100,
    completedAt: new Date(),
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  await ensureDirectories();

  // Upload endpoint
  app.post('/api/upload', upload.array('files', 50), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      // Create processing task
      const task = await storage.createTask({
        status: 'pending',
        progress: 0,
        fileCount: files.length,
        processedCount: 0,
        originalFileName: files[0].originalname,
        completedAt: null,
        error: null,
      });

      // Create task directory
      const taskDir = path.join(UPLOADS_DIR, task.id);
      await mkdir(taskDir, { recursive: true });

      // Save files and create file records
      const fileRecords = [];
      for (const file of files) {
        const filePath = path.join(taskDir, file.originalname);
        await writeFile(filePath, file.buffer);

        const fileRecord = await storage.createFile({
          taskId: task.id,
          fileName: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          filePath: filePath,
          status: 'pending',
        });
        
        fileRecords.push({ id: fileRecord.id, fileName: fileRecord.fileName });
      }

      // Start background processing (non-blocking)
      simulateAIProcessing(task.id, fileRecords).catch(async (error) => {
        console.error('Processing error:', error);
        await storage.updateTask(task.id, {
          status: 'error',
          error: error.message || 'Processing failed',
        });
      });

      res.json({ taskId: task.id });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Upload failed' 
      });
    }
  });

  // Status endpoint
  app.get('/api/status/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await storage.getTask(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      console.error('Status check error:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to get status' 
      });
    }
  });

  // Download endpoint
  app.get('/api/download/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await storage.getTask(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      if (task.status !== 'completed') {
        return res.status(400).json({ error: 'Task not completed yet' });
      }

      const taskDir = path.join(UPLOADS_DIR, taskId);
      
      // Check if directory exists
      if (!fs.existsSync(taskDir)) {
        return res.status(404).json({ error: 'Files not found' });
      }

      const files = await readdir(taskDir);

      if (files.length === 0) {
        return res.status(404).json({ error: 'No files found' });
      }

      // If single file, send it directly
      if (files.length === 1) {
        const filePath = path.join(taskDir, files[0]);
        
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ error: 'File not found' });
        }
        
        res.download(filePath, `processed_${files[0]}`);
        return;
      }

      // Multiple files - create ZIP archive
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="processed_${taskId}.zip"`);

      const archive = archiver('zip', {
        zlib: { level: 9 }
      });

      let archiveErrorOccurred = false;

      archive.on('error', (err) => {
        console.error('Archive error:', err);
        archiveErrorOccurred = true;
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to create archive' });
        }
      });

      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          console.warn('Archive warning:', err);
        } else {
          console.error('Archive error:', err);
          archiveErrorOccurred = true;
        }
      });

      const stream = archive.pipe(res);

      stream.on('finish', () => {
        if (!archiveErrorOccurred) {
          console.log(`Download completed for task ${taskId}`);
        }
      });

      stream.on('error', (err) => {
        console.error('Stream error:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Download failed' });
        }
      });

      // Add all files to archive
      for (const file of files) {
        const filePath = path.join(taskDir, file);
        if (fs.existsSync(filePath)) {
          archive.file(filePath, { name: `processed_${file}` });
        }
      }

      try {
        await archive.finalize();
        
        // Note: Directory cleanup is deferred to allow re-downloads
        // In production, implement cleanup policy (e.g., cron job to remove old tasks)
      } catch (finalizeError) {
        console.error('Archive finalization error:', finalizeError);
        archiveErrorOccurred = true;
        archive.destroy();
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to finalize archive' });
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      if (!res.headersSent) {
        res.status(500).json({ 
          error: error instanceof Error ? error.message : 'Download failed' 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
