import React from "react";
import "../css/Dashboard.css";
import frontImage from "../image/download.jpeg";
import "../css/Header.css";
import myImage4 from "../image/LOGO (1).png";

const Header = () => {
  return (
    <div className="header-container">
      <img
        src={myImage4}
        alt="Logo"
        className="logo"
        style={{ width: "150px", height: "150px" }}
      />
      <h1 className="header-text">Anokhi Pehel</h1>
    </div>
  );
};

export default Header;
