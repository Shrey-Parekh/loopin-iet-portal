const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// API Routes

// Get all team members
app.get('/api/team', (req, res) => {
  db.query('SELECT * FROM team_members ORDER BY id', (err, results) => {
    if (err) {
      console.error('Error fetching team members:', err);
      res.status(500).json({ error: 'Error fetching team members' });
      return;
    }
    res.json(results);
  });
});

// Get all events
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events ORDER BY date ASC', (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Error fetching events' });
      return;
    }
    res.json(results);
  });
});

// Get upcoming events
app.get('/api/events/upcoming', (req, res) => {
  db.query('SELECT * FROM events WHERE date >= CURDATE() ORDER BY date ASC LIMIT 6', (err, results) => {
    if (err) {
      console.error('Error fetching upcoming events:', err);
      res.status(500).json({ error: 'Error fetching upcoming events' });
      return;
    }
    res.json(results);
  });
});

// Get all announcements
app.get('/api/announcements', (req, res) => {
  db.query('SELECT * FROM announcements ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Error fetching announcements:', err);
      res.status(500).json({ error: 'Error fetching announcements' });
      return;
    }
    res.json(results);
  });
});

// Get recent announcements (for homepage)
app.get('/api/announcements/recent', (req, res) => {
  db.query('SELECT * FROM announcements ORDER BY date DESC LIMIT 5', (err, results) => {
    if (err) {
      console.error('Error fetching recent announcements:', err);
      res.status(500).json({ error: 'Error fetching recent announcements' });
      return;
    }
    res.json(results);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 