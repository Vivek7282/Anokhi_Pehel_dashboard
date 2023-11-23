import React, { useState } from "react";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token to local storage
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("token", json.authToken);

      // Fetch the user's role by email

      const email = credentials.email;
      // console.log(email);

      const roleResponse = await fetch(
        `${BASE_URL}/api/getUserRoleByEmail?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", roleResponse.status);

      if (roleResponse.ok) {
        const roleJson = await roleResponse.json();
        console.log("Role JSON:", roleJson);

        // Check the user's role and redirect accordingly
        if (roleJson.role === "Admin") {
          navigate("/dashboardAdmin");
        } else if (roleJson.role === "Final Year Coordinator") {
          navigate("/dashboardFinalYear");
        } else if (roleJson.role === "Coordinator") {
          navigate("/dashboard");
        }
      } else {
        alert("Failed to fetch user role");
      }
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
          className="w-100 w-md-100 w-lg-50 m-3 p-3 border rounded bg-dark text-white"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="password"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
