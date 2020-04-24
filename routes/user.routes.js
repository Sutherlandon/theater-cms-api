const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const users = (await User.find())
      .map(({ _id, username, roles }) => ({ _id, username, roles }));

    return res.json(users);
  })
  .post(async (req, res, next) => {
    const { username, password } = req.body;

    // hash the password, and insert, and return a json token
    try {
      const { hash, salt } = await User.generateHash(password);
      await User.create({
        username,
        password: hash,
        roles: ['user'],
        salt,
      });

      return res.status(200).send();

     } catch (err) {
       return next(err);
     };
  });

module.exports = router;