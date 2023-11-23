import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";
import Footer from "./Footer";
import { BASE_URL } from "../Service/helper";
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    regnumber: "",
    phone: "",
    role: "",
    photo: "",
  });
  //   const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("phone", credentials.phone);
    formData.append("regnumber", credentials.regnumber);
    formData.append("password", credentials.password);
    formData.append("role", credentials.role);
    formData.append("photo", credentials.photo);

    axios
      .post(`${BASE_URL}/api/createuser`, formData)
      .then((res) => {
        console.log(res);
        // Check if the response indicates success (you should have a proper way to determine success)
        if (res.data === "User Added") {
          alert("Student submitted successfully!");
          // Clear the form data by resetting the state
          setCredentials({
            name: "",
            email: "",
            phone: "",
            regnumber: "",
            password: "",
            role: "",
            photo: "",
          });
        }
      })
      .catch((err) => {
        console.log("vivek error=", err);
      });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onPhotoChange = (e) => {
    setCredentials({ ...credentials, photo: e.target.files[0] });
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
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Registration Number
            </label>
            <input
              type="text"
              className="form-control"
              name="regnumber"
              placeholder="Registration Number"
              value={credentials.regnumber}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="m-3">
            <label htmlFor="name" className="form-label">
              phone Number
            </label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Phone Number"
              value={credentials.phone}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="class" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              name="role"
              value={credentials.role}
              onChange={onChange}
              aria-describedby="classHelp"
            >
              <option value="">Select a Role</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Final Year Coordinator">
                Final Year Coordinator
              </option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>

          <div className="m-3">
            <label htmlFor="photo" className="form-label">
              Photo
            </label>
            <input
              type="file"
              className="form-control"
              name="photo"
              accept=".png, .jpg, .jpeg,capture=camera"
              //   value={credentials.photo}
              onChange={onPhotoChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}
