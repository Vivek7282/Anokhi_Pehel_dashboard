import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeCard from "./WelcomeCard";
import Sidebar from "./Sidebar";
import Header from "./Header";
import myImage from "../image/backgroundImage.jpeg";
import Image from "../image/340434.png";
import Footer from "./Footer";
export default function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Sidebar />
    </div>
  );
}
