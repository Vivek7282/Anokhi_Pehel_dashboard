import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import myImage from "../image/backgroundImage.jpeg";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filterDate, setFilterDate] = useState(null); // Use null as initial state
  const [filterClass, setFilterClass] = useState("");
  const [studentNames, setStudentNames] = useState({});

  useEffect(() => {
    // Fetch attendance data when the component mounts
    axios
      .get(`${BASE_URL}/api/getAttendance`)
      .then((response) => {
        setAttendanceData(response.data);

        // Extract all unique student IDs
        const uniqueStudentIds = new Set(
          response.data.flatMap((entry) =>
            entry.attendance
              .filter((student) => student.status === "present")
              .map((student) => student.studentId)
          )
        );

        // Fetch student names for each unique student ID
        fetchStudentNames(uniqueStudentIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to fetch student names based on student IDs
  const fetchStudentNames = (studentIds) => {
    // Convert student IDs to an array
    const studentIdArray = [...studentIds];

    // Make an API call to fetch student names
    axios
      .post(`${BASE_URL}/api/getStudentNames`, {
        studentIds: studentIdArray,
      })
      .then((response) => {
        // Create a mapping of student IDs to names
        const names = {};
        response.data.forEach((student) => {
          names[student._id] = student.name;
        });
        setStudentNames(names);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilterDateChange = (e) => {
    // Parse the input value as a Date
    const selectedDate = e.target.value ? new Date(e.target.value) : null;
    setFilterDate(selectedDate);
  };

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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header />
      <h2 style={{ color: "white", fontWeight: "bold" }}>Attendance Table</h2>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Date:</label>
            <input
              type="date"
              className="form-control"
              value={filterDate ? filterDate.toISOString().split("T")[0] : ""} // Format date as YYYY-MM-DD
              onChange={handleFilterDateChange}
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Class:</label>
            <select
              className="form-control"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">Select a class</option>
              <option value="Nursery"> Nursery</option>
              <option value="class2">Class 2</option>
              <option value="class3">Class 3</option>
              <option value="class4">Class 4</option>
              <option value="class5">Class 5</option>
              <option value="Navodaya">Navodaya</option>
              <option value="class6">Class 6</option>
              <option value="class7">Class 7</option>
              <option value="class8">Class 8</option>
              <option value="class9">Class 9</option>
              <option value="class10">Class 10</option>
              <option value="class11">Class 11</option>
              <option value="class12">Class 12</option>
              {/* Add more class options as needed */}
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive" style={{ width: "80%" }}>
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Date</th>
              <th>Present Students</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => {
              // Check if entry matches the filters
              if (
                (filterDate &&
                  new Date(entry.date).toDateString() !==
                    filterDate.toDateString()) ||
                (filterClass && entry.classId !== filterClass)
              ) {
                return null; // Skip entries that don't match the filters
              }

              return (
                <tr key={index}>
                  <td>{entry.classId}</td>
                  <td>
                    {filterDate
                      ? filterDate.toLocaleDateString()
                      : new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td>
                    <ul>
                      {entry.attendance
                        .filter((student) => student.status === "present")
                        .map((student) => (
                          <li key={student.studentId}>
                            {studentNames[student.studentId] || "Unknown Name"}
                          </li>
                        ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
