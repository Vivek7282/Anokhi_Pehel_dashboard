import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import myImage from "../image/backgroundImage.jpeg";

const LinescheduleTable = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [filterDay, setFilterDay] = useState("");
  const [filterClass, setFilterClass] = useState("");

  useEffect(() => {
    // Fetch schedule data when the component mounts
    axios
      .get("http://localhost:5000/api7/getlineschedule")
      .then((response) => {
        // console.log("Received data:", response.data); // Log the received data
        setScheduleData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredSchedule = scheduleData.filter((entry) => {
    // Convert filterDay to lowercase for case-insensitive comparison
    const day = filterDay.toLowerCase();
    // Convert entry day to lowercase for case-insensitive comparison
    const entryDay = entry.schedule[0].day.toLowerCase();

    if (filterDay && entryDay.indexOf(day) === -1) {
      return false; // Skip entries that don't have the specified day
    }
    if (filterClass && entry.location !== filterClass) {
      return false; // Skip entries that don't have the specified class
    }
    return true; // Include all other entries
  });

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
      <h2 style={{ color: "white", fontWeight: "bold" }}>
        Line Schedule Table
      </h2>
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
            <label className="text-white">Filter by Location:</label>
            <select
              className="form-control"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">Select a location</option>
              <option value="Chilla">Chilla</option>
              <option value="Kashiram">Kashiram</option>
              <option value="Phaphamau">Phaphamau</option>
              <option value="Nayagaon">Nayagaon</option>
              <option value="Shivkuti">Shivkuti</option>
              <option value="Swarajnagar">Swarajnagar</option>
              {/* Add more class options as needed */}
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive" style={{ width: "80%" }}>
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Location</th>
              <th>Day</th>
              <th>Pickup</th>
              <th>Drop</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.map((entry, index) => (
              <React.Fragment key={index}>
                {entry.schedule.map((scheduleItem, itemIndex) => (
                  <tr key={`${index}-${itemIndex}`}>
                    {itemIndex === 0 ? (
                      <td rowSpan={entry.schedule.length}>{entry.location}</td>
                    ) : null}
                    <td>{scheduleItem.day}</td>
                    <td>{scheduleItem.pickup}</td>
                    <td>{scheduleItem.drop}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinescheduleTable;
