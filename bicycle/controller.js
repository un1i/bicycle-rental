const db = require('../database/db')
const sql = require('./sql_queries')

class BicycleController {
    async get_bicycles(req, res) {
        const bicycles = await db.query(sql.get_bicycles())
        res.json(bicycles.rows)
    }

    async get_bicycle(req, res) {
        const id = req.params.id
        const bicycle = await db.query(sql.get_bicycle(), [id])
        if (bicycle.rows.length === 0) {
            res.status(404).send('Страница не найдена')
        }
        else {
            res.json(bicycle.rows[0])
        }
    }
}

module.exports = new BicycleController()