import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "./Header";
import Image from "../image/340434.png";

const ViewTopic = () => {
  const [topics, setTopics] = useState([]);
  const [filterSubject, setFilterSubject] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api14/topic")
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

    doc.autoTable({
      head: [["Class", "Day", "Subject", "Mentor"]],
      body: Object.keys(groupedTopics).flatMap((key) => {
        const topicsForClassDay = groupedTopics[key];
        return topicsForClassDay.map((topic) => [
          topic.className,
          topic.day,
          topic.subject,
          topic.mentorName, // Assuming you fetch and store mentor names
        ]);
      }),
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
                    <td>{topic.mentorId}</td>
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
