const express = require("express");
const { createTransaction } = require("../controllers/transactionController"); // Adjust the path as necessary
const router = express.Router();

// Define the route for creating a transaction
router.post("/transactions", createTransaction);

module.exports = router;
