import React, { useEffect, useState } from "react";
import axios from "axios";
import myImage from "../image/backgroundImage.jpeg";
import Header from "./Header";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api1/studentlist")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredStudents = students.filter((student) => {
    const studentName = student.name ? student.name.toLowerCase() : "";
    const studentClass = student.className
      ? student.className.toLowerCase()
      : "";
    const studentLocation = student.location
      ? student.location.toLowerCase()
      : "";

    return (
      studentName.includes(filterName.toLowerCase()) &&
      studentClass.includes(filterClass.toLowerCase()) &&
      studentLocation.includes(filterLocation.toLowerCase())
    );
  });

  const handleDeleteStudent = async (studentId) => {
    try {
      // Send a request to delete the student by ID
      await axios.delete(
        `http://localhost:5000/api1/removestudent/${studentId}`
      );
      // Remove the deleted student from the local state
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
      // Handle the error as needed
    }
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
      <h2 className="text-center text-white">Students List</h2>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {/* ... Other filter inputs ... */}
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Mode</th>
                <th>School</th>
                <th>Action</th> {/* Add a new column for the Action button */}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>{student.phone}</td>
                  <td>{student.location}</td>
                  <td>{student.mode}</td>
                  <td>{student.school}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteStudent(student._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
