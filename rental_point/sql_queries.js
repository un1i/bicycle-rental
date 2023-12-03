class SQLQuery{
    get_points() {
        return 'SELECT * FROM rental_point'
    }
}

module.exports = new SQLQuery()