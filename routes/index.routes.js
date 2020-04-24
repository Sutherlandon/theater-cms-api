const express = require('express');

const authRoutes = require('./auth.routes');
const movieRoutes = require('./movie.routes');
const uploadRoutes = require('./upload.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

router.use('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
router.use('/upload', uploadRoutes);
router.use('/users', userRoutes);

module.exports = router;