import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import myImage from "../image/backgroundImage.jpeg";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
const TopicsCoveredPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get("class");

  const [topicData, setTopicData] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [teacherList, setTeacherList] = useState([]); // List of teachers from the schedule collection
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [mentorIds, setMentorIds] = useState([]);
  // Fetch the list of topics covered for the selected class based on the `classId`
  useEffect(() => {
    if (classId) {
      // Fetch the list of teachers from the schedule collection
      //   console.log(classId);
      axios
        .get(`${BASE_URL}/api/getTeachersByClass?class=${classId}`)
        .then((response) => {
          const mentorIds = response.data.flatMap((mentor) =>
            mentor.schedule.map((scheduleItem) => scheduleItem.mentor)
          );
          setMentorIds(mentorIds);
          // Assuming this gives you an array of mentor IDs
          console.log(mentorIds);
          const mentorPromises = mentorIds.map(async (mentorId) => {
            try {
              const mentorNameResponse = await axios.get(
                `http://localhost:5000/api1/getmentorsByUserId?userid=${mentorId}`
              );
              return mentorNameResponse.data.name; // Assuming the mentor's name is stored in the "name" field
            } catch (error) {
              console.error(
                `Error fetching mentor name for ID ${mentorId}:`,
                error
              );
              return "Unknown Mentor"; // Default name if fetching fails
            }
          });

          // Wait for all mentor name fetch requests to complete
          Promise.all(mentorPromises)
            .then((mentorNames) => {
              // mentorNames is an array of mentor names corresponding to the mentor IDs
              console.log("Mentor Names:", mentorNames);
              setTeacherList(mentorNames);
              // You can use mentorNames as needed in your application
            })
            .catch((error) => {
              console.error("Error fetching mentor names:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching mentor IDs:", error);
        });
    }
  }, [classId]);

  // Step 1: Fetch Mentor IDs from the Class-Mentor table based on classId

  const handleNewTopicChange = (e) => {
    setNewTopic(e.target.value);
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmitTopic = (e) => {
    e.preventDefault();

    // Prepare the topic data to be sent to the server
    const topicSubmission = {
      classId: classId,
      date: new Date().toISOString(), // You can adjust the date format as needed
      mentorId: selectedTeacher, // Selected teacher from the dropdown
      topic: newTopic,
      subject: subject,
    };

    // Send the topic data to the server using Axios
    axios
      .post("http://localhost:5000/api14/addTopicCovered", topicSubmission)
      .then((response) => {
        console.log(response.data);
        if (response.data === "Added") {
          alert("Topic Covered Saved");
        } else {
          alert("Topic Covered Updated");
        }
        setNewTopic(""); // Clear the input field after submission
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error(error);
      });
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
      <h2>Topics Covered for {classId}</h2>
      <form
        className="w-md-100 w-lg-100 m-2 p-2 border rounded bg-dark text-white"
        onSubmit={handleSubmitTopic}
      >
        <div className="form-group mb-3">
          <label htmlFor="teacher" className="text-white">
            Select Teacher:
          </label>
          <select
            className="form-select"
            name="teacher"
            value={selectedTeacher}
            onChange={handleTeacherChange}
          >
            <option value="">Select a Teacher</option>
            {teacherList.map((mentorName, index) => (
              <option key={index} value={mentorIds[index]}>
                {mentorName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="subject" className="text-white">
            Subject:
          </label>

          <select
            className="form-select"
            name="subject"
            value={subject}
            onChange={handleSubjectChange}
          >
            <option value="">Select a Subject</option>
            <option value="All SUbject">All Subject</option>
            <option value="Maths"> Maths</option>
            <option value="Science">Science</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Reasoning">Reasoning</option>
            <option value="Social Science">Social Science</option>
            <option value="GK">GK</option>

            {/* Add more class options as needed */}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="newTopic" className="text-white">
            Add The Topic Covered Today:
          </label>
          <input
            type="text"
            className="form-control"
            id="newTopic"
            value={newTopic}
            onChange={handleNewTopicChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Add Topic
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default TopicsCoveredPage;
