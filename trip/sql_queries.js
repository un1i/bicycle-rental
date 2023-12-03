class SQLQuery{
    insert_booking() {
        return 'INSERT INTO booking (name, phone_number, date, rental_point_id, bicycle_id, booking_status_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
    }

    close_booking() {
        return 'UPDATE booking SET booking_status_id = 0 WHERE id = $1'
    }

    start_trip() {
        return 'INSERT INTO trip (id, date_start, status_id) VALUES ($1, $2, 1) RETURNING *'
    }

    get_data_for_finish() {
        return 'SELECT trip.date_start, bicycle.cost FROM trip INNER JOIN booking ON trip.id = booking.id INNER JOIN bicycle ON booking.bicycle_id = bicycle.id WHERE trip.id = $1'
    }

    finish_trip() {
        return 'UPDATE trip SET date_finish = $2, cost = $3, rental_point_finish_id = $4, status_id = 0 WHERE id = $1 RETURNING *'
    }
}

module.exports = new SQLQuery()