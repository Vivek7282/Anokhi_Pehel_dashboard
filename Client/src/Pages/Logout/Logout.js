import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  const handleLogout = () => {
    // console.log("logout");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default Logout;
