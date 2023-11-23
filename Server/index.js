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
app.use(cors());

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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://anokhi-pehel.netlify.app");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE" // Include DELETE here
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.json());
app.use("/api", require("./routes/Auth"));
app.use("/api", require("./routes/GetStudent"));
app.use("/api", require("./routes/GetUserRole"));
app.use("/api", require("./routes/Addschedule"));
app.use("/api", require("./routes/SubmitAttendance"));
app.use("/api", require("./routes/GetAttendance"));
app.use("/api", require("./routes/AddScore"));
app.use("/api", require("./routes/AddLineSchedule"));
app.use("/api", require("./routes/GetMentorByEmail"));
app.use("/api", require("./routes/ChangePassword"));
app.use("/api", require("./routes/RemoveMentor"));
app.use("/api", require("./routes/GetMentorById"));
app.use("/api", require("./routes/AddTopic"));
app.use("/api", require("./routes/AddSchool"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
