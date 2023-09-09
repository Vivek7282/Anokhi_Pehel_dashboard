import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import DashboardAdmin from "./components/DashboardAdmin";
import SignUp from "./components/SignUp";
import AddStudent from "./components/AddStudents";
import StudentList from "./components/StudentList";
import MentorList from "./components/MentorList";
import DashboardFinalYear from "./components/DashboardFinalYear";
import Addschedule from "./components/Addschedule";
import AddLineSchedule from "./components/AddLineSchedule";
import GetSchedule from "./components/GetSchedule";
import GetLineSchedule from "./components/GetLineSchedule";
import "bootstrap/dist/css/bootstrap.min.css";
import TakeAttendance from "./components/TakeAttendance";
import AttendancePage from "./components/AttendancePage";
import AttendanceTable from "./components/AttendanceTable";
import AddScore from "./components/AddScore";
import ScorePage from "./components/ScorePage";
import MentorProfile from "./components/MentorProfile";
import AntyodayaRegistration from "./Events/AntyodayaRegistration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/adduser" element={<SignUp />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route exact path="/takeattendance" element={<TakeAttendance />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/addscore" element={<AddScore />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/mentorprofile" element={<MentorProfile />} />

          <Route path="/attendancerecord" element={<AttendanceTable />} />
          <Route
            exact
            path="/dashboardfinalyear"
            element={<DashboardFinalYear />}
          />
          <Route exact path="/addstudent" element={<AddStudent />} />
          <Route exact path="/getschedule" element={<GetSchedule />} />
          <Route exact path="/getlineschedule" element={<GetLineSchedule />} />
          <Route exact path="/students" element={<StudentList />} />
          <Route exact path="/mentors" element={<MentorList />} />
          <Route exact path="/addschedule" element={<Addschedule />} />
          <Route exact path="/addlineschedule" element={<AddLineSchedule />} />
          <Route
            exact
            path="/antyodayareg"
            element={<AntyodayaRegistration />}
          />
          {/* <Route exact path="/class/:class" component={StudentList} /> */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;