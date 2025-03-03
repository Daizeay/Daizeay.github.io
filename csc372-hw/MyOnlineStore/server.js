/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * This file initializes the Express server for the online store application.
 * It sets up routes, database connection, and serves static files.
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Importing routes

// Using routes
app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
