/**
 * Author: Landon Sutherland
 * This is the backend API for controlling movie data
 */

const config = require('./config/config.js');
const TheaterCMS = require('./config/express.js');

async function init() {
  try {
    const app = await TheaterCMS();

    // fires up the server to listen on port 3001
    if (process.env.NODE_ENV !== 'test') {
      app.listen(config.api_port, function () {
        console.log(`Theater-CMS running (port: ${config.api_port})`);
      });
    }
  } catch(err) {
    console.log(err);
  }
}

init();

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
