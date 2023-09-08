import React, { useEffect, useState } from "react";
import axios from "axios";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";

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

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="container mt-5">
        <h2 className="text-center text-white">Mentors List</h2>
        <div className="row">
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
                <th>Photo</th>
                <th>Name</th>
                <th>Regnumber</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={`/uploads/${user.photo}`}
                      alt={user.name}
                      className="img-fluid"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.regnumber}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentorList;
