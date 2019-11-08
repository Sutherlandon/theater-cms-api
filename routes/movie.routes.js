const router = require('express').Router();
const Movie = require('../models/movies.model');

router.route('/api/movies')
  .get(async (req, res, next) => {
    const query = {};
    if (req.body && req.body.name) {
      query.name = req.body.name;
    }
    
    try {
      const result = await Movie.find(query).lean();
      return res.json(result);
    } catch (err) {
      console.log(err);
      next(err)
    }
  })
  .post(
    async (req, res, next) => {
      try {
        const movie = new Movie(req.body);
        await movie.save();
        const result = await Movie.find({ title: req.body.title }).lean();
        return res.json(result);
      } catch (err) {
        console.log(err);
        return next(err)
      }
    }
  )
  .put(
    async (req, res, next) => {
      try {
        const movie = await Movie.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        return res.json(movie);
      } catch (err) {
        console.log(err);
        return next(err)
      }
    }

  );

module.exports = router;