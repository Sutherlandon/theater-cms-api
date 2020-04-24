/* global describe, it, expect */
const supertest = require('supertest');
const app = require('../config/express');
const Movie = require('../models/movie.model');
const request = supertest(app);

describe('Movie Tests', () => {
  let testData = {
    end_date: '2020-02-08T07:00:00.000Z',
    poster: 'testMovie.jpg',
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

  describe('GET /api/movies', () => {
    it('Should return 204 `No Content` if no movies are in the database', async () => {
      const res = await request.get('/api/movies')
      expect(res.status).toBe(204);
    });
  });

  describe('POST /api/movies', () => {
    it('Should create a new movie and return the new record', async () => {
      const { body: received } = await request
        .post('/api/movies')
        .send(testData);

      const expected = {
        ...testData,
        _id: expect.any(String),
      };

      expect(received).toMatchObject(expected);

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
        .send(formData);

      expect(received).toMatchObject(formData)
    });
  });
});