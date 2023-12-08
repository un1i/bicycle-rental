class SQLQuery{
    insert_booking() {
        return 'INSERT INTO booking (name, phone_number, date, rental_point_id, user_id, bicycle_id, booking_status_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    }

    get_booking() {
        return 'SELECT booking.bicycle_id as bicycle_id, booking.date AS date, rental_point.address AS rental_point_addr, bicycle.name AS bicycle_name, booking.booking_status_id AS booking_status_id  FROM booking INNER JOIN bicycle ON booking.bicycle_id = bicycle.id INNER JOIN rental_point ON booking.rental_point_id = rental_point.id  WHERE booking.id = $1'
    }

    get_active_trip() {
        return 'SELECT * FROM trip WHERE id = $1'
    }
    get_completed_trip() {
        return 'SELECT trip.id AS id, trip.status_id AS status_id, trip.date_start AS date_start, trip.date_finish AS date_finish, trip.cost AS cost, rental_point.address AS rental_point_finish_addr, start_rental_point.address AS rental_point_start_addr FROM trip INNER JOIN rental_point ON trip.rental_point_finish_id = rental_point.id INNER JOIN booking ON booking.id = trip.id INNER JOIN rental_point AS start_rental_point ON booking.rental_point_id = start_rental_point.id  WHERE trip.id = $1'
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