import React, { useState, useEffect } from "react";
import axios from "axios";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";
import "../css/Addschedule.css";

export default function AddSchedule() {
  const [userNames, setUserNames] = useState([]);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [schedule, setSchedule] = useState({
    className: "",
    schedule: daysOfWeek.map((day) => ({
      day,
      subject: "",
      mentor: "",
    })),
  });

  useEffect(() => {
    // Fetch mentor names when the component mounts
    axios
      .get("http://localhost:5000/api2/mentors")
      .then((res) => {
        setUserNames(res.data);
      })
      .catch((err) => {
        console.error("Error fetching mentors: ", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api3/addschedule", schedule)
      .then((res) => {
        console.log(res);
        // Check if the response indicates success (you should have a proper way to determine success)
        if (res.data === "Schedule Added") {
          // Clear the form data by resetting the state
          setSchedule({
            className: "",
            schedule: daysOfWeek.map((day) => ({
              day,
              subject: "",
              mentor: "",
            })),
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const onChange = (e, index) => {
    const updatedSchedule = { ...schedule };
    if (e.target.name === "className") {
      updatedSchedule.className = e.target.value;
    } else {
      updatedSchedule.schedule[index][e.target.name] = e.target.value;
    }
    setSchedule(updatedSchedule);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${myImage})`,
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
      <div className="container d-flex justify-content-center align-items-center">
        <form
          className=" w-sm-100 w-md-70 w-lg-100 m-3 p-3 border rounded bg-dark text-white"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="m-3">
            <label htmlFor="class" className="form-label">
              Class
            </label>
            <select
              type="text"
              className="form-control"
              name="className"
              placeholder="Class Name"
              value={schedule.className}
              onChange={(e) => onChange(e, -1)}
            >
              i{/* Add more class options as needed */}
            </select>
          </div>

          {schedule.schedule.map((daySchedule, index) => (
            <div key={index}>
              <div className="m-3">
                <label htmlFor={`day${index}`} className="form-label">
                  {daySchedule.day}
                </label>
              </div>

              <div className="m-3">
                <label htmlFor={`subject${index}`} className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  placeholder="Subject"
                  value={daySchedule.subject}
                  onChange={(e) => onChange(e, index)}
                />
              </div>
              <div className="m-3">
                <label htmlFor={`mentor${index}`} className="form-label">
                  Mentor
                </label>
                <select
                  className="form-control"
                  name="mentor"
                  placeholder="Mentor"
                  value={daySchedule.mentor}
                  onChange={(e) => onChange(e, index)}
                >
                  <option value="">Select a mentor</option>
                  {userNames.map((user) => (
                    <option key={user._id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="m-3">
                <label htmlFor={`mentor${index}`} className="form-label">
                  Mentor
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mentor"
                  placeholder="Mentor"
                  value={daySchedule.mentor}
                  onChange={(e) => onChange(e, index)}
                />
              </div> */}
            </div>
          ))}

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
