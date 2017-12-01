/**This is an example app to explore the Cores of MongoDB and Mongoose */
const express = require('express');
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');

// Setup the server
const app = express();


// Initialize Middleware
app.use(bodyParser.json());

// Turn on the routes
require('./routes/userRoutes')(app);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "127.0.0.1")