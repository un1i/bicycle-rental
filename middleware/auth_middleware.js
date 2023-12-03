const jwt = require('jsonwebtoken')
const {secret} = require('../auth/config')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            next()
        }
        const decode_data = jwt.verify(token, secret)
        req.user = decode_data
        next()
    }
    catch(e) {
        next()
    }
}