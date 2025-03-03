/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * Handles admin authentication and logs received data for debugging.
 */

const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    console.log("Received Login Request:", req.body); // ✅ Debugging Log

    // ✅ Check if username and password match
    if (username === "admin" && password === "password123") { 
        console.log("Admin login successful");
        res.json({ success: true, admin: true });
    } else {
        console.log("Admin login failed: Incorrect username or password");
        res.json({ success: false, message: "Invalid username or password" });
    }
});

module.exports = router;
