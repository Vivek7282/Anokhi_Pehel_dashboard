// AttendancePage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import myImage from "../image/backgroundImage.jpeg";
import Image from "../image/340434.png";
const AttendancePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get("class");

  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  // Fetch the list of students for the selected class based on the `classId`
  useEffect(() => {
    if (classId) {
      axios
        .get(`http://localhost:5000/api1/getStudentsByClass?class=${classId}`)
        .then((response) => {
          setStudents(response.data);
          // Initialize the attendanceData object with default values
          const initialData = {};
          response.data.forEach((student) => {
            initialData[student._id] = "present"; // Default value is "present"
          });
          setAttendanceData(initialData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [classId]);

  const handleAttendanceChange = (studentId, status) => {
    // Update the attendanceData object when the attendance status changes
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: status,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the attendance data to be sent to the server
    const attendanceRecords = Object.entries(attendanceData).map(
      ([studentId, status]) => ({
        studentId,
        status,
      })
    );

    // Create an object with all the data to be sent to the server
    const attendanceSubmission = {
      classId: classId,
      date: new Date().toISOString(), // You can adjust the date format as needed
      attendanceRecords,
    };

    // Send the attendance data to the server using Axios
    axios
      .post("http://localhost:5000/api4/submitAttendance", attendanceSubmission)
      .then((response) => {
        console.log(response.data);
        if (response.data === "Attendance submitted successfully") {
          alert("Attendance Saved");
        } else if (response.data === "Attendance updated successfully") {
          alert("Attendance Updated");
        }
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header />
      <h2>Students List for {classId}</h2>
      <form
        className="  w-md-100 w-lg-100 m-2 p-2 border rounded bg-dark text-white"
        onSubmit={handleSubmit}
      >
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>
                  <select
                    value={attendanceData[student._id]}
                    onChange={(e) =>
                      handleAttendanceChange(student._id, e.target.value)
                    }
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">
          Submit Attendance
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AttendancePage;
