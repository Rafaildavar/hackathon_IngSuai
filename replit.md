# Hackathon_Ing_SUAI - AI Document Processor

## Overview

Modern, multi-page web application for the Hackathon_Ing_SUAI event with AI-powered document processing. Features a beautiful landing page, comprehensive file upload/processing workflow, task history tracking, RESTful API with Swagger documentation, and informative about page. The application accepts images (JPG, PNG, GIF, WebP), PDF files, and ZIP archives, processes them with simulated AI, and provides downloadable results with real-time progress tracking.

## User Preferences

- **Design Philosophy**: Modern 2025 design trends including glassmorphism, smooth gradients, and minimalist aesthetics
- **Communication Style**: Simple, everyday language
- **Architecture Approach**: Full-stack with React frontend + Express backend, in-memory storage for hackathon use

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with HMR
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: 
  - TanStack Query (React Query) for server state
  - React hooks for component state
- **UI Components**: Shadcn/ui (30+ Radix UI primitives)
- **Styling**: 
  - Tailwind CSS with custom design system
  - Modern CSS features (gradients, backdrop-blur, animations)
  - CSS variables for theme support
- **Icons**: Lucide React (modern, consistent icons)
- **Form Handling**: React Hook Form + Zod validation

### Backend
- **Server**: Express.js with TypeScript
- **File Handling**: 
  - Multer for multipart form uploads (50MB limit)
  - Archiver for ZIP creation/packaging
- **Storage**: In-memory storage (MemStorage) with Maps
- **API Documentation**: Swagger UI Express with OpenAPI 3.0
- **Database**: PostgreSQL configured (Neon) but in-memory storage used for demo
- **ORM**: Drizzle ORM (configured, schema prepared)

## Project Structure

```
project-root/
├── client/src/
│   ├── pages/
│   │   ├── LandingPage.tsx          # Modern hero landing page
│   │   ├── UploadPage.tsx           # File upload and processing workflow
│   │   ├── HistoryPage.tsx          # Task history and status tracking
│   │   ├── ApiDocsPage.tsx          # API documentation page
│   │   ├── AboutPage.tsx            # About, FAQ, tech stack
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── AppSidebar.tsx           # Main navigation sidebar
│   │   ├── UploadZone.tsx           # Drag-drop upload interface
│   │   ├── FilePreview.tsx          # File cards with metadata
│   │   ├── ProcessingStatus.tsx     # Real-time progress indicator
│   │   ├── DownloadSection.tsx      # Post-processing download UI
│   │   ├── LoadingSkeleton.tsx      # Loading state
│   │   ├── Header.tsx               # App header
│   │   └── ui/                      # Shadcn UI components
│   ├── App.tsx                      # Main app with sidebar layout
│   ├── index.css                    # Global styles with glassmorphism
│   └── lib/                         # Utilities and helpers
├── server/
│   ├── routes.ts                    # All API endpoints
│   ├── storage.ts                   # In-memory storage implementation
│   ├── swagger.ts                   # OpenAPI documentation
│   ├── index-dev.ts                 # Dev entry point with Vite middleware
│   └── index-prod.ts                # Production entry point
├── shared/
│   └── schema.ts                    # Shared TypeScript/Zod schemas
├── design_guidelines.md             # Comprehensive design documentation
└── vite.config.ts                   # Vite configuration

```

## Architecture

### Frontend Architecture

**Multi-Page Application with Sidebar Navigation**
- SidebarProvider from Shadcn wraps entire app
- AppSidebar with main navigation (Home, Upload, History, API, About)
- Wouter handles client-side routing between pages
- Page layout: Header bar + scrollable main content area

