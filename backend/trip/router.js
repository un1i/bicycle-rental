const express = require('express');
const router = express.Router();
const trip_ctr = require('./controller')
const {check} = require('express-validator');

router.post('/book-trip', [
    check('phone_number', 'Недействительный номер телефона\nНомер должен состоять только из 11 цифр и начинаться с +7, 7 или 8').isMobilePhone('ru-RU')
    ],
    trip_ctr.book_trip)
router.get('/start-trip/:id', trip_ctr.start_trip)
router.post('/finish-trip/:id', trip_ctr.finish_trip)
router.get('/book/:id', trip_ctr.get_booking)
router.get('/active/:id', trip_ctr.get_active_trip)
router.get('/completed/:id', trip_ctr.get_completed_trip)

module.exports = router;