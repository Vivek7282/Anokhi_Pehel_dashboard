const express = require("express");
const User = require("../models/User");
const Student = require("../models/Student");
const Schedule = require("../models/Schedule");
const LineSchedule = require("../models/LineSchedule");
const app = express();
const router = express.Router();
const cors = require("cors");
app.use(cors());
const { v4: uuidv4 } = require("uuid");

const multer = require("multer");

app.use(cors({ origin: "http://localhost:3000" }));

router.get("/getTeachersByClass", async (req, res) => {
  // Extract the user ID from the request query parameters
  const classId = req.query.class;
  //   console.log(classId);
  try {
    // Query the database to retrieve the user based on the ID
    const mentor = await Schedule.find({ className: classId });
    // console.log(mentor);
    // Check if the user exists
    if (!mentor) {
      return res.status(404).json({ error: "mentor not found" });
    }
    // console.log(mentor);
    // Respond with the user information
    res.json(mentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
