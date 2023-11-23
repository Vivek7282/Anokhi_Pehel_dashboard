import React, { useState } from "react";

import axios from "axios";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
export default function AddStudents() {
  const [credentials, setCredentials] = useState({
    name: "",
    class: "",
    location: "",
    mode: "",
    phone: "",
    school: "",
    dob: "",
    address: "",
    photo: "",
  });

  //   const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("class", credentials.class);
    formData.append("phone", credentials.phone);
    formData.append("location", credentials.location);
    formData.append("mode", credentials.mode);
    formData.append("dob", credentials.dob);
    formData.append("address", credentials.address);
    formData.append("school", credentials.school);
    formData.append("photo", credentials.photo);

    axios
      .post(`${BASE_URL}/api/addstudent`, formData)
      .then((res) => {
        console.log(res);
        // Check if the response indicates success (you should have a proper way to determine success)
        if (res.data === "Student Added") {
          // Show an alert message
          alert("Student submitted successfully!");
          // Clear the form data by resetting the state
          setCredentials({
            name: "",
            class: "",
            phone: "",
            school: "",
            location: "",
            mode: "",
            dob: "",
            address: "",
            photo: "",
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
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
          className="mx-auto w-md-100 w-lg-100 m-2 p-2 border rounded bg-dark text-white"
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
            <label htmlFor="class" className="form-label">
              Class
            </label>
            <select
              className="form-select"
              name="class"
              value={credentials.class}
              onChange={onChange}
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

          <div className="m-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <select
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={onChange}
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

            {credentials.location === "other" && (
              <div className="mt-3">
                <label htmlFor="otherLocation" className="form-label">
                  Other Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="otherLocation"
                  placeholder="Other Location"
                  value={credentials.otherLocation}
                  onChange={onChange}
                />
              </div>
            )}
          </div>

          <div className="m-3">
            <label htmlFor="class" className="form-label">
              Mode
            </label>
            <select
              className="form-select"
              name="mode"
              value={credentials.mode}
              onChange={onChange}
              aria-describedby="classHelp"
            >
              <option value="">Select Mode</option>
              <option value="Self-parent">Self-parent</option>
              <option value="Self-cycle">Self-cycle</option>
              <option value="Line Patel Gate">Line Patel Gate</option>
              <option value="Line Ganga Gate">Line Ganga Gate</option>
              <option value="Line Naygaon">Line Nayagaon</option>
              <option value="Line Phaphamau">Line Phaphamau</option>
              <option value="Line Shivkuti">Line Shivkuti</option>
              {/* Add more class options as needed */}
            </select>
          </div>
          <div className="m-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="phone"
              className="form-control"
              name="phone"
              placeholder="Phone Number"
              value={credentials.phone}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="m-3">
            <label htmlFor="school" className="form-label">
              School
            </label>
            <input
              type="school"
              className="form-control"
              name="school"
              placeholder="School"
              value={credentials.school}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="school" className="form-label">
              Complete Address
            </label>
            <input
              type="school"
              className="form-control"
              name="address"
              placeholder="Complete Address"
              value={credentials.address}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="school" className="form-label">
              Date of Birth
            </label>
            <input
              type="Date"
              className="form-control"
              name="dob"
              placeholder="Date of Birth"
              value={credentials.dob}
              onChange={onChange}
              aria-describedby="emailHelp"
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
              // Specify 'camera' to use the device's camera
              onChange={onPhotoChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
