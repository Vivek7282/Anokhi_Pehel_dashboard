// AttendancePage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import myImage from "../image/backgroundImage.jpeg";


const ScorePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get("class");

  const [students, setStudents] = useState([]);
  const [scoreData, setScoreData] = useState({});

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
            initialData[student._id] = -1; // Default value is -1
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      date: new Date().toISOString(), // You can adjust the date format as needed
      scoreRecords,
    };

    // Send the attendance data to the server using Axios
    axios
      .post("http://localhost:5000/api6/submitscore", scoreSubmission)
      .then((response) => {
        console.log(response.data);
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "50vh",
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
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>
                  <input
                    type="number"
                    min={-1}
                    max={100}
                    value={scoreData[student._id]}
                    onChange={(e) =>
                      handleScoreChange(student._id, parseInt(e.target.value))
                    }
                  />
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
