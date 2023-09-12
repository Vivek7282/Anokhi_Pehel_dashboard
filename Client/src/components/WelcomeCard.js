import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ScorePage.css";
import { Link } from "react-router-dom";

import myImage from "../image/backgroundImage.jpeg";
import profile from "../image/profile.png";
import Image from "../image/340434.png";

const WelcomeCard = ({ userEmail }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = userEmail;

  const [user, setUser] = useState(null);
  //   console.log(userId);
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api8/getmentorsByEmail?email=${userId}`)
        .then((res) => {
          setUser(res.data); // Assuming the response is an array, take the first item
        })
        .catch((err) => {
          console.error("Error fetching mentor: ", err);
        });
    }
  }, [userId]);

  return (
    <div className="welcome-card">
      <h3>Welcome Back</h3>
      {user ? <p>{user[0].name}</p> : <p>No mentor data available.</p>}
      <Link to="/getclasslist" className="btn btn-primary">
        Today's Class
      </Link>
    </div>
  );
};

export default WelcomeCard;
