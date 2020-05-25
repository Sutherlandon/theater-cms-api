/* global describe, it, expect */
const fs = require('fs');
const supertest = require('supertest');
const app = require('../config/express');
const Movie = require('../models/movie.model');
const request = supertest(app);

describe('Movie Tests', () => {
  let testData = {
    end_date: '2020-02-08T07:00:00.000Z',
    rating: 'G',
    runtime: '2h 35m',
    showtimes: [[
      '2020-02-06T07:00:00.000Z',
      '3:00 2D, 4:00 2D, 7:30 3D, 9:00 3D'
    ], [
      '2020-02-07T07:00:00.000Z',
      '3:00 2D, 4:00 2D, 7:30 3D, 9:00 3D'
    ], [
      '2020-02-08T07:00:00.000Z',
      '4:00 2D, 7:30 3D, 9:00 3D, 11:00 3D'
    ]],
    start_date: '2020-02-06T07:00:00.000Z',
    title: 'Test Movie',
  }

  beforeAll( async () => {
    try {
      // clear out the user table to start fresh
      await Movie.deleteMany({});
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(() => {
    // clean up the test poster file
    fs.unlinkSync('./public/test_poster.jpg', (err) => {
      console.error(err);
    });
  });

  describe('GET /api/movies', () => {
    it('Should return 204 `No Content` if no movies are in the database', async () => {
      const res = await request.get('/api/movies')
      expect(res.status).toBe(204);
    });
  });

  describe('POST /api/movies', () => {
    it('Should create a new movie and return the new record', async () => {
      const res = await request
        .post('/api/movies')
        .attach('poster', './tests/test_data/test_poster.jpg')
        .field('metaData', JSON.stringify(testData));

      const received = res.body;
      const expected = {
        ...testData,
        poster: 'test_poster.jpg',
        _id: expect.any(String),
      };

      expect(received).toMatchObject(expected);
      fs.exists('./public/test_poster.jpg', (exists) => {
        expect(exists).toBeTruthy();
      })

      // set up for the next test
      testData = received
    });

    it('Should return a list of movies now that there is one', async () => {
      const { body: received } = await request.get('/api/movies')
      expect(received).toEqual([testData]);
    });

    it('Should return the single movie specified', async () => {
      const { body: received } = await request.get('/api/movies').send({ title: testData.title})
      expect(received).toMatchObject(testData);
    });
  });

  describe('PUT /api/movies', () => {
    it('Should update a movie with new information', async () => {
      const formData = {
        ...testData,
        title: 'Test Movie 2',
        rating: 'R',
      };

      const { body: received } = await request
        .put('/api/movies')
        .attach('poster', './tests/test_data/test_poster_2.jpg')
        .field('metaData', JSON.stringify(formData));

      const expected = {
        ...formData,
        poster: 'test_poster_2.jpg',
      }

      expect(received).toMatchObject(expected)

      // set up for the next test
      testData = received
    });
  });

  describe('DELETE /api/movies', () => {
    it('Should delete the specified movie and poster file', async () => {
      const res = await request
        .delete('/api/movies')
        .send({ title: testData.title })

      expect(res.status).toEqual(200);

      // make sure it's gone from the DB
      const movie = await Movie.get(testData.title);
      expect(movie).toBeNull();

      // make sure it took the file with it.
      fs.exists('./public/test_poster_2.jpg', (exists) => {
        expect(exists).toBeFalsy();
      })
    })

    it('Should recieve a 400 for movie not found', async () => {
      const title = 'Bogus, The Movie';
      const res = await request
        .delete('/api/movies')
        .send({ title });

      expect(res.status).toEqual(400);
      expect(res.text).toEqual(`Movie '${title}' not found`);
    });
  });
});