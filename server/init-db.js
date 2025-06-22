const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create connection without database first
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Read SQL file
const sqlFile = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');

// Split SQL file into individual statements
const statements = sqlFile.split(';').filter(statement => statement.trim());

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server.');

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