import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ScorePage.css";
import myImage from "../image/backgroundImage.jpeg";
import profile from "../image/profile.png";
import Image from "../image/340434.png";
const ScorePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userEmail");
  const [user, setUser] = useState(null); // Store mentor data in a single variable
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const ImageUrl = "";
  const handlePasswordChange = async () => {
    try {
      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }

      // Send a request to the server to change the password
      const response = await axios.post(
        "http://localhost:5000/api9/changePassword",
        {
          userId,
          currentPassword,
          newPassword,
        }
      );

      if (response.data.success) {
        // Password changed successfully
        alert("Password updated successfully.");
        setPasswordChanged(true);

        // Clear input fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        // Password change failed (e.g., incorrect current password)
        alert("Password change failed. Please check your current password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password. Please try again later.");
    }
  };

  //   console.log(userId);
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api8/getmentorsByEmail?email=${userId}`)
        .then((res) => {
          setUser(res.data); // Assuming the response is an array, take the first item
        })
        .catch((err) => {
          console.error("Error fetching mentor: ", err);
        });
    }
  }, [userId]);
  console.log("Mentor Data:", user);

  return (
    <div
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header />
      <h2>Profile</h2>
      <div className="mentor-profile">
        {user ? (
          <div className="mentor-card">
            <img
              src={`http://localhost:5000/images/${user[0].photo}`}
              //   alt={(src = { profile })}
              className="mentor-photo"
            />
            <div className="mentor-details">
              <h2>{user[0].name}</h2>
              <p>
                <span className="highlight-text">Registration Number:</span>{" "}
                <span className="custom-color">{user[0].regnumber}</span>
              </p>
              <p>
                <span className="highlight-text">Email:</span>{" "}
                <span className="custom-color">{user[0].email}</span>
              </p>
              <p>
                <span className="highlight-text">Phone:</span>{" "}
                <span className="custom-color">{user[0].phone}</span>
              </p>
            </div>
          </div>
        ) : (
          <p>No mentor data available.</p>
        )}
        <div className="password-change">
          <h3>Change Password</h3>
          <div className="password-input">
            <label>Current Password:</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="password-input">
            <label>New Password:</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="password-input">
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={handlePasswordChange}>Update Password</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScorePage;
