// Import necessary modules and middleware
const express = require("express");
const router = express.Router();
const cors = require("cors");
const User = require("../models/User"); // Assuming you have a User model

// Define a route to remove a mentor by ID
router.delete("/removementor/:mentorId", async (req, res) => {
  const mentorId = req.params.mentorId;
  console.log("Vivek:- ", mentorId);
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

module.exports = router;
