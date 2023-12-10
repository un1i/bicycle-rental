class SQLQuery{
    get_user() {
        return 'SELECT * FROM rental_user WHERE phone_number = $1'
    }

    create_user() {
        return 'INSERT INTO rental_user (name, phone_number, hash_pass) VALUES ($1, $2, $3)'
    }
}

module.exports = new SQLQuery()