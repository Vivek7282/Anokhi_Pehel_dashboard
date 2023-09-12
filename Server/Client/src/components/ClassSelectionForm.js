// ClassSelectionForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClassSelectionForm() {
  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect to the Student List page with the selected class as a parameter
    navigate("/students/${className}");
    // history.push(`/students/${className}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Class Name:
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ClassSelectionForm;
