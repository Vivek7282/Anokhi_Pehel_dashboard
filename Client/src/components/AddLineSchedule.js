import React, { useState, useEffect } from "react";
import axios from "axios";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";
import "../css/Addschedule.css";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
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
    location: "",
    schedule: daysOfWeek.map((day) => ({
      day,
      pickup: "",
      drop: "",
    })),
  });

  useEffect(() => {
    // Fetch mentor names when the component mounts
    axios
      .get(`${BASE_URL}/api/mentors`)
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
      .post(`${BASE_URL}/api/addlineschedule`, schedule)
      .then((res) => {
        console.log(res);
        // Check if the response indicates success (you should have a proper way to determine success)
        if (res.data === "Schedule Added") {
          // Clear the form data by resetting the state
          setSchedule({
            location: "",
            schedule: daysOfWeek.map((day) => ({
              day,
              pickup: "",
              drop: "",
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
    if (e.target.name === "location") {
      updatedSchedule.location = e.target.value;
    } else {
      updatedSchedule.schedule[index][e.target.name] = e.target.value;
    }
    setSchedule(updatedSchedule);
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
      <div className="container d-flex justify-content-center align-items-center">
        <form
          className=" w-sm-100 w-md-70 w-lg-100 m-3 p-3 border rounded bg-dark text-white"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="m-3">
            <label htmlFor="class" className="form-label">
              Location
            </label>
            <select
              type="text"
              className="form-control"
              name="location"
              value={schedule.location}
              onChange={(e) => onChange(e, -1)}
            >
              <option value="">Select a location</option>
              <option value="Chilla">Chilla</option>
              <option value="Kashiram">Kashiram</option>
              <option value="Phaphamau">Phaphamau</option>
              <option value="Nayagaon">Nayagaon</option>
              <option value="Shivkuti">Shivkuti</option>
              <option value="Swarajnagar">Swarajnagar</option>
              {/* Add more location options as needed */}
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
                <label htmlFor={`mentor${index}`} className="form-label">
                  Pickup
                </label>
                <select
                  className="form-control"
                  name="pickup"
                  placeholder="Pickup"
                  value={daySchedule.pickup}
                  onChange={(e) => onChange(e, index)}
                >
                  <option value="">Select a mentor</option>
                  {userNames.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="m-3">
                <label htmlFor={`mentor${index}`} className="form-label">
                  Drop
                </label>
                <select
                  className="form-control"
                  name="drop"
                  placeholder="Drop"
                  value={daySchedule.drop}
                  onChange={(e) => onChange(e, index)}
                >
                  <option value="">Select a mentor</option>
                  {userNames.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
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
