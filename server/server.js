const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

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
        // Parse hobbies as array (comma-separated), tags as JSON
        const parsed = results.map(row => ({
          ...row,
          hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
          tags: row.tags ? safeJsonParse(row.tags) : [],
        }));
        res.json(parsed);
      });
    });

    // Helper for safe JSON parse
    function safeJsonParse(str) {
      try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    // Helper for hobbies parse
    function parseHobbies(str) {
      if (!str) return [];
      return str.split(',').map(h => h.trim()).filter(Boolean);
    }

    // Department-specific route
    app.get('/api/team/department/:department', (req, res) => {
      const { department } = req.params;
      db.query('SELECT * FROM team_members WHERE department = ? ORDER BY position_hierarchy, name', [department], (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching team members by department' });
        }
        const parsed = results.map(row => ({
          ...row,
          hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
          tags: row.tags ? safeJsonParse(row.tags) : [],
        }));
        res.json(parsed);
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
        const parsed = results.map(row => ({
          ...row,
          hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
          tags: row.tags ? safeJsonParse(row.tags) : [],
        }));
        res.json(parsed);
      });
    });

    // Get super core members
    app.get('/api/team/super-core', (req, res) => {
      db.query('SELECT * FROM team_members WHERE member_type = "super_core" ORDER BY position_hierarchy', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching super core members' });
        }
        const parsed = results.map(row => ({
          ...row,
          hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
          tags: row.tags ? safeJsonParse(row.tags) : [],
        }));
        res.json(parsed);
      });
    });

    // Get core members
    app.get('/api/team/core', (req, res) => {
      db.query('SELECT * FROM team_members WHERE member_type = "core" ORDER BY department, position_hierarchy, name', (err, results) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error fetching core members' });
        }
        const parsed = results.map(row => ({
          ...row,
          hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
          tags: row.tags ? safeJsonParse(row.tags) : [],
        }));
        res.json(parsed);
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

    // Newsletters API
    app.get('/api/newsletters', (req, res) => {
      db.query('SELECT * FROM newsletters ORDER BY date DESC', (err, results) => {
        if (err) {
          console.error('Error fetching newsletters:', err.message);
          return res.status(500).json({ error: 'Error fetching newsletters' });
        }
        res.json(results);
      });
    });

    // Newsletter subscription endpoint
    app.post('/api/newsletters/subscribe', (req, res) => {
      const { email } = req.body;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email is required' });
      }
      db.query('INSERT INTO newsletter_subscribers (email) VALUES (?)', [email], (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'This email is already subscribed.' });
          }
          console.error('Error subscribing to newsletter:', err.message);
          return res.status(500).json({ error: 'Error subscribing to newsletter' });
        }
        res.json({ success: true });
      });
    });

    // Login endpoint
    app.post('/api/login', (req, res) => {
      const { userId, password } = req.body;
      if (!userId || !password) {
        return res.status(400).json({ error: 'User ID and password are required.' });
      }
      db.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
          console.error('Error querying users:', err.message);
          return res.status(500).json({ error: 'Database error.' });
        }
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const user = results[0];
        // Plain text password check (not secure)
        if (password !== user.password) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }
        // On success, return user info (omit password)
        const { password: _, ...userInfo } = user;
        res.json({ success: true, user: userInfo });
      });
    });

    // Change password endpoint
    app.post('/api/change-password', (req, res) => {
      const { userId, currentPassword, newPassword } = req.body;
      if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
      db.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
          console.error('Error querying users:', err.message);
          return res.status(500).json({ error: 'Database error.' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found.' });
        }
        const user = results[0];
        if (user.password !== currentPassword) {
          return res.status(401).json({ error: 'Current password is incorrect.' });
        }
        db.query('UPDATE users SET password = ? WHERE user_id = ?', [newPassword, userId], (err2) => {
          if (err2) {
            console.error('Error updating password:', err2.message);
            return res.status(500).json({ error: 'Failed to update password.' });
          }
          res.json({ success: true });
        });
      });
    });

    // Reset password endpoint
    app.post('/api/reset-password', (req, res) => {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
      }
      db.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
          console.error('Error querying users:', err.message);
          return res.status(500).json({ error: 'Database error.' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found.' });
        }
        db.query('UPDATE users SET password = ? WHERE user_id = ?', ['password123', userId], (err2) => {
          if (err2) {
            console.error('Error resetting password:', err2.message);
            return res.status(500).json({ error: 'Failed to reset password.' });
          }
          res.json({ success: true });
        });
      });
    });

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({ status: 'OK', message: 'Server is running. MySQL connected' });
    });

    // Update profile endpoint
    app.put('/api/profile/:id', (req, res) => {
      const { id } = req.params;
      let {
        name,
        position_hierarchy,
        member_type,
        department,
        image,
        linkedin,
        github,
        Instagram,
        bio,
        hobbies,
        tags,
        email
      } = req.body;
      // Save hobbies as comma-separated string, tags as JSON
      if (Array.isArray(hobbies)) hobbies = hobbies.join(',');
      if (Array.isArray(tags)) tags = JSON.stringify(tags);
      const query = `UPDATE team_members SET name=?, position_hierarchy=?, member_type=?, department=?, image=?, linkedin=?, github=?, Instagram=?, bio=?, hobbies=?, tags=?, email=? WHERE id=?`;
      const params = [name, position_hierarchy, member_type, department, image, linkedin, github, Instagram, bio, hobbies, tags, email, id];
      db.query(query, params, (err, result) => {
        if (err) {
          console.error('Error updating profile:', err.message);
          return res.status(500).json({ error: 'Failed to update profile' });
        }
        res.json({ success: true });
      });
    });

    // Create profile endpoint
    app.post('/api/profile', (req, res) => {
      let {
        name,
        position_hierarchy,
        member_type,
        department,
        image,
        linkedin,
        github,
        Instagram,
        bio,
        hobbies,
        tags,
        email
      } = req.body;
      // Save hobbies as comma-separated string, tags as JSON
      if (Array.isArray(hobbies)) hobbies = hobbies.join(',');
      if (Array.isArray(tags)) tags = JSON.stringify(tags);
      const query = `INSERT INTO team_members (name, position_hierarchy, member_type, department, image, linkedin, github, Instagram, bio, hobbies, tags, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [name, position_hierarchy, member_type, department, image, linkedin, github, Instagram, bio, hobbies, tags, email];
      db.query(query, params, (err, result) => {
        if (err) {
          console.error('Error creating profile:', err.message);
          return res.status(500).json({ error: 'Failed to create profile' });
        }
        res.json({ success: true, id: result.insertId });
      });
    });

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  }
});
 