//const Joi = require('joi');
//const util = require('util');
//const db = require('../utils/database');
const mongoose = require('mongoose');

// let Movies = db.getCollection('movies');

// // define the schema for a movie object
// Movies.schema = Joi.object().keys({
//   title: Joi.string().required(),
//   poster: Joi.string().required(),
//   rating: Joi.string().required(),
//   runtime: Joi.string().required(),
//   showtimes: Joi.array(),
// });

// // validates a Movie object with a promise
// Movies.validate = util.promisify(Movies.schema.validate);

// module.exports = Movies;

const MovieSchema = mongoose.Schema({
  title: String,
  poster: String,
  rating: String,
  runtime: String,
  showtimes: Object,
  start_date: Date,
  end_date: Date,
}, {
  collection: 'movies',
});

MovieSchema.statics = {
  get(title) {
    if (title) {
      return this.find({ title })
        .lean()
        .exec();
    }

    return this.find()
      .lean()
      .exec();
  },
};

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;