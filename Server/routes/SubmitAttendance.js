// Import necessary modules and models
const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance"); // Import your Attendance model here

// Define a route to handle attendance submission
router.post("/submitAttendance", async (req, res) => {
  try {
    // Extract the data from the request body
    const { classId, date, attendanceRecords } = req.body;

    // Convert the input date to a string in the format "yyyy-MM-dd"
    const dateString = new Date(date).toISOString().split("T")[0];

    // Check if there are existing records for the same date and class
    const existingAttendance = await Attendance.findOne({
      classId,
      date: {
        $gte: new Date(dateString), // Greater than or equal to the input date
        $lt: new Date(dateString).setDate(new Date(dateString).getDate() + 1), // Less than the next day
      },
    });

    // If there are existing records, deny entry
    if (existingAttendance) {
      // Attendance for this date and class already exists; update it
      existingAttendance.attendanceRecords = attendanceRecords;

      await existingAttendance.save();

      return res.json("Attendance updated successfully");
    }

    // Create an array to store the updated records
    const updatedRecords = attendanceRecords.map((record) => ({
      studentId: record.studentId,
      status: record.status,
    }));

    // Create a new attendance record
    const newAttendance = new Attendance({
      classId,
      date: new Date(dateString), // Use the converted date
      attendance: updatedRecords,
    });

    // Save the new attendance record to the database
    await newAttendance.save();

    res.json("Attendance submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
