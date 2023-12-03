const express = require('express');
const router = express.Router();
const bicycle_ctr = require('./controller')

router.get('/', bicycle_ctr.get_bicycles)
router.get('/:id', bicycle_ctr.get_bicycle)

module.exports = router;