import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";

const TestScoreTable = () => {
  const [testScores, setTestScores] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [filterClass, setFilterClass] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [studentNames, setStudentNames] = useState({});

  useEffect(() => {
    // Fetch test scores data when the component mounts
    axios
      .get(`${BASE_URL}/api/getTestScores`) // Update the API endpoint
      .then((response) => {
        setTestScores(response.data);

        // Extract all unique student IDs
        const uniqueStudentIds = new Set(
          response.data.flatMap((entry) =>
            entry.score.map((score) => score.studentId)
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
      <h2 style={{ color: "white", fontWeight: "bold" }}>Test Score Table</h2>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Date:</label>
            <input
              type="date"
              className="form-control"
              value={filterDate ? filterDate.toISOString().split("T")[0] : ""}
              onChange={handleFilterDateChange}
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Class:</label>
            <select
              className="form-select"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">Select a class</option>
              <option value="Nursery"> Nursery</option>
              <option value="class1">Class 1</option>
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
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Subject:</label>

            <select
              className="form-select"
              name="subject"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="">Select a Subject</option>
              <option value="All SUbject">All Subject</option>
              <option value="Maths"> Maths</option>
              <option value="Science">Science</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Reasoning">Reasoning</option>
              <option value="Social Science">Social Science</option>
              <option value="GK">GK</option>

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
              <th>Subject</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {testScores.map((entry, index) => {
              // Check if entry matches the filters
              if (
                (filterDate &&
                  new Date(entry.date).toDateString() !==
                    filterDate.toDateString()) ||
                (filterClass && entry.classId !== filterClass) ||
                (filterSubject &&
                  !entry.subject
                    .toLowerCase()
                    .includes(filterSubject.toLowerCase()))
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
                  <td>{entry.subject}</td>
                  <td>
                    <ul>
                      {entry.score.map((score) => (
                        <li key={score.studentId}>
                          {studentNames[score.studentId] || "Unknown Name"} -{" "}
                          {score.score}
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

export default TestScoreTable;
