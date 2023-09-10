const express = require("express");
const router = express.Router();
const Test = require("../models/TestScore"); // Import your Mongoose model

// Endpoint to submit scores
// Endpoint to submit scores
router.post("/submitscore", async (req, res) => {
  try {
    const { classId, subject, date, scores } = req.body;
    console.log(scores);
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

    // Check if a record with the same subject and date already exists
    const incomingDate = new Date(date);
    incomingDate.setHours(0, 0, 0, 0);

    // Check if a record with the same subject and date already exists
    const existingTest = await Test.findOne({
      classId,
      subject,
      date: incomingDate, // Compare based on date only
    });

    // console.log(existingTest);
    if (existingTest) {
      // If a record exists, you can choose to update it or return an error
      // For example, you can update the existing record with new scores
      existingTest.score = scores;
      await existingTest.save();

      res.json({ message: "Scores updated successfully" });
    } else {
      // If no record exists, create a new test record
      const currentDateTime = new Date();
      const currentDate = new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate()
      );

      const newTest = new Test({
        classId,
        subject,
        date: currentDate.toISOString(),
        score: scores,
      });

      // Save the new test record to the database
      await newTest.save();

      res.json({ message: "Scores submitted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
