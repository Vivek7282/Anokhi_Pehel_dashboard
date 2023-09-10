import React, { useState } from "react";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Image from "../image/340434.png";
const TakeAttendance = () => {
  const [selectedClass, setSelectedClass] = useState(""); // State to store the selected class
  const navigate = useNavigate(); // Initialize the navigate function here

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("hi", selectedClass);
    navigate(`/attendance?class=${selectedClass}`);
  };

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Make it full viewport height
      }}
    >
      <Header />
      <h2 className="text-center text-white">Take Attendance</h2>
      <div className="container mt-5 d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="class" className="form-label text-white">
              Select Class:
            </label>
            <select
              className="form-select"
              name="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
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
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center justify-content-center"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default TakeAttendance;
