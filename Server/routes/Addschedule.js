const express = require("express");

const Schedule = require("../models/Schedule");
const router = express.Router();
const cors = require("cors");

router.post("/addschedule", async (req, res) => {
  try {
    const scheduleData = req.body;

    // Create a new Schedule document and save it to the database
    const newSchedule = new Schedule(scheduleData);
    await newSchedule.save();

    // Send a success response
    res.status(200).json({ message: "Schedule Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this endpoint to fetch the schedule data
router.get("/getschedule", async (req, res) => {
  try {
    const scheduleData = await Schedule.find(); // Fetch all schedule documents
    res.status(200).json(scheduleData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
