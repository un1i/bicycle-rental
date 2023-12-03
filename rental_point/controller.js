const db = require('../database/db')
const sql = require('./sql_queries')
class PointController {
    async get_rental_points(req, res) {
        const points = await db.query(sql.get_points())
        res.json(points.rows)
    }
}

module.exports = new PointController()