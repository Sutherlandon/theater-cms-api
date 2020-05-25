const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const isEmpty = require('lodash.isempty');
const Movie = require('../models/movie.model');

// Build the file uploader
const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),
});

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

  .post(
    // handle the file upload, name is req.file
    upload.single('poster'),
    // create and save the movie document
    async (req, res, next) => {
      const metaData = JSON.parse(req.body.metaData);
      metaData.poster = req.file.originalname;

      try {
        const movie = new Movie(metaData);
        const result = await movie.save();
        return res.json(result);
      } catch (err) {
        return next(err)
      }
    }
  )

  .put(
    // handle the file upload, name is req.file
    upload.single('poster'),
    async (req, res, next) => {
      const data = JSON.parse(req.body.metaData);

      // update the new poster file name if one was sent.
      if (req.file) {
        data.poster = req.file.originalname;
      }

      try {
        const movie = await Movie.findOneAndUpdate({ _id: data._id }, data, { new: true });
        return res.json(movie);
      } catch (err) {
        return next(err)
      }
    }
  )

  .delete(async (req, res, next) => {
    const { title } = req.body
    try {
      // get the current movie
      const movie = await Movie.get(title);

      // if it exists delete it
      if (movie) {
        const status = await Movie.deleteOne({ title })

        // if delettion went through remove the poster file
        if (status.ok) {
          fs.unlinkSync('./public/' + movie.poster, (err) => {
            return next(err);
          });

          // all good
          res.send();

        } else { 
          res.status(500).send(`Deleting ${title} failed`);
        }

      } else {
        res.status(400).send(`Movie '${title}' not found`);
      }


    } catch (err) {
      return next(err);
    }

  })

module.exports = router;