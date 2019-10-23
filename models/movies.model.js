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
});

MovieSchema.statics = {
  get(name) {
    if (name) {
      return this.find({ name })
        .lean()
        .exec();
    }

    return this.find()
      .lean()
      .exec();
  },

  add(movie) {
    return this.save(movie, { new: true })
      .exec()
      .then(() => this.get());
  }
};

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;