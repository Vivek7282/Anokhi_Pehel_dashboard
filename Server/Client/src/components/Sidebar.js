import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeCard from "./WelcomeCard";
import "../css/ScorePage.css";
import Header from "./Header";
import myImage from "../image/backgroundImage.jpeg";
import Footer from "./Footer";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    // Fetch userId from local storage
    const storedUserEmail = localStorage.getItem("userEmail");

    setUserEmail(storedUserEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);

    navigate("/");
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a className="text-decoration-none" style={{ color: "inherit" }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/attendancerecord"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="table">
                Attendance Record
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/addstudent" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Add Student</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/takeattendance" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                Take Attendance
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/addscore" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                Add Scorecard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/viewscore" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                Class Performance
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/viewtopic" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">
                Topic Covered
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/getschedule" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Schedule
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/getlineschedule"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chart-line">
                Line Schedule
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/antyodayareg" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Atyodaya Registraion
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to={`/editprofile?userEmail=${userEmail}`}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="circle">Profile</CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenuItem icon="table" onClick={handleLogout}>
              Logout
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          ></div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <div className="welcomecard">
        <WelcomeCard userEmail={userEmail} /> <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
