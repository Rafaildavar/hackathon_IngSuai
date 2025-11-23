# Hackathon_Ing_SUAI - AI Document Processor

## Overview

This is a modern web application designed for the Hackathon_Ing_SUAI event that enables users to upload and process documents through an integrated AI model. The application accepts images, PDF files, and ZIP archives, processes them server-side using AI, and allows users to download the results. The system features a clean, minimalist interface with real-time progress tracking and drag-and-drop file upload capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework and Build System**
- **React with TypeScript**: Modern React application using TypeScript for type safety
- **Vite**: Fast development server and build tool with HMR (Hot Module Replacement)
- **Wouter**: Lightweight routing library for client-side navigation
- **Component Architecture**: Modular component structure with shadcn/ui components

**State Management**
- **TanStack Query (React Query)**: Server state management for API calls, caching, and synchronization
- **Local React State**: Component-level state using useState and useCallback hooks
- **File Upload Flow**: Manages file selection, upload progress, processing status, and download readiness

**UI Component System**
- **shadcn/ui**: Comprehensive UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Design System**: Custom color palette (primary: #1e3a8a, accent: #059669) with consistent spacing, typography (Inter font), and component styling
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop

**Key UI Components**
- `UploadZone`: Drag-and-drop file upload interface
- `FilePreview`: Individual file cards with removal capability
- `ProcessingStatus`: Real-time processing progress with animated indicators
- `DownloadSection`: Post-processing download interface

### Backend Architecture

**Server Framework**
- **Express.js**: Node.js web application framework
- **TypeScript**: Type-safe backend code with ES modules
- **Dual Entry Points**: Separate development (index-dev.ts with Vite middleware) and production (index-prod.ts serving static files) configurations

**File Processing Pipeline**
1. **Upload Handling**: Multer middleware for multipart/form-data with 50MB limit
2. **File Validation**: Type checking for images, PDFs, and ZIP files
3. **Storage**: Files saved to `uploads/` directory, processed files to `processed/` directory
4. **Task Management**: In-memory task tracking with unique IDs, status, and progress
5. **Processing Queue**: Background task system for AI processing (architecture prepared but AI integration pending)

**Storage Layer**
- **MemStorage**: In-memory storage implementation for processing tasks and uploaded files
- **Interface-Based Design**: IStorage interface allows future database integration
- **Task Tracking**: Processing tasks include status, progress, file count, and completion timestamps
- **File Metadata**: Tracks file name, type, size, path, and processing status

**API Design**
- `POST /api/upload`: Accepts files, creates processing task, returns task ID
- `GET /api/status/:task_id`: Polls for processing progress and status updates
- `GET /api/download/:task_id`: Downloads processed results (ZIP for multiple files)

**Error Handling**
- File type validation at upload
- File size limits (50MB)
- Error status tracking in task objects
- Client-friendly error messages via toast notifications

### Data Storage Solutions

**Current Implementation**
- **In-Memory Storage**: MemStorage class using JavaScript Maps for tasks and files
- **File System**: Physical files stored in `uploads/` and `processed/` directories
- **Session Management**: Prepared for connect-pg-simple session store (currently unused)

**Database Schema (Prepared for PostgreSQL)**
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **processing_tasks table**: Tracks processing jobs with status, progress, timestamps
- **uploaded_files table**: Links files to tasks with metadata
- **Schema Location**: `shared/schema.ts` with Zod validation schemas

**Migration Strategy**
- Drizzle Kit configured for schema migrations
- Connection via Neon serverless PostgreSQL driver
- Current storage is memory-based; database integration ready for production scaling

### Authentication and Authorization

**Current State**
- No authentication system implemented
- Application designed for open access during hackathon
- Session infrastructure present but unused (connect-pg-simple dependency)

**Future Considerations**
- Session storage configured for PostgreSQL
- Cookie-based session management infrastructure in place
- Express session middleware can be added for user authentication

## External Dependencies

### Third-Party Services

**Database (Configured but Optional)**
- **Neon Serverless PostgreSQL**: Cloud PostgreSQL database
- **Environment Variable**: `DATABASE_URL` for connection string
- **Current Status**: Schema defined, migrations configured, but in-memory storage used in implementation

### Libraries and Frameworks

**Frontend Core**
- React 18+ with TypeScript
- Vite for development and building
- TanStack Query for data fetching
- Wouter for routing
- React Hook Form with Zod resolvers for form validation

**UI Components**
- Radix UI primitives (30+ component primitives)
- Tailwind CSS for styling
- Lucide React for icons
- shadcn/ui component patterns

**Backend Core**
- Express.js web framework
- Multer for file uploads
- Archiver for ZIP file creation
- Drizzle ORM for database operations

**Development Tools**
- TypeScript compiler
- ESBuild for production builds
- Replit-specific plugins for development environment integration

### File Processing

**Current Capabilities**
- **Supported Formats**: JPEG, PNG, GIF, WebP images; PDF documents; ZIP archives
- **File Handling**: Multer with memory storage for upload buffering
- **Archive Creation**: Archiver library for packaging multiple processed files

**AI Integration (Prepared)**
- Infrastructure for AI processing pipeline in place
- Task queue system ready for asynchronous processing
- Progress tracking system supports incremental updates
- Actual AI model integration pending (placeholder in prompt materials)

### API Integrations

**No External APIs Currently**
- Application is self-contained
- AI processing designed to run on server (local model integration pending)
- No third-party API calls for document processing