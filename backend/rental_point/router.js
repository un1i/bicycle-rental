const express = require('express');
const router = express.Router();
const point_ctr = require('./controller')

router.get('/', point_ctr.get_rental_points)

module.exports = router;