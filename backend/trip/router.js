const express = require('express');
const router = express.Router();
const trip_ctr = require('./controller')

router.post('/book-trip', trip_ctr.book_trip)
router.get('/start-trip/:id', trip_ctr.start_trip)
router.post('/finish-trip/:id', trip_ctr.finish_trip)
router.get('/book/:id', trip_ctr.get_booking)
router.get('/active/:id', trip_ctr.get_active_trip)
router.get('/completed/:id', trip_ctr.get_completed_trip)

module.exports = router;