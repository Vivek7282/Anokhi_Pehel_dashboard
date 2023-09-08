const express = require("express");
const router = express.Router();
const Test = require("../models/TestScore"); // Import your Mongoose model

// Endpoint to submit scores
// Endpoint to submit scores
router.post("/submitscore", async (req, res) => {
  try {
    const { classId, date, scores } = req.body;

    // Validate that classId is provided
    if (!classId) {
      return res.status(400).json({ error: "classId is required" });
    }

    // Validate that scores array is provided and contains valid data
    if (!Array.isArray(scores) || scores.length === 0) {
      return res
        .status(400)
        .json({ error: "scores array is required and must not be empty" });
    }

    for (const score of scores) {
      if (!score.studentId || typeof score.score !== "number") {
        return res.status(400).json({ error: "Invalid score data" });
      }
    }

    // Create an array to store the updated scores
    const updatedScores = scores.map((score) => ({
      studentId: score.studentId,
      score: score.score,
    }));
    const currentDateTime = new Date();
    const currentDate = new Date(
      currentDateTime.getFullYear(),
      currentDateTime.getMonth(),
      currentDateTime.getDate()
    );

    // Create a new test record
    const newTest = new Test({
      classId,
      date: currentDate.toISOString(),
      score: updatedScores,
    });

    // Save the new test record to the database
    await newTest.save();

    res.json({ message: "Scores submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
