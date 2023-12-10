const db = require('./db')
const fs = require('fs')
const table_flies = [
    'bicycle.sql',
    'rental_point.sql',
    'role.sql',
    'booking_status.sql',
    'trip_status.sql',
    'rental_user.sql',
    'booking.sql',
    'trip.sql'
];
async function create_table() {
    let sql = ''
    for (let i in table_flies) {
        sql += fs.readFileSync('tables/' + table_flies[i]).toString()
    }
    await db.query(sql);
}

create_table()
