const db = require('../db')
const trip_status = [
    {
        id: 0,
        name: "close"
    },
    {
        id: 1,
        name: "open"
    },
]
async function insert_status() {
    for (let i in trip_status) {
        let status = trip_status[i]
        let new_status = await db.query('INSERT INTO trip_status (id, name) VALUES ($1, $2) RETURNING *',
            [status.id, status.name])
        console.log(new_status.rows[0])
    }
}

insert_status()