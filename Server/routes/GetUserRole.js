const express = require("express");
const User = require("../models/User");
const { getUserRoleByEmail } = require("../controller/userController");
const router = express.Router();
const cors = require("cors");

const app = express();
app.use(cors());

// Enable CORS for all routes

//app.use(cors({ origin: "http://localhost:3000" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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

router.get("/mentors", async (req, res) => {
  try {
    // Fetch all mentors with both name and phone fields
    const mentors = await User.find({}, "name phone");

    // Map the mentors to include only the necessary fields in the response
    const mentorData = mentors.map((mentor) => ({
      _id: mentor._id,
      name: mentor.name,
      phone: mentor.phone,
    }));

    res.json(mentorData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

module.exports = router;