import React, { useEffect, useState } from "react";

import myImage from "../image/backgroundImage.jpeg";
import Footer from "./Footer";
import SidebarAdmin from "./SidebarAdmin";

export default function Dashboard() {
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SidebarAdmin />
    </div>
  );
}
