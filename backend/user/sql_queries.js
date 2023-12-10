class SQLQuery{
    get_user() {
        return 'SELECT id, name, phone_number, role_id FROM rental_user WHERE id = $1'
    }
}

module.exports = new SQLQuery()