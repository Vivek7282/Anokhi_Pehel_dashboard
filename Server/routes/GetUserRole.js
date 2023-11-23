const express = require("express");
const User = require("../models/User");
const { getUserRoleByEmail } = require("../controller/userController");
const router = express.Router();
const cors = require("cors");

const app = express();
app.use(cors());

router.get("/getUserRoleByEmail", async (req, res) => {
  try {
    const { email } = req.query; // You can use req.body.email if sending in the request body

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
