const express = require('express');
const userRoutes = require('./user.routes');
const movieRoutes = require('./movie.routes');
const uploadRoutes = require('./upload.routes');

const router = express.Router();

router.use('/health-check', (req, res) => res.send('OK'));

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;