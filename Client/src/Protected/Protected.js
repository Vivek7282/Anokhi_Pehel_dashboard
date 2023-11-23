import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/");
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
}
