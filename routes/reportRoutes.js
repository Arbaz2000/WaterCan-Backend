const express = require("express");
const {
  getReports,
  getReportById,
} = require("../controllers/reportController"); // Adjust the path as necessary
const router = express.Router();

// Define the routes
router.get("/reports", getReports);
router.get("/reports/:id", getReportById);

module.exports = router;
