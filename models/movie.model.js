const mongoose = require('mongoose');

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