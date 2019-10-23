/**
 * Author: Landon Sutherland
 * This is the backend API for controlling movie data
 */

// import required packages
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//const imdb = require('imdb-api');
const config = require('./config/config.js');

// connect to the database
require('./config/database.js');

// build an api with express
const app = express();

// overhead middleware
app.use(helmet());
app.use(cors({ /* TODO: Lock down by origin */ }));
app.use(express.json());

// register routes
app.use(require('./routes/user.routes'));
app.use(require('./routes/movie.routes'));

// fires up the server to listen on port 3001
app.listen(config.api_port, function () {
  console.log(`Theater-CMS running (port: ${config.api_port})`);
});


/** Beneath here is irrelevent now I think */

/*
// gets movie meta-data based on title from the imbd-api
app.get('/movie/:title', function (req, res) {
  imdb.getReq({
    name: req.params.title,
    opts: {
      apiKey: '3b26d738',
    }
  }, (err, data) => {
    res.send(data);
  });
});

// gets movie meta-data based on title from the imbd-api
app.get('/movie/:title/:year', function (req, res) {
  imdb.getReq({
    name: req.params.title,
    year: req.params.year,
    opts: {
      apiKey: '3b26d738',
    }
  }, (err, data) => {
    res.send(data);
  });
});

*/
