import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/studentlist`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredStudents = students.filter((student) => {
    const studentName = student.name ? student.name.toLowerCase() : "";
    const studentClass = student.className
      ? student.className.toLowerCase()
      : "";
    const studentLocation = student.location
      ? student.location.toLowerCase()
      : "";

    return (
      studentName.includes(filterName.toLowerCase()) &&
      studentClass.includes(filterClass.toLowerCase()) &&
      studentLocation.includes(filterLocation.toLowerCase())
    );
  });

  const handleDownloadTable = () => {
    const doc = new jsPDF();

    doc.autoTable({
      head: [["Name", "Class", "Phone", "Location", "Mode", "School"]],
      body: filteredStudents.map((student) => [
        student.name,
        student.className,
        student.phone,
        student.location,
        student.mode,
        student.school,
      ]),
    });

    doc.save("students_table.pdf");
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

            <select
              className="form-select"
              name="class"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              aria-describedby="classHelp"
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
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Location:</label>

            <select
              className="form-control"
              name="location"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              aria-describedby="emailHelp"
            >
              <option value="">Select Location</option>
              <option value="Nayagaon"> Nayagaon</option>
              <option value="Chilla"> Chilla</option>
              <option value="Shivkuti"> Shivkuti</option>
              <option value="Swarajnagar"> Swarajnagar</option>
              <option value="Kashiram"> Kashiram</option>
              <option value="Phaphamau"> Phaphamau</option>
              <option value="other">Other</option>
            </select>
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
                <th>Profile</th>
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
                  <td>
                    <Link
                      to={`/studentprofile?student._id=${student._id}`}
                      className="btn btn-primary"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleDownloadTable}>Download Table as PDF</button>
      </div>
    </div>
  );
};

export default StudentList;
