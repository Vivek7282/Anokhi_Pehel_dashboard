import React, { useState } from "react";

const EditScheduleModal = ({ isOpen, onClose, scheduleData, onUpdate }) => {
  const [editedData, setEditedData] = useState({});

  const handleClose = () => {
    setEditedData({});
    onClose();
  };

  const handleSave = () => {
    onUpdate(editedData);
    handleClose();
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Schedule</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        <section className="modal-card-body">
          {/* Edit form fields */}
          <div className="field">
            <label className="label">Day</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Edit Day"
                value={editedData.day || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, day: e.target.value })
                }
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Edit Subject"
                value={editedData.subject || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, subject: e.target.value })
                }
              />
            </div>
          </div>
          {/* Add more fields for editing */}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSave}>
            Save changes
          </button>
          <button className="button" onClick={handleClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditScheduleModal;
