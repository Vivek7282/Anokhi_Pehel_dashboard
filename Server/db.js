const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://kumarvivek7282827749:vivekkumar@cluster0.qjxcqgc.mongodb.net/AnokhiPehel?retryWrites=true&w=majority";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB...");
    // const sampleCollection = await mongoose.connection.db.collection("Sample");
    // const arr = await sampleCollection
    //   .find({})
    //   .toArray(function (err, data) {});
    // console.log(arr);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;
