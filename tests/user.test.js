/* global describe, it, expect */
const supertest = require('supertest');
const app = require('../config/express');
const User = require('../models/user.model');

// init the app
const request = supertest(app);
let newUser = {
  username: 'Test User',
  password: 'TooC00l4Skool',
};

describe('User Tests', () => {
  beforeAll( async () => {
    try {
      // clear out the user table to start fresh
      await User.deleteMany({});
    } catch (err) {
      console.log(err);
    }
  });

  describe('GET /api/health-check', () => {
    it('Should return 200 OK', async () => {
      const { status } = await request.get('/api/health-check')
      expect(status).toEqual(200);
    });
  });

  describe('POST /api/users', () => {
    it('Should create a new user and return 200 OK', async () => {
      const { status } = await request.post('/api/users').send(newUser);
      expect(status).toEqual(200);
    });

    it('Should get a list of users', async () => {
      const { body: received } = await request.get('/api/users')
      const expected = expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          username: expect.any(String),
          roles: expect.arrayContaining([expect.any(String)]),
        })
      ])

      expect(received).toEqual(expected);
    });
  });
});

describe('Auth Tests', () => {
  describe('POST /api/auth/login', () => {
    it('Should log in a user and send back a send back a JWT', async () => {
      const res = await request.post('/api/auth/login').send(newUser);
      expect(res.status).toEqual(200);
      expect(res.header.authtoken).not.toBeUndefined();
    });

    it('Should send a 401 when the credentials do not match', async () => {
      const res = await request.post('/api/auth/login').send({ username: 'landoman', password: 'not right' });
      expect(res.status).toEqual(401);
    });
  });
});