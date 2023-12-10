const db = require('../database/db')
const sql = require('./sql_queries')

function get_str_time(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.toLocaleTimeString()}`
}

function div(x, y) {
    return (x - x % y) / y
}
class TripController {
    async book_trip(req, res) {
        const {name, phone_number, date, rental_point_id, user_id, bicycle_id} = req.body
        const trip = await db.query(sql.insert_booking(), [name, phone_number, date, rental_point_id, user_id, bicycle_id, 1])
        res.json(trip.rows[0])
    }

    async get_booking(req, res) {
        const id = req.params.id
        const booking = await db.query(sql.get_booking(), [id])
        res.json(booking.rows[0])
    }

    async get_active_trip(req, res) {
        const id = req.params.id
        const trip = await db.query(sql.get_active_trip(), [id])
        res.json(trip.rows[0])
    }

    async get_completed_trip(req, res) {
        const id = req.params.id
        const trip = await db.query(sql.get_completed_trip(), [id])
        res.json(trip.rows[0])
    }

    async start_trip(req, res) {
        const id = req.params.id
        const cur_date = new Date()

        const booking = await db.query(sql.get_booking(), [id])
        if (new Date(booking.rows[0].date) > cur_date) {
            res.status(400).json({message: 'Нельзя начать поездку раньше забронированного времени!'})
            return
        }

        const start_date = get_str_time(cur_date)
        await db.query(sql.close_booking(), [id])
        const trip = await db.query(sql.start_trip(), [id, start_date])
        res.json(trip.rows[0])
    }

    async finish_trip(req, res) {
        const id = req.params.id
        const finish_point = req.body.rental_point
        const cur_date = new Date()
        const finish_date = get_str_time(cur_date)
        let db_res = await db.query(sql.get_data_for_finish(), [id])
        db_res = db_res.rows[0]

        const start_date = new Date(db_res.date_start)
        const bicycle_cost = db_res.cost
        const dif = cur_date - start_date
        const ms_in_hour = 1000 * 60 * 60
        const hours = div(dif, ms_in_hour) + (dif % ms_in_hour !== 0)
        const trip_cost = bicycle_cost * hours

        const trip = await db.query(sql.finish_trip(), [id, finish_date, trip_cost, finish_point])
        res.json(trip.rows[0])
    }
}

module.exports = new TripController()