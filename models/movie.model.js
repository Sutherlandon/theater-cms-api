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
  async get(title) {
    if (title) {
      const movie = await this.find({ title }).lean().exec();
      if (movie[0]) {
        return movie[0];
      } else {
        return null;
      }
    }

    return this.find()
      .lean()
      .exec();
  },
};

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;