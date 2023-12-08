const express = require('express');
const router = express.Router();
const user_ctr = require('./controller')
const auth_middleware = require('../middleware/auth_middleware')

router.get('/by-auth', auth_middleware, user_ctr.get_user_by_auth)

module.exports = router;