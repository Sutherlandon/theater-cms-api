//const Movies = require('../models/movies.model');
const Movie = require('../models/movies.model');
//const db = require('../utils/database');

const movieRoutes = [{
  method: 'GET',
  path: '/api/movies',
  config: {
    auth: false,
  },
  handler: async (request, h) => {
    //console.log(request);
    const name = request.body ? request.body.name : false;
    const result = await Movie.find().lean();
    return h.response(result);
  }
}, {
  method: 'POST',
  path: '/api/movies',
  config: {
    auth: false,
  },
  handler: async (request, h) => {
    //console.log(request);
    const result = await Movie.add(request.body);
    return h.response(result);
  }
}];

module.exports = movieRoutes;