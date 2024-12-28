// src/config/db.js
const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error("Database connection was closed.");
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error("Database has too many connections.");
    } else if (err.code === 'ECONNREFUSED') {
      console.error("Database connection was refused.");
    } else {
      console.error("Database connection error:", err.message);
    }
  }

  if (connection) {
    console.log("Connected to the MySQL database successfully!");
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = pool.promise();
