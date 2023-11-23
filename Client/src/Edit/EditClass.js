import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Image from "../image/340434.png";
import { BASE_URL } from "../Service/helper";
const ScheduleTable = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [filterDay, setFilterDay] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [mentorsInfo, setMentorsInfo] = useState({});
  const [editingSchedule, setEditingSchedule] = useState(null); // To track the schedule being edited
  const [editedScheduleData, setEditedScheduleData] = useState({}); // To store edited schedule data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/getschedule`)
      .then((response) => {
        setScheduleData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/mentors`)
      .then((response) => {
        const mentorData = {};
        response.data.forEach((mentor) => {
          mentorData[mentor._id] = {
            name: mentor.name,
            phone: mentor.phone,
          };
        });
        setMentorsInfo(mentorData);
      })
      .catch((error) => {
        console.error("Error fetching mentors: ", error);
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
    if (filterClass && entry.className !== filterClass) {
      return false; // Skip entries that don't have the specified class
    }
    return true; // Include all other entries
  });
  const getMentorInfo = (user_id) => {
    const mentor = mentorsInfo[user_id];
    return mentor
      ? { name: mentor.name, phone: mentor.phone }
      : { name: "Unknown", phone: "Unknown" };
  };

  const handleEditSchedule = (entry) => {
    setEditingSchedule(entry);
    // You can initialize the edited data with the existing data
    setEditedScheduleData({
      className: entry.className,
      day: entry.schedule[0].day,
      subject: entry.schedule[0].subject,
      mentor: entry.schedule[0].mentor,
    });
    // Show the edit modal/form (create this modal/form)
  };

  const handleUpdateSchedule = () => {
    if (!editingSchedule) return; // Ensure there's a schedule being edited

    // Send a PUT request to update the schedule with edited data
    axios
      .put(
        `${BASE_URL}/api3/updateschedule/${editingSchedule._id}`,
        editedScheduleData
      )
      .then((response) => {
        // Update the state with the edited data
        const updatedData = [...scheduleData];
        const updatedIndex = updatedData.findIndex(
          (entry) => entry._id === editingSchedule._id
        );
        if (updatedIndex !== -1) {
          updatedData[updatedIndex] = {
            ...editingSchedule,
            schedule: [
              {
                day: editedScheduleData.day,
                subject: editedScheduleData.subject,
                mentor: editedScheduleData.mentor,
              },
            ],
          };
          setScheduleData(updatedData);
          setEditingSchedule(null); // Clear the editing state
          setEditedScheduleData({}); // Clear the edited data
        }
        // Close the edit modal/form
        // You can also show a success message to the user
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occur during the update
        // You can show an error message to the user
      });
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
      <h2 style={{ color: "white", fontWeight: "bold" }}>Schedule Table</h2>
      <div className="container">{/* Existing filter code... */}</div>
      <div className="table-responsive" style={{ width: "80%" }}>
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Day</th>
              <th>Subject</th>
              <th>Mentor</th>
              <th>Phone</th>
              <th>Action</th> {/* Add an action column */}
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
                      <td>
                        <button
                          onClick={() => handleEditSchedule(entry)}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        {/* You can also add a "Delete" button here */}
                      </td>
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
