/**
 * Author: Landon Sutherland
 * This is the backend API for controlling movie data
 */

// import required packages
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// connect to the database
require('./database.js');

// build an api with express
const app = express();

// overhead middleware
app.use(helmet());
app.use(cors({ /* TODO: Lock down by origin */ }));
app.use(express.json());

// register routes
app.use('/api/public', express.static('public'));
app.use('/api', require('../routes/index.routes'));

app.use((req, res, next) => {
  console.log(req.baseUrl, res.status);
});

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

module.exports = app;
