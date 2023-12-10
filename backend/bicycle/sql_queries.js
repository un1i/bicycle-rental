class SQLQuery{
    get_bicycles() {
        return 'SELECT * FROM bicycle'
    }

    get_bicycle() {
        return 'SELECT * FROM bicycle WHERE id = $1'
    }
}

module.exports = new SQLQuery()