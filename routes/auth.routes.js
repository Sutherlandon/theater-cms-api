const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const User = require('../models/user.model');

const router = express.Router();

router.route('/login')
  .post(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username })
    if (user) {
      const hash = await User.hashPassword(password, user.salt);

      if (hash === user.password) {
        // generate JWT
        const authToken = jwt.sign({ username }, config.secret);
        res.setHeader('AuthToken', authToken)
        res.status(200).send();
      }
    }

    res.status(401).send();
  });

module.exports = router;
