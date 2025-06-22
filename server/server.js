const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'shrey123',
  database: 'loopin_portal',
});

db.connect(err => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to MySQL database successfully on port 3306.');

    // Team API
    app.get('/api/team', (req, res) => {
      const { department, member_type, position_hierarchy } = req.query;
      let query = 'SELECT * FROM team_members';
      const conditions = [];
      const params = [];
      if (department) {
        conditions.push('department = ?');
        params.push(department);
      }
      if (member_type) {
        conditions.push('member_type = ?');
        params.push(member_type);
      }
      if (position_hierarchy) {
        conditions.push('position_hierarchy = ?');
        params.push(position_hierarchy);
      }
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += ` ORDER BY CASE position_hierarchy
        WHEN "Chairperson" THEN 1
        WHEN "Vice-chairperson" THEN 2
        WHEN "Secretary" THEN 3
        WHEN "Director" THEN 4
        WHEN "Head" THEN 5
        WHEN "Subhead" THEN 6
        WHEN "Member" THEN 7
        END, department, name`;
      db.query(query, params, (err, results) => {
        if (err) {
          console.error('Error fetching team members:', err.message);
          return res.status(500).json({ error: 'Error fetching team members' });
        }
        res.json(results);
      });
    });

    // Department-specific route
    app.get('/api/team/department/:department', (req, res) => {
      const { department } = req.params;
      db.query('SELECT * FROM team_members WHERE department = ? ORDER BY position_hierarchy, name', [department], (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching team members by department' });
        }
        res.json(results);
      });
    });

    // Core type filters
    app.get('/api/team/type/:member_type', (req, res) => {
      const { member_type } = req.params;
      db.query('SELECT * FROM team_members WHERE member_type = ? ORDER BY position_hierarchy, department, name', [member_type], (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching team members by type' });
        }
        res.json(results);
      });
    });

    // Get super core members
    app.get('/api/team/super-core', (req, res) => {
      db.query('SELECT * FROM team_members WHERE member_type = "super_core" ORDER BY position_hierarchy', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching super core members' });
        }
        res.json(results);
      });
    });

    // Get core members
    app.get('/api/team/core', (req, res) => {
      db.query('SELECT * FROM team_members WHERE member_type = "core" ORDER BY department, position_hierarchy, name', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching core members' });
        }
        res.json(results);
      });
    });

    // Get department names
    app.get('/api/departments', (req, res) => {
      db.query('SELECT DISTINCT department FROM team_members WHERE department IS NOT NULL ORDER BY department', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching departments' });
        }
        res.json(results.map(row => row.department));
      });
    });

    // Events API
    app.get('/api/events', (req, res) => {
      db.query('SELECT * FROM events ORDER BY date ASC', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching events' });
        }
        res.json(results);
      });
    });

    // Get upcoming events
    app.get('/api/events/upcoming', (req, res) => {
      db.query('SELECT * FROM events WHERE date >= CURDATE() ORDER BY date ASC LIMIT 6', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching upcoming events' });
        }
        res.json(results);
      });
    });

    // Announcements API
    app.get('/api/announcements', (req, res) => {
      db.query('SELECT * FROM announcements ORDER BY date DESC', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching announcements' });
        }
        res.json(results);
      });
    });

    // Get recent announcements (for homepage)
    app.get('/api/announcements/recent', (req, res) => {
      db.query('SELECT * FROM announcements ORDER BY date DESC LIMIT 5', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching recent announcements' });
        }
        res.json(results);
      });
    });

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({ status: 'OK', message: 'Server is running. MySQL connected' });
    });

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  }
});
