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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
