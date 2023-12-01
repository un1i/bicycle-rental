const Pool = require('pg').Pool
const pool = new Pool({
    user: 'root',
    password: 'XWAzIFKp4Ha5cSDU',
    host: 'localhost',
    port: 5432,
    database: 'bicycle_rental'
})

module.exports = pool
