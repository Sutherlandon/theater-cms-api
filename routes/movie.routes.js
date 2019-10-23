const Movie = require('../models/movies.model');
const router = require('express').Router();

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
  .post(async (req, res, next) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      const result = await Movie.find({ title: req.body.title }).lean();
      return res.json(result);
    } catch (err) {
      console.log(err);
      next(err)
    }
  });

module.exports = router;