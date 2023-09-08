const express = require("express");
const User = require("../models/User");
const Student = require("../models/Student");
// const Order = require("../models/Orders");
const router = express.Router();
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const fetch = require("../middleware/fetchdetails");
const jwtSecret = "HaHa";
const multer = require("multer");
const app = express();
app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });
app.use(express.urlencoded({ extended: true }));
// Serve uploaded photos
app.use("/uploads", express.static("uploads"));

router.get("/studentlist", async (req, res) => {
  try {
    const students = await Student.find();
    // console.log(students);
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/mentorlist", async (req, res) => {
  try {
    const users = await User.find();
    // console.log(students);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/getStudentsByClass", async (req, res) => {
  try {
    const selectedClass = req.query.class; // Get the selected class from the query parameters

    // Query the database to find students by the className
    const students = await Student.find({ className: selectedClass });

    res.json(students); // Send the list of students as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/getStudentNames", async (req, res) => {
  try {
    // Extract the studentIds from the request body
    const { studentIds } = req.body;

    // Query the database to retrieve student names based on IDs
    const students = await Student.find({ _id: { $in: studentIds } });

    // Extract student names from the retrieved data
    const studentNames = students.map((student) => ({
      _id: student._id,
      name: student.name,
    }));

    res.json(studentNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
