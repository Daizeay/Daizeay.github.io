/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * Database connection setup using MySQL.
 */

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost", // Change this if using an external DB
    user: "root", // Change this to your DB username
    password: "", // Add your MySQL password here
    database: "myonlinestore" // Change this to your actual database name
});

// Connect to Database
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to the MySQL database.");
});

module.exports = db;
