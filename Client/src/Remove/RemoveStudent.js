import React, { useEffect, useState } from "react";
import axios from "axios";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api1/studentlist")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredStudents = students.filter((student) => {
    const studentName = student.name ? student.name.toLowerCase() : "";
    const studentClass = student.class ? student.class.toLowerCase() : "";
    const studentLocation = student.location
      ? student.location.toLowerCase()
      : "";

    return (
      studentName.includes(filterName.toLowerCase()) &&
      studentClass.includes(filterClass.toLowerCase()) &&
      studentLocation.includes(filterLocation.toLowerCase())
    );
  });

  return (
    <div
      className="bg-image"
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
      <h2 className="text-center text-white">Students List</h2>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Name:</label>
            <input
              type="text"
              className="form-control"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Class:</label>
            <input
              type="text"
              className="form-control"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Location:</label>
            <input
              type="text"
              className="form-control"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Mode</th>
                <th>School</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>{student.phone}</td>
                  <td>{student.location}</td>
                  <td>{student.mode}</td>
                  <td>{student.school}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
