const express = require("express");

const LineSchedule = require("../models/LineSchedule");
const router = express.Router();
const cors = require("cors");

router.post("/addlineschedule", async (req, res) => {
  try {
    const linescheduleData = req.body;

    // Create a new Schedule document and save it to the database
    const newLineSchedule = new LineSchedule(linescheduleData);
    await newLineSchedule.save();

    // Send a success responsex
    res.status(200).json({ message: "Schedule Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getlineschedule", async (req, res) => {
  try {
    const linescheduleData = await LineSchedule.find(); // Fetch all schedule documents
    res.status(200).json(linescheduleData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
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
