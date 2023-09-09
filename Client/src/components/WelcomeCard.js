import React from "react";

const WelcomeCard = ({ userEmail }) => {
  return (
    <div className="welcome-card">
      <h3>Welcome Back</h3>

      <p>{userEmail}</p>
    </div>
  );
};

export default WelcomeCard;
