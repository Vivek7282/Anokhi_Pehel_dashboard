import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ScorePage.css";
import myImage from "../image/backgroundImage.jpeg";
import profile from "../image/profile.png";
import Image from "../image/340434.png";
const ScorePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get("student._id");
  const [student, setStudent] = useState(null); // Store mentor data in a single variable
  const [marks, setMarks] = useState([]); // Store class schedule data
  console.log(studentId);
  useEffect(() => {
    if (studentId) {
      axios
        .get(
          `http://localhost:5000/api1/getstudentByUserId?studentid=${studentId}`
        )
        .then((res) => {
          console.log("Fetched mentor data:", res.data); // Log fetched data
          setStudent(res.data); // Assuming the response is an array, take the first item
        })
        .catch((err) => {
          console.error("Error fetching mentor: ", err);
        });

      axios
        .get(
          `http://localhost:5000/api6/getMarksByUserId?studentid=${studentId}`
        )
        .then((res1) => {
          //   console.log("Fetched class schedule data:", res1.data); // Log fetched data
          setMarks(res1.data);
        })
        .catch((err) => {
          console.error("Error fetching class schedule: ", err);
        });
    }
  }, [studentId]);

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
      }}
    >
      <Header />
      <h2>Profile</h2>
      <div className="mentor-profile ">
        {student ? (
          <div className="mentor-card">
            <img
              src={`http://localhost:5000/images/${student.photo}`}
              className="mentor-photo"
            />

            <div className="mentor-details">
              <h3>{student.name}</h3>
              <p>
                <span className="highlight-text">Location:</span>{" "}
                <span className="custom-color">{student.location}</span>
              </p>
              <p>
                <span className="highlight-text">Mode:</span>{" "}
                <span className="custom-color">{student.mode}</span>
              </p>
              <p>
                <span className="highlight-text">Phone:</span>{" "}
                <span className="custom-color">{student.phone}</span>
              </p>
              <p>
                <span className="highlight-text">School:</span>{" "}
                <span className="custom-color">{student.school}</span>
              </p>
              <p>
                <span className="highlight-text">Class:</span>{" "}
                <span className="custom-color">{student.className}</span>
              </p>
              <p>
                <span className="highlight-text">Address:</span>{" "}
                <span className="custom-color">{student.address}</span>
              </p>
            </div>

            <div className="class-schedule-container">
              <h2 className="schedule-title">Marks Record</h2>
              <div className="class-schedule">
                <ul>
                  {marks && marks.length > 0 ? (
                    marks.map((mark, index) => {
                      const studentMarks = mark.score.find(
                        (score) => score.studentId === studentId
                      );

                      if (studentMarks) {
                        const date = new Date(mark.date).toLocaleDateString(); // Format date

                        return (
                          <li key={index}>
                            <strong>Date:</strong> {date} -{" "}
                            <strong>Subject:</strong> {mark.subject} -{" "}
                            <strong>Marks:</strong> {studentMarks.score}
                          </li>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <li>No Marks Record found.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p>No student data available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ScorePage;
