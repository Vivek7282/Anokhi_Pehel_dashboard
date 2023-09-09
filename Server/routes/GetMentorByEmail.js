const express = require("express");
const User = require("../models/User");
const Student = require("../models/Student");
const Schedule = require("../models/Schedule");
const LineSchedule = require("../models/LineSchedule");

const router = express.Router();
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
const app = express();
app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));

router.get("/getmentorsByEmail", async (req, res) => {
  // Extract the user ID from the request query parameters
  const user_id = req.query.email;

  try {
    // Query the database to retrieve the user based on the ID
    const user = await User.find({ email: user_id });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user information
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
