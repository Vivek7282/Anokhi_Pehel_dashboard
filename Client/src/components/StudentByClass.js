import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Service/helper";
function StudentsByClass({ match }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(""); // State to store the selected class
  const studentClass = match.params.class; // Get class from URL

  useEffect(() => {
    // Fetch students based on the selected class
    if (selectedClass) {
      // Make an HTTP request to fetch students by class
      fetch(`${BASE_URL}/api/students/${selectedClass}`)
        .then((response) => response.json())
        .then((data) => {
          setStudents(data);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    }
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <div>
      <h1>Student List</h1>
      <div>
        {/* Class selection form */}
        <form>
          <label htmlFor="class">Select a class:</label>
          <select
            id="class"
            name="class"
            onChange={handleClassChange}
            value={selectedClass}
          >
            <option value="">-- Select Class --</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            {/* Add more class options as needed */}
          </select>
        </form>
      </div>
      {selectedClass && (
        <div>
          <h2>Students in Class {selectedClass}</h2>
          <ul>
            {students.map((student) => (
              <li key={student._id}>{student.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StudentsByClass;
