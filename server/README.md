# LoopIn IET Portal - Backend Server

This is the backend server for the LoopIn IET Portal, built with Node.js, Express, and MySQL.

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the `server` directory with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=shrey123
DB_NAME=loopin_portal
PORT=3001
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Database

Run the database initialization script to create tables and insert dummy data:

```bash
npm run init-db
```

### 4. Start the Server

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