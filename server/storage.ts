import { type ProcessingTask, type InsertProcessingTask, type UploadedFile, type InsertUploadedFile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Processing Tasks
  createTask(task: InsertProcessingTask): Promise<ProcessingTask>;
  getTask(id: string): Promise<ProcessingTask | undefined>;
  getAllTasks(): Promise<ProcessingTask[]>;
  updateTask(id: string, updates: Partial<ProcessingTask>): Promise<ProcessingTask | undefined>;
  
  // Uploaded Files
  createFile(file: InsertUploadedFile): Promise<UploadedFile>;
  getFilesByTaskId(taskId: string): Promise<UploadedFile[]>;
  updateFile(id: string, updates: Partial<UploadedFile>): Promise<UploadedFile | undefined>;
}

export class MemStorage implements IStorage {
  private tasks: Map<string, ProcessingTask>;
  private files: Map<string, UploadedFile>;

  constructor() {
    this.tasks = new Map();
    this.files = new Map();
  }

  async createTask(insertTask: InsertProcessingTask): Promise<ProcessingTask> {
    const id = randomUUID();
    const task: ProcessingTask = {
      id,
      status: insertTask.status || "pending",
      progress: insertTask.progress || 0,
      fileCount: insertTask.fileCount || 0,
      processedCount: insertTask.processedCount || 0,
      originalFileName: insertTask.originalFileName || null,
      createdAt: new Date(),
      completedAt: insertTask.completedAt || null,
      error: insertTask.error || null,
    };
    this.tasks.set(id, task);
    return task;
  }

  async getTask(id: string): Promise<ProcessingTask | undefined> {
    return this.tasks.get(id);
  }

  async getAllTasks(): Promise<ProcessingTask[]> {
    return Array.from(this.tasks.values());
  }

  async updateTask(id: string, updates: Partial<ProcessingTask>): Promise<ProcessingTask | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...updates };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async createFile(insertFile: InsertUploadedFile): Promise<UploadedFile> {
    const id = randomUUID();
    const file: UploadedFile = {
      id,
      taskId: insertFile.taskId,
      fileName: insertFile.fileName,
      fileType: insertFile.fileType,
      fileSize: insertFile.fileSize,
      filePath: insertFile.filePath,
      status: insertFile.status || "pending",
      createdAt: new Date(),
    };
    this.files.set(id, file);
    return file;
  }

  async getFilesByTaskId(taskId: string): Promise<UploadedFile[]> {
    return Array.from(this.files.values()).filter(
      (file) => file.taskId === taskId
    );
  }

  async updateFile(id: string, updates: Partial<UploadedFile>): Promise<UploadedFile | undefined> {
    const file = this.files.get(id);
    if (!file) return undefined;
    
    const updatedFile = { ...file, ...updates };
    this.files.set(id, updatedFile);
    return updatedFile;
  }
}

export const storage = new MemStorage();
