/* Empyt JS object to act as endpoint for all routes */
// projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instancec of app
const app = express();

// Dependencies
const bodyParser = require('body-parser')
/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Todo- Cors for X origin allowance
const cors = require('cors');
app.use(cors());

// Initialize main project folder
app.use(express.static('weather_journal'));

const port = 8000;

// Spin up server
const server = app.listen(port, listening);
//const server - app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

// Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
    
}