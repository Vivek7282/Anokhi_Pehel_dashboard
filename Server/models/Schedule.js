const mongoose = require("mongoose");

const { Schema } = mongoose;

const ScheduleSchema = new Schema({
  className: {
    type: String,
    required: true,
  },
  schedule: [
    {
      day: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      mentor: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("schedule", ScheduleSchema);
