import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "./Header";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
const ViewTopic = () => {
  const [topics, setTopics] = useState([]);
  const [filterSubject, setFilterSubject] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [mentorNames, setMentorNames] = useState({});
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/topic`)
      .then((response) => {
        setTopics(response.data);
        const mentorIds = Array.from(
          new Set(response.data.map((topic) => topic.mentorId))
        ); // Get unique mentor IDs
        fetchMentorNames(mentorIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Apply filters when filter options change
  useEffect(() => {
    // Apply filters when filter options change
    const filtered = topics.filter((topic) => {
      const subjectMatch =
        filterSubject === "" ||
        (topic.subject &&
          topic.subject.toLowerCase().includes(filterSubject.toLowerCase()));
      const classMatch =
        filterClass === "" ||
        (topic.classId &&
          topic.classId.toLowerCase() === filterClass.toLowerCase());
      const dateMatch =
        filterDate === null ||
        new Date(topic.date).toDateString() === filterDate.toDateString();
      return subjectMatch && classMatch && dateMatch;
    });

    setFilteredTopics(filtered);
  }, [filterSubject, filterClass, filterDate, topics]);

  const fetchMentorNames = (mentorIds) => {
    const mentorNamePromises = mentorIds.map((mentorId) => {
      return axios
        .get(`${BASE_URL}/api1/getmentorsByUserId?userid=${mentorId}`)
        .then((res) => {
          // Assuming the mentor's name is in res.data.name
          return { [mentorId]: res.data.name };
        })
        .catch((err) => {
          console.error("Error fetching mentor name: ", err);
          return { [mentorId]: "Unknown Mentor" }; // Default name if fetching fails
        });
    });

    Promise.all(mentorNamePromises)
      .then((mentorNameResults) => {
        const mentorNameMap = {};
        mentorNameResults.forEach((result) => {
          const mentorId = Object.keys(result)[0];
          const mentorName = result[mentorId];
          mentorNameMap[mentorId] = mentorName;
        });
        setMentorNames(mentorNameMap);
      })
      .catch((error) => {
        console.error("Error fetching mentor names: ", error);
      });
  };

  // Assuming you have an array of topics with fields: className, day, subject, mentorId
  // You can group topics by class and day
  const groupedTopics = topics.reduce((result, topic) => {
    const key = `${topic.className}_${topic.day}`;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(topic);
    return result;
  }, {});

  const handleDownloadTable = () => {
    const doc = new jsPDF();
    const tableData = filteredTopics.map((topic) => {
      return [
        topic.className,
        formatDate(topic.date),
        topic.subject,
        mentorNames[topic.mentorId] || "Unknown Mentor",
      ];
    });

    doc.autoTable({
      head: [["Class", "Date", "Subject", "Mentor"]],
      body: tableData,
    });

    doc.save("topics_covered_table.pdf");
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  return (
    <div
      className="bg-image"
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
      <h2 className="text-center text-white">Topics Covered</h2>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="text-white">Filter by Date:</label>
            <input
              type="date"
              className="form-control"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="text-white">Filter by Class:</label>
            <select
              className="form-select"
              name="class"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">Select a class</option>
              <option value="Nursery"> Nursery</option>
              <option value="class1">Class 1</option>
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
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="text-white">Filter by Mentor:</label>
            <select
              className="form-select"
              name="mentor"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="">Select a mentor</option>
              {/* Add your mentor options here */}
            </select>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Class</th>
                <th>Day</th>
                <th>Subject</th>
                <th>Mentor</th>
                <th>Topic Covered</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedTopics).map((key) => {
                const topicsForClassDay = groupedTopics[key];
                return topicsForClassDay.map((topic, index) => (
                  <tr key={index}>
                    <td>{topic.classId}</td>
                    <td>{formatDate(topic.date)}</td>
                    <td>{topic.subject}</td>
                    <td>{mentorNames[topic.mentorId] || "Unknown Mentor"}</td>
                    <td>{topic.topic}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
        <button onClick={handleDownloadTable}>Download Table as PDF</button>
      </div>
    </div>
  );
};

export default ViewTopic;
