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

// API route to change the user's password
router.post("/changePassword", async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, currentPassword, newPassword } = req.body;

  try {
    // Fetch the user from the database
    const user = await User.findOne({ email: userId });
    const oldpass = user.password;

    if (!user) {
      return res.status(400).json({ success, error: "User Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, oldpass);

    // console.log("Password Comparison Result:", isPasswordValid);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Current password is incorrect." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the number of salt rounds

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// router.post(
//   "/login",
//   [
//     body("email", "Enter a Valid Email").isEmail(),
//     body("password", "Password cannot be blank").exists(),
//   ],
//   async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     try {
//       let user = await User.findOne({ email }); //{email:email} === {email}
//       if (!user) {
//         return res
//           .status(400)
//           .json({ success, error: "Try Logging in with correct credentials" });
//       }

//       const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
//       if (!pwdCompare) {
//         return res
//           .status(400)
//           .json({ success, error: "Try Logging in with correct credentials" });
//       }
//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       success = true;
//       const authToken = jwt.sign(data, jwtSecret);
//       res.json({ success, authToken });
//     } catch (error) {
//       console.error(error.message);
//       res.send("Server Error");
//     }
//   }
// );

module.exports = router;
