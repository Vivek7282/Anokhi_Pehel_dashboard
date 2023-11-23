import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import myImage from "../image/backgroundImage.jpeg";
import Footer from "./Footer";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
const LinescheduleTable = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [filterDay, setFilterDay] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [userData, setUserData] = useState({}); // Store user information

  useEffect(() => {
    // Fetch schedule data when the component mounts
    axios
      .get(`${BASE_URL}/api/getlineschedule`)
      .then((response) => {
        setScheduleData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch user information when the component mounts
    axios
      .get(`${BASE_URL}/api/mentors`)
      .then((response) => {
        // Convert the response data into a user information object
        const userDataObject = {};
        response.data.forEach((user) => {
          userDataObject[user._id] = {
            name: user.name,
            phone: user.phone,
          };
        });
        setUserData(userDataObject);
      })
      .catch((error) => {
        console.error("Error fetching user information: ", error);
      });
  }, []);

  // Function to get user name and phone based on user_id
  const getUserInfo = (user_id) => {
    const user = userData[user_id];
    return user
      ? { name: user.name, phone: user.phone }
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
    if (filterLocation && entry.location !== filterLocation) {
      return false; // Skip entries that don't have the specified location
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
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="">Select a location</option>
              <option value="Chilla">Chilla</option>
              <option value="Kashiram">Kashiram</option>
              <option value="Phaphamau">Phaphamau</option>
              <option value="Nayagaon">Nayagaon</option>
              <option value="Shivkuti">Shivkuti</option>
              <option value="Swarajnagar">Swarajnagar</option>
              {/* Add more location options as needed */}
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
              <th>Pickup Name</th> {/* Add Pickup Name column */}
              <th>Pickup Phone</th> {/* Add Pickup Phone column */}
              <th>Drop Name</th> {/* Add Drop Name column */}
              <th>Drop Phone</th> {/* Add Drop Phone column */}
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.map((entry, index) => (
              <React.Fragment key={index}>
                {entry.schedule.map((scheduleItem, itemIndex) => {
                  const pickupInfo = getUserInfo(scheduleItem.pickup);
                  const dropInfo = getUserInfo(scheduleItem.drop);
                  return (
                    <tr key={`${index}-${itemIndex}`}>
                      {itemIndex === 0 ? (
                        <td rowSpan={entry.schedule.length}>
                          {entry.location}
                        </td>
                      ) : null}
                      <td>{scheduleItem.day}</td>

                      <td>{pickupInfo.name}</td>
                      <td>{pickupInfo.phone}</td>
                      <td>{dropInfo.name}</td>
                      <td>{dropInfo.phone}</td>
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

export default LinescheduleTable;
