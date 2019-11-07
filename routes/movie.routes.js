const Movie = require('../models/movies.model');
const router = require('express').Router();
const multer = require('multer');

const upload = multer({ dest: '../uploads' });

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
    upload.single('poster'),
    async (req, res, next) => {
      console.log(req.file, req.body );

      //TODO save the file

      try {
        const movie = new Movie(req.body);
        await movie.save();
        const result = await Movie.find({ title: req.body.title }).lean();
        return res.json(result);
      } catch (err) {
        console.log(err);
        next(err)
      }
    }
  );

module.exports = router;