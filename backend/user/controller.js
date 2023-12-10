const db = require('../database/db')
const sql = require('./sql_queries')

class UserController {
    async get_user_by_auth(req, res) {
        if (req.user) {
            const user = await db.query(sql.get_user(), [req.user.id])
            res.json(user.rows[0])
        }
        else {
            res.json({})
        }
    }
}

module.exports = new UserController()