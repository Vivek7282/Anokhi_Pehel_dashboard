// const { User } = require("../models"); // Import your User model or relevant database schema
const User = require("../models/User");
async function getUserRoleByEmail(email) {
  try {
    // Assuming you have a User model/schema with an 'email' field and a 'role' field
    const user = await User.findOne({ email }); // Find a user by email

    if (!user) {
      // User not found with the provided email
      return null;
    }

    // Return the user's role
    return user.role; // Adjust this based on your schema
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error; // Handle the error as needed
  }
}

module.exports = {
  getUserRoleByEmail,
};
