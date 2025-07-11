# SkillMate Learning Platform

## Overview

This is a full-stack web application built with React, Express.js, and PostgreSQL that serves as a learning platform called "SkillMate." The application allows users to register, login, and manage personal learning notes in a dashboard environment.

## User Preferences

Preferred communication style: Simple, everyday language.
Real-time functionality requested and implemented.
User's actual name should display in dashboard (not hardcoded names).
Additional pages requested: Home, Signup, Feedback.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions (configured for PostgreSQL storage)
- **API Design**: RESTful API endpoints
- **Validation**: Zod schemas shared between frontend and backend

### Database Design
- **Users Table**: Stores user account information (id, name, email, avatar, provider info)
- **Notes Table**: Stores user learning notes with foreign key relationship to users
- **Migration System**: Drizzle Kit for database schema management

## Key Components

### Authentication System
- User registration and login endpoints
- Session-based authentication
- Support for multiple providers (email, Google planned)
- Protected routes requiring authentication

### Data Storage
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Fallback Storage**: In-memory storage implementation for development
- **Schema Management**: Centralized schema definitions in shared directory

### UI Components
- **Component Library**: shadcn/ui built on Radix UI primitives
- **Theme System**: Light/dark mode support with CSS variables
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Toast Notifications**: User feedback system

### Note Management
- CRUD operations for learning notes
- Real-time updates using WebSocket connections
- Form validation and error handling
- User-specific note isolation
- Live status indicators and notifications

### Real-time Features
- WebSocket server implementation on `/ws` path
- Live connection status in dashboard
- Real-time note creation and deletion broadcasts
- Toast notifications for multi-user updates
- Automatic data synchronization across browser tabs

## Data Flow

1. **Authentication Flow**:
   - User registers/logs in → Server validates → Session created → User redirected to dashboard

2. **Note Management Flow**:
   - User creates note → Form validation → API request → Database update → UI refresh

3. **State Management**:
   - Server state managed by React Query
   - Client state managed by React hooks
   - Session state handled by Express sessions

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form, Zod validation
- **Date Handling**: date-fns library

### Backend Dependencies
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL via @neondatabase/serverless
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Session Storage**: connect-pg-simple for PostgreSQL sessions

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript with strict mode
- **Database Tools**: Drizzle Kit for migrations
- **Development Server**: Hot module replacement via Vite

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Session**: Uses PostgreSQL for session storage in production
- **Development**: Includes Replit-specific plugins and error handling

### Production Deployment
- **Static Assets**: Served from `dist/public` directory
- **API Routes**: Express server handles `/api/*` routes
- **Fallback**: All other routes serve React app for client-side routing

### Development Setup
- **Hot Reload**: Vite development server with HMR
- **API Proxy**: Development server proxies API requests to Express
- **Database**: Automatic schema synchronization in development mode