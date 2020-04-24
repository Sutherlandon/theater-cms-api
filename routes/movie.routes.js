const router = require('express').Router();
const isEmpty = require('lodash.isempty');
const Movie = require('../models/movie.model');

router.route('/')
  .get(async (req, res, next) => {
    const query = {};
    if (req.body && req.body.title) {
      query.title = req.body.title;
    }
    
    try {
      const result = await Movie.find(query).lean();
      
      // send 204 'no content' for empty result, or the results
      if (isEmpty(result)) {
        res.status(204).send();
      // if we're expecting only one, give only one result
      } else if (query.title) {
        res.json(result[0]);
      // send an array of results
      } else {
        res.json(result);
      }

    } catch (err) {
      return next(err)
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
      return next(err)
    }
  });

module.exports = router;