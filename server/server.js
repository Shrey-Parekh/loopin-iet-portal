const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Supabase client
const SUPABASE_URL = 'https://fjyjzkaidooclhqgweai.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeWp6a2FpZG9vY2xocWd3ZWFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTg4MzIyOSwiZXhwIjoyMDY3NDU5MjI5fQ.ptN1u2bg-SeUolWXR-9nzcd6-r-PFJx217gBxld1spI';
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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

// Team API
app.get('/api/team', async (req, res) => {
  try {
    let query = supabase.from('team_members').select('*');
    const { department, member_type, position_hierarchy } = req.query;
    if (department) query = query.eq('department', department);
    if (member_type) query = query.eq('member_type', member_type);
    if (position_hierarchy) query = query.eq('position_hierarchy', position_hierarchy);
    // Order by position_hierarchy, department, name (Supabase only supports one at a time, so chain them)
    query = query.order('position_hierarchy', { ascending: true })
                 .order('department', { ascending: true })
                 .order('name', { ascending: true });
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching team members:', error.message);
      return res.status(500).json({ error: 'Error fetching team members' });
    }
    const parsed = data.map(row => ({
      ...row,
      hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
      tags: row.tags ? safeJsonParse(row.tags) : [],
    }));
    res.json(parsed);
  } catch (err) {
    console.error('Error fetching team members:', err.message);
    res.status(500).json({ error: 'Error fetching team members' });
  }
});

// Department-specific route
app.get('/api/team/department/:department', (req, res) => {
  const { department } = req.params;
  supabase.from('team_members').select('*').eq('department', department).then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching team members by department' });
    }
    const parsed = data.data.map(row => ({
      ...row,
      hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
      tags: row.tags ? safeJsonParse(row.tags) : [],
    }));
    res.json(parsed);
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching team members by department' });
  });
});

// Core type filters
app.get('/api/team/type/:member_type', (req, res) => {
  const { member_type } = req.params;
  supabase.from('team_members').select('*').eq('member_type', member_type).then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching team members by type' });
    }
    const parsed = data.data.map(row => ({
      ...row,
      hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
      tags: row.tags ? safeJsonParse(row.tags) : [],
    }));
    res.json(parsed);
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching team members by type' });
  });
});

// Get super core members
app.get('/api/team/super-core', (req, res) => {
  supabase.from('team_members').select('*').eq('member_type', 'super_core').then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching super core members' });
    }
    const parsed = data.data.map(row => ({
      ...row,
      hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
      tags: row.tags ? safeJsonParse(row.tags) : [],
    }));
    res.json(parsed);
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching super core members' });
  });
});

// Get core members
app.get('/api/team/core', (req, res) => {
  supabase.from('team_members').select('*').eq('member_type', 'core').then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching core members' });
    }
    const parsed = data.data.map(row => ({
      ...row,
      hobbies: row.hobbies ? parseHobbies(row.hobbies) : [],
      tags: row.tags ? safeJsonParse(row.tags) : [],
    }));
    res.json(parsed);
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching core members' });
  });
});

// Get department names
app.get('/api/departments', (req, res) => {
  supabase.from('team_members').select('department', { distinct: true }).then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching departments' });
    }
    res.json(data.data.map(row => row.department));
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching departments' });
  });
});

// Events API
app.get('/api/events', (req, res) => {
  supabase.from('events').select('*').then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching events' });
    }
    res.json(data.data);
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching events' });
  });
});

// Get upcoming events
app.get('/api/events/upcoming', (req, res) => {
  supabase.from('events').select('*').gte('date', new Date().toISOString().slice(0, 10)).then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching upcoming events' });
    }
    res.json(data.data);
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching upcoming events' });
  });
});

// Announcements API
app.get('/api/announcements', (req, res) => {
  supabase.from('announcements').select('*').then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching announcements' });
    }
    res.json(data.data);
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching announcements' });
  });
});

// Get recent announcements (for homepage)
app.get('/api/announcements/recent', (req, res) => {
  supabase.from('announcements').select('*').order('date', { ascending: false }).limit(5).then(data => {
    if (data.error) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error fetching recent announcements' });
    }
    res.json(data.data);
  }).catch(err => {
    console.error(err.message);
    res.status(500).json({ error: 'Error fetching recent announcements' });
  });
});

// Newsletters API
app.get('/api/newsletters', (req, res) => {
  supabase.from('newsletters').select('*').then(data => {
    if (data.error) {
      console.error('Error fetching newsletters:', data.error.message);
      return res.status(500).json({ error: 'Error fetching newsletters' });
    }
    res.json(data.data);
  }).catch(err => {
    console.error('Error fetching newsletters:', err.message);
    res.status(500).json({ error: 'Error fetching newsletters' });
  });
});

