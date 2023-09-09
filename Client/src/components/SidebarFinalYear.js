import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/addstudent" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Add Student</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/students" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Student List</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/mentors" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Mentors List</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/takeattendance" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Attendance</CDBSidebarMenuItem>
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
            <NavLink
              exact
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
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
    </div>
  );
};

export default SidebarAdmin;
