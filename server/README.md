# LoopIn IET Portal - Backend Server

This is the backend server for the LoopIn IET Portal, now using Supabase (PostgreSQL) as the database and storage backend.

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the `server` directory with the following content:

```env
SUPABASE_URL=https://fjyjzkaidooclhqgweai.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeWp6a2FpZG9vY2xocWd3ZWFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTg4MzIyOSwiZXhwIjoyMDY3NDU5MjI5fQ.ptN1u2bg-SeUolWXR-9nzcd6-r-PFJx217gBxld1spI
PORT=3001
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on port 3001 (or the port specified in your .env file).

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/team` - Get all team members
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/recent` - Get recent announcements (for homepage)

## Database Schema

The schema is managed in Supabase. You can view and edit tables using the Supabase dashboard.

### team_members
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- name (VARCHAR(100))
- role (VARCHAR(100))
- image (VARCHAR(255))
- linkedin (VARCHAR(255))
- github (VARCHAR(255))
- twitter (VARCHAR(255))
- created_at (TIMESTAMP)

### events
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- title (VARCHAR(200))
- description (TEXT)
- date (DATE)
- time (TIME)
- location (VARCHAR(200))
- image (VARCHAR(255))
- category (VARCHAR(50))
- status (ENUM: 'upcoming', 'ongoing', 'completed')
- created_at (TIMESTAMP)

### announcements
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- title (VARCHAR(200))
- content (TEXT)
- date (DATE)
- priority (ENUM: 'low', 'medium', 'high')
- created_at (TIMESTAMP)

## Storage

Images and files are now managed using Supabase Storage. Refer to the Supabase dashboard for managing buckets and files. 