// Newsletter subscription endpoint
app.post('/api/newsletters/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }
  supabase.from('newsletter_subscribers').select('*').eq('email', email).then(data => {
    if (data.error) {
      if (data.error.code === 'PGRST116') { // PGRST116 is for "No rows found"
        supabase.from('newsletter_subscribers').insert({ email }).then(result => {
          if (result.error) {
            console.error('Error subscribing to newsletter:', result.error.message);
            return res.status(500).json({ error: 'Error subscribing to newsletter' });
          }
          res.json({ success: true });
        }).catch(err => {
          console.error('Error subscribing to newsletter:', err.message);
          return res.status(500).json({ error: 'Error subscribing to newsletter' });
        });
      } else {
        console.error('Error subscribing to newsletter:', data.error.message);
        return res.status(500).json({ error: 'Error subscribing to newsletter' });
      }
    } else {
      res.status(409).json({ error: 'This email is already subscribed.' });
    }
  }).catch(err => {
    console.error('Error subscribing to newsletter:', err.message);
    res.status(500).json({ error: 'Error subscribing to newsletter' });
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ error: 'User ID and password are required.' });
  }
  supabase.from('users').select('*').eq('user_id', userId).then(data => {
    if (data.error) {
      console.error('Error querying users:', data.error.message);
      return res.status(500).json({ error: 'Database error.' });
    }
    if (data.data.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const user = data.data[0];
    // Plain text password check (not secure)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // On success, return user info (omit password)
    const { password: _, ...userInfo } = user;
    res.json({ success: true, user: userInfo });
  }).catch(err => {
    console.error('Error querying users:', err.message);
    res.status(500).json({ error: 'Database error.' });
  });
});

// Change password endpoint
app.post('/api/change-password', (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  supabase.from('users').select('*').eq('user_id', userId).then(data => {
    if (data.error) {
      console.error('Error querying users:', data.error.message);
      return res.status(500).json({ error: 'Database error.' });
    }
    if (data.data.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const user = data.data[0];
    if (user.password !== currentPassword) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }
    supabase.from('users').update({ password: newPassword }).eq('user_id', userId).then(result => {
      if (result.error) {
        console.error('Error updating password:', result.error.message);
        return res.status(500).json({ error: 'Failed to update password.' });
      }
      res.json({ success: true });
    }).catch(err => {
      console.error('Error updating password:', err.message);
      res.status(500).json({ error: 'Failed to update password.' });
    });
  }).catch(err => {
    console.error('Error querying users:', err.message);
    res.status(500).json({ error: 'Database error.' });
  });
});

// Reset password endpoint
app.post('/api/reset-password', (req, res) => {
  // Always respond with a message to contact the Technical Head
  res.status(403).json({ error: 'Please contact the Technical Head for password issues.' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running. Supabase connected' });
});

// Get profile for a specific user
app.get('/api/profile/:user_id', (req, res) => {
  const { user_id } = req.params;
  supabase.from('team_members').select('*').eq('user_id', user_id).then(data => {
    if (data.error) {
      console.error('Error fetching profile:', data.error.message);
      return res.status(500).json({ error: 'Error fetching profile' });
    }
    if (data.data.length === 0) return res.json(null);
    // Parse hobbies and tags
    const row = data.data[0];
    row.hobbies = row.hobbies ? parseHobbies(row.hobbies) : [];
    row.tags = row.tags ? safeJsonParse(row.tags) : [];
    res.json(row);
  }).catch(err => {
    console.error('Error fetching profile:', err.message);
    res.status(500).json({ error: 'Error fetching profile' });
  });
});

// Update profile endpoint
app.put('/api/profile/:id', (req, res) => {
  const { id } = req.params;
  let {
    user_id,
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
    email,
    course,
    year,
    stream,
    timetable_image,
  } = req.body;
  if (!user_id) return res.status(400).json({ error: 'user_id is required' });
  if (Array.isArray(hobbies)) hobbies = hobbies.join(',');
  if (Array.isArray(tags)) tags = JSON.stringify(tags);
  supabase.from('team_members').update({
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
    email,
    course,
    year,
    stream,
    timetable_image,
  }).eq('id', id).eq('user_id', user_id).then(result => {
    if (result.error) {
      console.error('Error updating profile:', result.error.message);
      return res.status(500).json({ error: 'Failed to update profile' });
    }
    res.json({ success: true });
  }).catch(err => {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ error: 'Failed to update profile' });
  });
});

// Create profile endpoint
app.post('/api/profile', (req, res) => {
  let {
    user_id,
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
    email,
    course,
    year,
    stream,
    timetable_image,
  } = req.body;
  if (!user_id) return res.status(400).json({ error: 'user_id is required' });
  if (Array.isArray(hobbies)) hobbies = hobbies.join(',');
  if (Array.isArray(tags)) tags = JSON.stringify(tags);
  supabase.from('team_members')
    .insert({
      user_id,
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
      email,
      course,
      year,
      stream,
      timetable_image,
    })
    .select()
    .then(result => {
      if (result.error) {
        console.error('Error creating profile:', result.error.message);
        return res.status(500).json({ error: 'Failed to create profile' });
      }
      res.json({ success: true, id: result.data[0].id });
    })
    .catch(err => {
      console.error('Error creating profile:', err.message);
      res.status(500).json({ error: 'Failed to create profile' });
    });
});

app.post('/api/contact', (req, res) => {
  // You can process the contact form data here (e.g., save to DB, send email, etc.)
  // For now, just return a success response
  res.json({ success: true, message: 'Contact form submitted!' });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
 