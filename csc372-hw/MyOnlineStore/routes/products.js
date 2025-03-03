/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * This file handles product-related routes such as listing products.
 */

const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/", async (req, res) => {
    try {
        const products = await db.query("SELECT * FROM products");
        res.render("product-list", { products: products.rows });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
