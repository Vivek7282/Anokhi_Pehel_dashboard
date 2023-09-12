const express = require("express");

const Topic = require("../models/ClassDiscription");
const router = express.Router();

const app = express();
const cors = require("cors");
app.use(cors());
// In-memory storage for topics (replace with a database in a real app)
const topics = [];

// Endpoint to add a topic covered
router.post("/addTopicCovered", async (req, res) => {
  try {
    const { classId, date, mentorId, topic, subject } = req.body;

    // Validate input data (you may want to add more robust validation)
    if (!classId || !date || !mentorId || !topic || !subject) {
      return res.status(400).json({ error: "Missing required data" });
    }

    // Check if a topic with the same date and class already exists
    const existingTopic = await Topic.findOne({ classId, date });
    console.log(existingTopic);
    if (existingTopic) {
      // If it exists, update the topic details
      existingTopic.subject = subject;
      existingTopic.mentorId = mentorId;
      existingTopic.topic = topic;

      await existingTopic.save();

      return res.json("Updated");
    } else {
      // If it doesn't exist, create a new topic object and add it to the list
      const newTopic = new Topic({
        classId,
        date,
        subject,
        mentorId,
        topic,
      });

      await newTopic.save();

      return res.json("Added");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/topic", async (req, res) => {
  try {
    const topics = await Topic.find(); // Retrieve all topics from the database
    res.json(topics); // Send the topics as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
