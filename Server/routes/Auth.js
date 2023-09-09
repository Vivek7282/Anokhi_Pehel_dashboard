const express = require("express");
const User = require("../models/User");
const Student = require("../models/Student");
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
// app.use(cors({ origin: "http://localhost:3000" }));
router.route("/createuser").post(upload.single("photo"), async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const role = req.body.role;
  const regnumber = req.body.regnumber;
  const photo = req.file.filename;
  const Ppassword = req.body.password;

  const saltRounds = 10;

  // console.log(name, "", email, "", Ppassword);

  try {
    const password = await bcrypt.hash(Ppassword, saltRounds);

    const newUserData = {
      name,
      email,
      phone,
      role,
      regnumber,
      password,
      photo,
    };

    const newUser = new User(newUserData);

    await newUser.save();
    res.json("User Added");
  } catch (error) {
    console.error(error);
    res.status(400).json("Error: " + error.message);
  }
});

router.route("/addstudent").post(upload.single("photo"), async (req, res) => {
  const name = req.body.name;
  const className = req.body.class;
  const phone = req.body.phone;
  const location = req.body.location;
  const mode = req.body.mode;
  const dob = req.body.dob;
  const address = req.body.address;
  const school = req.body.school;
  const photo = req.file.filename;

  // console.log(name, "", className, "", location, " ", photo);

  try {
    const newStudentData = {
      name,
      className,
      phone,
      location,
      mode,
      dob,
      address,
      school,
      photo,
    };

    const newStudent = new Student(newStudentData);

    await newStudent.save();
    res.json("Student Added");
  } catch (error) {
    console.error(error);
    res.status(400).json("Error: " + error.message);
  }
});

// Authentication a User, No login Requiered
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //{email:email} === {email}
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Try Logging in with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ success, error: "Try Logging in with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.send("Server Error");
    }
  }
);

router.get("/getUserRoleByEmail", async (req, res) => {
  try {
    const { email } = req.query; // You can use req.body.email if sending in the request body
    console.log("vivek", email);
    // Fetch the user's role based on the email from your database
    const userRole = await getUserRoleByEmail(email);

    res.json({ role: userRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
