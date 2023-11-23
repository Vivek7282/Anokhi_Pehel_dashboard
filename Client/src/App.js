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
import EditProfile from "./components/EditProfile";
import AntyodayaRegistration from "./Events/AntyodayaRegistration";
import RemoveStudent from "./Remove/RemoveStudent";
import RemoveMentor from "./Remove/RemoveMentor";
import Logout from "./Pages/Logout/Logout";
import StudentProfile from "./components/StudentProfile";
import GetClasslist from "./Today'sClass/GetClasslist";
import ViewScorePage from "./components/ViewScorePage";
import ViewTopic from "./Today'sClass/ViewTopic";
import ClassTopic from "./Today'sClass/ClassTopic";
import Contact from "./Contact/Contact";
import EditClass from "./Edit/EditClass";
import Antyodaya from "./Pages/Antyodaya/Antyodaya";
import Protected from "./Protected/Protected";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSchedule from "./components/Addschedule";
import Signup from "./components/SignUp";
import AddSchool from "./Pages/Antyodaya/AtyodayaAdmin/AddSchool/addSchool";

const token = localStorage.getItem("token");
console.log(token);
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/antyodaya" element={<Antyodaya />} />
        <Route
          exact
          path="/adduser"
          element={<Protected Component={Signup} />}
        />
        <Route
          exact
          path="/dashboard"
          element={<Protected Component={Dashboard} />}
        />
        <Route
          exact
          path="/dashboardadmin"
          element={<Protected Component={DashboardAdmin} />}
        />
        <Route
          exact
          path="/takeattendance"
          element={<Protected Component={TakeAttendance} />}
        />
        <Route
          path="/attendance"
          element={<Protected Component={AttendancePage} />}
        />
        <Route
          path="/editprofile"
          element={<Protected Component={EditProfile} />}
        />
        <Route path="/addscore" element={<Protected Component={AddScore} />} />
        <Route path="/score" element={<Protected Component={ScorePage} />} />
        <Route
          path="/viewscore"
          element={<Protected Component={ViewScorePage} />}
        />
        <Route
          path="/addSchool"
          element={<Protected Component={AddSchool} />}
        />

        {/* <Route path="/viewscorepage" element={<ViewScorePage />} /> */}
        <Route
          path="/mentorprofile"
          element={<Protected Component={MentorProfile} />}
        />
        <Route
          path="/studentprofile"
          element={<Protected Component={StudentProfile} />}
        />
        <Route
          path="/getclasslist"
          element={<Protected Component={GetClasslist} />}
        />
        <Route
          path="/classtopic"
          element={<Protected Component={ClassTopic} />}
        />
        <Route
          path="/viewtopic"
          element={<Protected Component={ViewTopic} />}
        />
        <Route path="/contact" element={<Protected Component={Contact} />} />
        <Route
          path="/editclass"
          element={<Protected Component={EditClass} />}
        />
        <Route
          path="/attendancerecord"
          element={<Protected Component={AttendanceTable} />}
        />
        <Route
          exact
          path="/dashboardfinalyear"
          element={<Protected Component={DashboardFinalYear} />}
        />
        <Route
          exact
          path="/addstudent"
          element={<Protected Component={AddStudent} />}
        />
        <Route
          exact
          path="/getschedule"
          element={<Protected Component={GetSchedule} />}
        />
        <Route
          exact
          path="/getlineschedule"
          element={<Protected Component={GetLineSchedule} />}
        />
        <Route
          exact
          path="/students"
          element={<Protected Component={StudentList} />}
        />
        <Route
          exact
          path="/mentors"
          element={<Protected Component={MentorList} />}
        />
        <Route
          exact
          path="/addschedule"
          element={<Protected Component={AddSchedule} />}
        />
        <Route
          exact
          path="/addlineschedule"
          element={<Protected Component={AddLineSchedule} />}
        />
        <Route
          exact
          path="/removementor"
          element={<Protected Component={RemoveMentor} />}
        />
        <Route
          exact
          path="/removestudent"
          element={<Protected Component={RemoveStudent} />}
        />
        <Route
          exact
          path="/antyodayareg"
          element={<Protected Component={AntyodayaRegistration} />}
        />
        <Route exact path="/logout" element={<Logout />} />
        {/* <Route exact path="/class/:class" component={StudentList} /> */}
      </Routes>
    </Router>
  );
}
export default App;
