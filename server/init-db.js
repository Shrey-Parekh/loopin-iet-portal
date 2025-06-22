const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create connection without database first
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'shrey123',
});

// Read SQL file
const sqlFile = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');

// Split SQL file into individual statements
const statements = sqlFile.split(';').filter(statement => statement.trim());

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    console.log('Please make sure MySQL is running on port 3306 and accessible.');
    return;
  }
  console.log('Connected to MySQL server on port 3306.');

  // Execute each statement
  statements.forEach((statement, index) => {
    if (statement.trim()) {
      connection.query(statement, (err, results) => {
        if (err) {
          console.error(`Error executing statement ${index + 1}:`, err);
        } else {
          console.log(`Statement ${index + 1} executed successfully.`);
        }
      });
    }
  });

  // Close connection after all statements
  setTimeout(() => {
    connection.end();
    console.log('Database initialization completed!');
  }, 2000);
}); 