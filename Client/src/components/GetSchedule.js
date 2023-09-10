import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import myImage from "../image/backgroundImage.jpeg";
import Footer from "./Footer";
import Image from "../image/340434.png";
const ScheduleTable = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [filterDay, setFilterDay] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [mentorsInfo, setMentorsInfo] = useState({}); // Store mentor information

  useEffect(() => {
    // Fetch schedule data when the component mounts
    axios
      .get("http://localhost:5000/api3/getschedule")
      .then((response) => {
        setScheduleData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch mentor information when the component mounts
    axios
      .get("http://localhost:5000/api2/mentors")
      .then((response) => {
        // Convert the response data into a mentor information object
        const mentorData = {};
        response.data.forEach((mentor) => {
          mentorData[mentor._id] = {
            name: mentor.name,
            phone: mentor.phone,
          };
        });
        setMentorsInfo(mentorData);
        console.log("Mentors Info:", mentorData); // Debugging
      })
      .catch((error) => {
        console.error("Error fetching mentors: ", error);
      });
  }, []);

  // Function to get mentor name and phone based on user_id
  const getMentorInfo = (user_id) => {
    const mentor = mentorsInfo[user_id];
    return mentor
      ? { name: mentor.name, phone: mentor.phone }
      : { name: "Unknown", phone: "Unknown" };
  };

  const filteredSchedule = scheduleData.filter((entry) => {
    // Convert filterDay to lowercase for case-insensitive comparison
    const day = filterDay.toLowerCase();
    // Convert entry day to lowercase for case-insensitive comparison
    const entryDay = entry.schedule[0].day.toLowerCase();

    if (filterDay && entryDay.indexOf(day) === -1) {
      return false; // Skip entries that don't have the specified day
    }
    if (filterClass && entry.className !== filterClass) {
      return false; // Skip entries that don't have the specified class
    }
    return true; // Include all other entries
  });

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
      <h2 style={{ color: "white", fontWeight: "bold" }}>Schedule Table</h2>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Day:</label>
            <input
              type="text"
              className="form-control"
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
            />
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <label className="text-white">Filter by Class:</label>
            <select
              className="form-control"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">Select a class</option>
              <option value="nursery">Nursery</option>
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
              {/* Add more class options as needed */}
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive" style={{ width: "80%" }}>
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Day</th>
              <th>Subject</th>
              <th>Mentor</th>
              <th>Phone</th> {/* Add phone column */}
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.map((entry, index) => (
              <React.Fragment key={index}>
                {entry.schedule.map((scheduleItem, itemIndex) => {
                  const mentorInfo = getMentorInfo(scheduleItem.mentor);
                  return (
                    <tr key={`${index}-${itemIndex}`}>
                      {itemIndex === 0 ? (
                        <td rowSpan={entry.schedule.length}>
                          {entry.className}
                        </td>
                      ) : null}
                      <td>{scheduleItem.day}</td>
                      <td>{scheduleItem.subject}</td>
                      <td>{mentorInfo.name}</td>
                      <td>{mentorInfo.phone}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ScheduleTable;
