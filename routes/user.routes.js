const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const router = express.Router();

/**
 * Generate a hashed password
 * @param {String} password
 * @param {Function} callback
 */
const hashPassword = (password) => new Promise((resolve) => {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return resolve({ hash, salt });
    });
  });
});

router.route('/')
  .get(async (req, res) => {
    const users = User.find();
    console.log(users);
    return res.json(users);
  })
  .post(async (req, res, next) => {
    const { username, password } = req.body;

    // hash the password, and insert, and return a json token
    try {
      const { hash, salt } = await hashPassword(password);
      const user = await User.create({
        username,
        password: hash,
        roles: ['user'],
        salt,
      });

      return res.send('OK');

     } catch (err) {
       console.log(err);
       return next(err);
     };
  });

module.exports = router;