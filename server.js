/* Empyt JS object to act as endpoint for all routes */
let projectData = { data: [] };

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");
/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Todo - Cors for X origin allowance
const cors = require("cors");
app.use(cors());

// Initialize main project folder
app.use(express.static("weather_journal"));

const port = 8000;

// Spin up server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log("Server running");
  console.log(`running on localhost: ${port}`);
}

// Routers
app.get("/", sendData);

function sendData(req, res) {
  res.send(projectData);
}

app.post("/db", (req, res) => {
  const { temp, currentTime, userResponse } = req.body.main;
  const returnedTemp = `${temp} \u00B0 F`;
  const returnedCurrentDate = currentTime;
  const returnedUserResponse = userResponse;

  projectData.temperature = returnedTemp;
  projectData.currentDate = returnedCurrentDate;
  projectData.userResponse = returnedUserResponse;

  res.send(projectData);
});

app.get("/all", (req, res) => {
  res.send(projectData);
});
