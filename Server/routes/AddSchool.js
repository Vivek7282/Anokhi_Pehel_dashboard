const express = require("express");

const School = require("../models/school");
const router = express.Router();
const cors = require("cors");

router.post("/addSchool", async (req, res) => {
  try {
    const schoolData = req.body;

    // Create a new Schedule document and save it to the database
    const newSchool = new Schedule(schoolData);
    await newSchool.save();

    // Send a success response
    res.status(200).json({ message: "School Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this endpoint to fetch the schedule data
router.get("/getSchool", async (req, res) => {
  try {
    const schoolData = await School.find(); // Fetch all schedule documents
    res.status(200).json(schoolData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
