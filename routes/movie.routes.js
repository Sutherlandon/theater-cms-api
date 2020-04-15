const router = require('express').Router();
const isEmpty = require('lodash.isempty');
const Movie = require('../models/movie.model');

router.route('/')
  .get(async (req, res, next) => {
    const query = {};
    if (req.body && req.body.name) {
      query.name = req.body.name;
    }
    
    try {
      const result = await Movie.find(query).lean();
      
      // send 204 'no content' for empty result, or the results
      if (isEmpty(result)) {
        res.status(204).send();
      } else {
        res.json(result);
      }

    } catch (err) {
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      const movie = new Movie(req.body);
      const result = await movie.save();
      return res.json(result);
    } catch (err) {
      return next(err)
    }
  })
  .put(async (req, res, next) => {
    try {
      const movie = await Movie.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
      return res.json(movie);
    } catch (err) {
      console.log(err);
      return next(err)
    }
  });

module.exports = router;