**Modern Design System**
- Color scheme with primary (#1e3a8a) and accent (#059669)
- Glassmorphism effects (frosted glass, blur backgrounds)
- Smooth animations and transitions
- Dark/light mode support via CSS variables
- Responsive design (mobile-first, tablet, desktop)

**State Management**
- TanStack Query for API calls with caching
- React hooks for local component state
- Polling mechanism for real-time status updates (2-second intervals)
- File upload state management with FormData

**Pages**
1. **Landing Page**: Hero section with gradient mesh, features grid, stats, CTA section, footer
2. **Upload Page**: Drag-drop zone, file preview grid, processing status, download section
3. **History Page**: Task list with filtering, status badges, download buttons
4. **API Docs Page**: Swagger UI embed, endpoint documentation with examples
5. **About Page**: How-it-works guide, FAQ accordion, supported formats, tech stack

### Backend Architecture

**API Endpoints**
- `POST /api/upload` - File upload with multer (50MB limit, multi-file support)
- `GET /api/status/:taskId` - Polling for task progress
- `GET /api/tasks` - Retrieve all processing tasks (task history)
- `GET /api/download/:taskId` - Download results as ZIP
- `GET /api-docs` - Swagger UI for interactive API documentation

**Processing Pipeline**
1. Files uploaded to memory storage via multer
2. Task created with unique ID and initial status
3. Background simulation of AI processing (1-3 seconds per file)
4. Real-time progress updates stored in memory
5. Results packaged as ZIP for download
6. Task and files tracked with metadata

**Storage System**
- MemStorage class implements IStorage interface
- Uses JavaScript Maps for in-memory storage
- Supports task CRUD operations
- File metadata tracking per task
- Future-proof for database migration

**Error Handling**
- File type validation (images, PDFs, ZIPs only)
- File size limits enforced
- Proper HTTP status codes and error messages
- Graceful error display to users via toast notifications

## Design Guidelines

Modern 2025 design with:
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Gradient Meshes**: Smooth color transitions and subtle animations
- **Minimalist Layout**: Generous whitespace, clear visual hierarchy
- **Smooth Interactions**: 300ms transitions, subtle hover effects
- **Typography**: Inter font, bold headings (4xl-7xl), clear body text
- **Color System**: Professional primary (#1e3a8a) and accent (#059669) with dark mode support
- **Responsive**: Mobile-first approach with adaptive layouts
- **Accessibility**: Proper contrast, semantic HTML, keyboard navigation

See `design_guidelines.md` for complete design documentation.

## Data Models

All schemas defined in `shared/schema.ts` using Drizzle ORM:

### ProcessingTask
- id: UUID (primary key)
- status: 'pending' | 'processing' | 'completed' | 'failed'
- progress: 0-100 (percentage)
- fileCount: number
- processedCount: number
- originalFileName: string | null
- createdAt: Date
- completedAt: Date | null
- error: string | null

### UploadedFile
- id: UUID (primary key)
- taskId: UUID (foreign key)
- fileName: string
- fileType: string (MIME type)
- fileSize: number (bytes)
- filePath: string
- status: 'pending' | 'processed'
- createdAt: Date

## API Documentation

Full OpenAPI 3.0 specification included:
- **Swagger UI**: Available at `/api-docs` (interactive endpoint tester)
- **Documentation**: Complete endpoint descriptions with request/response schemas
- **Examples**: Code examples for curl, JavaScript, Python
- **Frontend Page**: `/api` route shows API documentation with tabs

## Setup & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Starts:
   - Express backend on port 5000
   - Vite frontend dev server (HMR enabled)
   - Both accessible at `http://localhost:5000`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Production Server**
   ```bash
   npm run start
   ```

## Key Features

✅ **Multi-Format File Support**: JPEG, PNG, GIF, WebP, PDF, ZIP
✅ **Drag & Drop Upload**: Intuitive file selection interface
✅ **Real-Time Progress**: Polling-based status updates
✅ **Batch Processing**: Upload multiple files at once
✅ **Task History**: Track all processing jobs
✅ **RESTful API**: Full API with Swagger documentation
✅ **Modern Design**: Glassmorphism, smooth animations, responsive
✅ **Dark Mode**: Built-in light/dark mode support
✅ **TypeScript**: Type-safe frontend and backend
✅ **Production Ready**: Proper error handling, validation, security

## Future Enhancements

- Database migration (PostgreSQL via Drizzle)
- Real AI model integration
- User authentication and session management
- File cleanup policies (cron jobs)
- Rate limiting
- Advanced filtering in task history
- Export task results
- Analytics and usage statistics

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection (optional, uses in-memory storage for demo)
- `SESSION_SECRET`: Session encryption key (configured for future auth)
- `NODE_ENV`: development or production

## Notes for Hackathon

- In-memory storage resets when server restarts
- Files stored temporarily in `uploads/` and `processed/` directories
- AI processing is simulated (1-3 seconds per file)
- No authentication - open access for demonstration
- Fully functional MVP ready for showcase
