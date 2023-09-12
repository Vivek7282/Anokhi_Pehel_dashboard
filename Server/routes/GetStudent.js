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

router.get("/getstudentByUserId", async (req, res) => {
  // Extract the user ID from the request query parameters
  const student_id = req.query.studentid;

  try {
    // Query the database to retrieve the user based on the ID
    const student = await Student.findById(student_id);
    // console.log(student);
    // Check if the user exists
    if (!student) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getmentorsByUserId", async (req, res) => {
  // Extract the user ID from the request query parameters
  const user_id = req.query.userid;
  // console.log(user_id);
  try {
    // Query the database to retrieve the user based on the ID
    const user = await User.findById(user_id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the relevant user information
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      regnumber: user.regnumber,
      photo: user.photo,
    };
    // console.log(userInfo);
    // Respond with the user information
    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getClassScheduleByMentorId", async (req, res) => {
  try {
    const mentorId = req.query.mentorId;
    const classSchedule = await Schedule.find(
      { "schedule.mentor": mentorId },
      {
        className: 1,
        "schedule.day": 1,
        "schedule.mentor": 1,
        "schedule.subject": 1,
        _id: 0,
      }
    );

    if (classSchedule && classSchedule.length > 0) {
      res.json(classSchedule);
    } else {
      console.log("Data not found");
      res.json({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

router.get("/getLineScheduleByMentorId", async (req, res) => {
  try {
    const mentorId = req.query.mentorId;
    const lineSchedule = await LineSchedule.find(
      { "schedule.pickup": mentorId },
      {
        location: 1,
        "schedule.pickup": 1,
        "schedule.day": 1,

        _id: 0,
      }
    );

    if (lineSchedule && lineSchedule.length > 0) {
      res.json(lineSchedule);
    } else {
      console.log("Data not found");
      res.json({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getLineSchedule1ByMentorId", async (req, res) => {
  try {
    const mentorId = req.query.mentorId;
    const lineSchedule = await LineSchedule.find(
      { "schedule.drop": mentorId },
      {
        location: 1,
        "schedule.drop": 1,
        "schedule.day": 1,

        _id: 0,
      }
    );

    if (lineSchedule && lineSchedule.length > 0) {
      res.json(lineSchedule);
    } else {
      console.log("Data not found");
      res.json({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/removementor/:mentorId", async (req, res) => {
  const mentorId = req.params.mentorId;
  // console.log("Vivek:- ", mentorId);
  try {
    // Find and remove the mentor by ID from the database
    const removedMentor = await User.findByIdAndRemove(mentorId);

    if (!removedMentor) {
      return res
        .status(404)
        .json({ success: false, message: "Mentor not found." });
    }

    return res.json({ success: true, message: "Mentor removed successfully." });
  } catch (error) {
    console.error("Error removing mentor:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/removestudent/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    // Find and remove the student by ID from the database
    const removedStudent = await Student.findByIdAndRemove(studentId);

    if (!removedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }

    return res.json({
      success: true,
      message: "Student removed successfully.",
    });
  } catch (error) {
    console.error("Error removing student:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
