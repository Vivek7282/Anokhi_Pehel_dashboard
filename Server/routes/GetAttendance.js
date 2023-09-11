// Import necessary modules and models
const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance"); // Import your Attendance model here
const Test = require("../models/TestScore");
// Define a route to handle attendance retrieval with filters
router.get("/getAttendance", async (req, res) => {
  try {
    // Extract the filter parameters from the query string
    const { date, className } = req.query;

    // Create a query object to filter attendance data
    const query = {};

    // Check if date filter is provided
    if (date) {
      // Modify the query to match the date field
      query.date = new Date(date); // You may need to adjust the date format
    }

    // Check if className filter is provided
    if (className) {
      // Modify the query to match the className field
      query.className = className;
    }

    // Use the query object to find attendance records matching the filters
    const attendanceData = await Attendance.find(query);

    res.json(attendanceData); // Send the filtered attendance data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getTestScores", async (req, res) => {
  try {
    // Extract the filter parameters from the query string
    const { date, classId } = req.query;

    // Create a query object to filter attendance data
    const query = {};

    // Check if date filter is provided
    if (date) {
      // Modify the query to match the date field
      query.date = new Date(date); // You may need to adjust the date format
    }

    // Check if className filter is provided
    if (classId) {
      // Modify the query to match the className field
      query.classId = classId;
    }

    // Use the query object to find attendance records matching the filters
    const scoreData = await Test.find(query);

    res.json(scoreData); // Send the filtered attendance data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
