const db = require('../db')
const rental_points = [
    {
        address: 'Большая Покровская улица, 71'
    },
    {
        address: 'Проспект Ленина, 15'
    },
    {
        address: 'Улица Родионова, 107'
    }
]
async function insert_rental_points() {
    for (i in rental_points) {
        let point = rental_points[i]
        let new_point = await db.query('INSERT INTO rental_point (address) VALUES ($1) RETURNING *',
            [point.address])
        console.log(new_point.rows[0])
    }
}

insert_rental_points()