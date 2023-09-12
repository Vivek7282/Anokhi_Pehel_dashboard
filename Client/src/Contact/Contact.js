import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Image from "../image/340434.png";

const Contact = () => {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the query and user id to the server
      const response = await axios.post("/api/contact", {
        query,
        // userId: /* Add logic to get the user's id here */,
      });

      if (response.status === 200) {
        setSubmitted(true);
      } else {
        // Handle error
        console.error("Error submitting query");
      }
    } catch (error) {
      // Handle error
      console.error("Error submitting query", error);
    }
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

      <div className="container">
        <label className="form-label text-center">Your Query:</label>
        <textarea
          className="form-control"
          rows="4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        ></textarea>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
