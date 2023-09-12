import React from "react";
import "../css/Footer.css"; // Create a Footer.css file for styling
import myImage4 from "../image/LOGO (1).png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-container">
      <p className="footer-text">Maintained by: Web Admin, Anokhi Pehel</p>
      <p>© 2023 Anokhi Pehel. All Rights Reserved.</p>

      <Link to="/contact">Contact Admin</Link>
    </div>
  );
};

export default Footer;
