import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import myImage from "../image/backgroundImage.jpeg";

import Image from "../image/340434.png";
import { useNavigate } from "react-router-dom";
const ScorePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get("class");

  const [students, setStudents] = useState([]);
  const [scoreData, setScoreData] = useState({});
  const [errors, setErrors] = useState({}); // State to manage validation errors
  const [subject, setSubject] = useState("");
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
            initialData[student._id] = 0; // Default value is -1
          });
          setScoreData(initialData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [classId]);

  const handleScoreChange = (studentId, score) => {
    if (score >= 0 && score <= 100) {
      setScoreData((prevData) => ({
        ...prevData,
        [studentId]: score,
      }));
      // Clear the error message if the input is valid
      setErrors((prevErrors) => ({
        ...prevErrors,
        [studentId]: "",
      }));
    } else {
      // Display an error message for invalid input
      setErrors((prevErrors) => ({
        ...prevErrors,
        [studentId]: "Invalid score. Please enter a value between 0 and 100.",
      }));
    }
  };
  const handleSubjectChange = (subject) => {
    setSubject(subject);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for validation errors before submitting
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      // Handle validation errors
      return;
    }

    // Prepare the attendance data to be sent to the server
    const scoreRecords = Object.entries(scoreData).map(
      ([studentId, score]) => ({
        studentId,
        score,
      })
    );

    // Create an object with all the data to be sent to the server
    const scoreSubmission = {
      classId: classId,
      subject: subject,
      date: new Date().toISOString(),
      scores: scoreRecords, // Use "scores" as the property name
    };

    // Send the attendance data to the server using Axios
    axios
      .post("http://localhost:5000/api6/submitscore", scoreSubmission)

      .then((res) => {
        if (res.data === "Added") {
          console.log(res.data);
          alert("Score submitted successfully");
          const navigate = useNavigate();
          navigate("/dashboard");
          setScoreData({
            subject: "",
            score: "",
          });
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
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        // minHeight: "100vh", // Make it full viewport height
      }}
    >
      <Header />
      <h2>Students List for {classId}</h2>
      <div className="mb-3">
        <label htmlFor="subject" className="form-label text-white">
          Subject:
        </label>

        <select
          className="form-select"
          name="subject"
          value={subject}
          onChange={(e) => handleSubjectChange(e.target.value)}
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
      <form
        className="w-md-100 w-lg-100 m-2 p-2 border rounded bg-dark text-white"
        onSubmit={handleSubmit}
      >
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>
                  <input
                    type="number" // Use type="number" for numeric input
                    className="form-control"
                    value={scoreData[student._id].toString()} // Assuming scoreData[student._id] is a number
                    onChange={(e) =>
                      handleScoreChange(student._id, parseInt(e.target.value))
                    }
                  />
                  <div className="text-danger">{errors[student._id]}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">
          Submit Score
        </button>
      </form>
    </div>
  );
};

export default ScorePage;
