const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("school", SchoolSchema);
