const jwt = require('jsonwebtoken')
const {secret} = require('../auth/config')
const cookie = require('cookie')

module.exports = function (req, res, next) {
    try {
        const token = cookie.parse(req.headers.cookie)['auth']
        if (!token) {
            next()
            return
        }
        const decode_data = jwt.verify(token, secret)
        req.user = decode_data
        next()
    }
    catch(e) {
        next()
    }
}