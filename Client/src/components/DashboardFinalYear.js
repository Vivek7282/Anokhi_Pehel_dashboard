import React, { useEffect, useState } from "react";

import myImage from "../image/backgroundImage.jpeg";
import Footer from "./Footer";
import SidebarFinalYear from "./SidebarFinalYear";
import Image from "../image/340434.png";
export default function Dashboard() {
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
      <SidebarFinalYear />
    </div>
  );
}
