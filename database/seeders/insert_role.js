const db = require('../db')
const roles = [
    {
        id: 0,
        name: "user"
    },
    {
        id: 1,
        name: "admin"
    }
]
async function insert_roles() {
    for (i in roles) {
        let role = roles[i]
        let new_role = await db.query('INSERT INTO role (id, name) VALUES ($1, $2) RETURNING *',
            [role.id, role.name])
        console.log(new_role.rows[0])
    }
}

insert_roles()