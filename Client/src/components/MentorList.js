import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";
import Footer from "./Footer";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin

const MentorList = () => {
  const [users, setUsers] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterRegnumber, setFilterRegnumber] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api1/mentorlist")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const userName = user.name ? user.name.toLowerCase() : "";
    const userRegnumber = user.regnumber ? user.regnumber.toLowerCase() : "";

    return (
      userName.includes(filterName.toLowerCase()) &&
      userRegnumber.includes(filterRegnumber.toLowerCase())
    );
  });

  const handleDownloadTable = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add the table to the PDF document
    doc.autoTable({
      head: [["Name", "Regnumber", "Phone", "Email"]],
      body: filteredUsers.map((user) => [
        user.name,
        user.regnumber,
        user.phone,
        user.email,
      ]),
    });

    // Save the PDF with a specific name
    doc.save("mentors_table.pdf");
  };

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
      <div className="container mt-5">
        <h2 className="text-center text-white">Mentors List</h2>
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
            <label className="text-white">Filter by Regnumber:</label>
            <input
              type="text"
              className="form-control"
              value={filterRegnumber}
              onChange={(e) => setFilterRegnumber(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Regnumber</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.regnumber}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleDownloadTable}>Download Table as PDF</button>
      </div>
      <Footer />
    </div>
  );
};

export default MentorList;
