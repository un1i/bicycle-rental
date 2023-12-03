const db = require('../db')
const bicycles = [
    {
        name: 'Scott',
        description: 'Бренд назван по фамилии его создателя и появился в середине прошлого века',
        cost: 250,
    },
    {
        name: 'Trek',
        description: 'велосипеды разных типов от этой популярной торговой марки производятся уже более 40 лет.',
        cost: 340
    },
    {
        name: 'Merida',
        description: 'Тайваньская компания Merida Industry. Ltd – это один из крупнейших мировых производителей велосипедов.',
        cost: 500
    }
]
async function insert_bicycles() {
    for (i in bicycles) {
        let bicycle = bicycles[i]
        let new_bike = await db.query('INSERT INTO bicycle (name, description, cost) VALUES ($1, $2, $3) RETURNING *',
            [bicycle.name, bicycle.description, bicycle.cost])
        console.log(new_bike.rows[0])
    }
}

insert_bicycles()