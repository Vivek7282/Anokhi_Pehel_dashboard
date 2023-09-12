const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const mongoDB = require("./db");
mongoDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

app.use("/images", express.static("images"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE" // Include DELETE here
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use("/api", require("./routes/Auth"));
app.use("/api1", require("./routes/GetStudent"));
app.use("/api2", require("./routes/GetUserRole"));
app.use("/api3", require("./routes/Addschedule"));
app.use("/api4", require("./routes/SubmitAttendance"));
app.use("/api5", require("./routes/GetAttendance"));
app.use("/api6", require("./routes/AddScore"));
app.use("/api7", require("./routes/AddLineSchedule"));
app.use("/api8", require("./routes/GetMentorByEmail"));
app.use("/api9", require("./routes/ChangePassword"));
app.use("/api10", require("./routes/RemoveMentor"));
app.use("/api13", require("./routes/GetMentorById"));
app.use("/api14", require("./routes/AddTopic"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
