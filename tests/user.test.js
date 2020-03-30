/* global describe, it, expect */
const supertest = require('supertest');
const app = require('../config/express');
const User = require('../models/user.model');

// init the app
const request = supertest(app);

describe('User Tests', () => {

  beforeAll( async () => {
    try {
      // clear out the user table to start fresh
      await User.deleteMany({});
    } catch (err) {
      console.log(err);
    }
  })

  describe('GET /api/health-check', () => {
    it('Should return 200 OK', async () => {
      const res = await request.get('/api/health-check')

      expect(res.status).toEqual(200);
    });
  })

  describe('POST /api/users', () => {
    it('Should create a new user and return 200 OK', async () => {
      let newUser = {
        username: 'Landon',
        password: 'TooC00l4Skool',
      };
      
      const res = await request.post('/api/users')
        .send(newUser);

      expect(res.status).toEqual(200);
    });
  })
})