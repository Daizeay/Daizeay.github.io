/**
 * Name: Daisy Ibuoka
 * Date: 03.01.2025
 * CSC 372-01
 *
 * This file handles routing for the homepage of the online store.
 */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
});

module.exports = router;
