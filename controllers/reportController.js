const Report = require("../models/report"); // Adjust the path as necessary

// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

// Get a specific report by ID
const getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error });
  }
};

module.exports = {
  getReports,
  getReportById,
};
