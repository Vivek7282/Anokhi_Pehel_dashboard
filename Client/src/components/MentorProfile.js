import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ScorePage.css";
import myImage from "../image/backgroundImage.jpeg";
import profile from "../image/profile.png";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
const ScorePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("user._id");
  const [mentor, setMentor] = useState(null); // Store mentor data in a single variable
  const [classSchedule, setClassSchedule] = useState([]); // Store class schedule data
  const [lineSchedule, setLineSchedule] = useState([]); // Store line schedule data
  const [lineSchedule1, setLineSchedule1] = useState([]); // Store line schedule data
  useEffect(() => {
    // Debugging: Check the value of userId
    // console.log("userId:", userId);

    // Fetch mentor data when the component mounts
    if (userId) {
      axios
        .get(`${BASE_URL}/api/getmentorsByUserId?userid=${userId}`)
        .then((res) => {
          //   console.log("Fetched mentor data:", res.data); // Log fetched data
          setMentor(res.data); // Assuming the response is an array, take the first item
        })
        .catch((err) => {
          console.error("Error fetching mentor: ", err);
        });

      // Fetch class schedule data for the mentor
      axios
        .get(`${BASE_URL}/api/getClassScheduleByMentorId?mentorId=${userId}`)
        .then((res1) => {
          //   console.log("Fetched class schedule data:", res1.data); // Log fetched data
          setClassSchedule(res1.data);
        })
        .catch((err) => {
          console.error("Error fetching class schedule: ", err);
        });

      axios
        .get(`${BASE_URL}/api/getLineScheduleByMentorId?mentorId=${userId}`)
        .then((res2) => {
          //   console.log("Fetched class schedule data:", res2.data); // Log fetched data
          setLineSchedule(res2.data);
        })
        .catch((err) => {
          console.error("Error fetching class schedule: ", err);
        });

      axios
        .get(`${BASE_URL}/api/getLineSchedule1ByMentorId?mentorId=${userId}`)
        .then((res3) => {
          //   console.log("Fetched class schedule data:", res3.data); // Log fetched data
          setLineSchedule1(res3.data);
        })
        .catch((err) => {
          console.error("Error fetching class schedule: ", err);
        });
    }
  }, [userId]);

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
      <div className="mentor-profile">
        {mentor ? (
          <div className="mentor-card">
            <img
              src={`http://localhost:5000/images/${mentor.photo}`}
              className="mentor-photo"
            />

            <div className="mentor-details">
              <h3>{mentor.name}</h3>
              <p>
                <span className="highlight-text">Registration Number:</span>{" "}
                <span className="custom-color">{mentor.regnumber}</span>
              </p>
              <p>
                <span className="highlight-text">Email:</span>{" "}
                <span className="custom-color">{mentor.email}</span>
              </p>
              <p>
                <span className="highlight-text">Phone:</span>{" "}
                <span className="custom-color">{mentor.phone}</span>
              </p>
            </div>
            <div className="class-schedule-container">
              <h2 className="schedule-title">Class Schedule</h2>
              <div className="class-schedule">
                <ul>
                  {classSchedule && classSchedule.length > 0 ? (
                    classSchedule[0].schedule.map((scheduleItem, index) => {
                      if (scheduleItem.mentor === userId) {
                        return (
                          <li key={index}>
                            <strong>Class:</strong> {classSchedule[0].className}{" "}
                            - <strong>Day:</strong> {scheduleItem.day} -{" "}
                            <strong>Subject:</strong> {scheduleItem.subject}
                          </li>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <li>No class schedule found.</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="class-schedule-container">
              <h2 className="schedule-title">Line Schedule</h2>
              <div className="class-schedule">
                <ul>
                  {lineSchedule && lineSchedule.length > 0 ? (
                    lineSchedule[0].schedule.map((scheduleItem, index) => {
                      if (scheduleItem.pickup === userId) {
                        return (
                          <li key={index}>
                            <strong>PickUp:</strong> <strong>Location:</strong>{" "}
                            {lineSchedule[0].location} - <strong>Day:</strong>{" "}
                            {scheduleItem.day}{" "}
                          </li>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <li>No Pickup schedule found.</li>
                  )}
                </ul>
                <ul>
                  {lineSchedule1 && lineSchedule1.length > 0 ? (
                    lineSchedule1[0].schedule.map((scheduleItem, index) => {
                      if (scheduleItem.drop === userId) {
                        return (
                          <li key={index}>
                            <strong>Drop:</strong> <strong>Location:</strong>{" "}
                            {lineSchedule1[0].location} - <strong>Day:</strong>{" "}
                            {scheduleItem.day}{" "}
                          </li>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <li>No Drop schedule found.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p>No mentor data available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ScorePage;
