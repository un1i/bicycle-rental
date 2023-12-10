const db = require('../db')
const bicycles = [
    {
        name: 'Trek',
        description: 'Идеальный шоссейный велосипед с технологией IsoSpeed для плавного катания и выдающимися характеристиками для энтузиастов дорожных трасс.',
        image: 'Trek.jpg',
        cost: 750,
    },
    {
        name: 'Specialized',
        description: 'Великолепный горный байк, объединяющий прочность и легкость, обеспечивая впечатляющую управляемость и производительность на труднопроходимых трейлах.',
        image: 'Specialized.jpg',
        cost: 630
    },
    {
        name: 'Giant',
        description: 'Элегантный шоссейник, созданный для долгих дистанций, с интегрированными технологиями и устойчивой геометрией для комфортного катания на большие расстояния.',
        image: 'Giant.jpg',
        cost: 650
    },
    {
        name: 'Cannondale',
        description: 'Легкий и агрессивный горный велосипед, оборудованный инновационной технологией Lefty Ocho и выдающейся подвеской для максимальной проходимости по трассам.',
        image: 'Cannondale.jpg',
        cost: 550
    },
    {
        name: 'Scott ',
        description: 'Шоссейник высочайшего класса, сделанный для гонщиков, с аэродинамическим дизайном и легким карбоновым каркасом для максимальной скорости на дороге.',
        image: 'Scott.jpg',
        cost: 430
    },
    {
        name: 'Merida',
        description: 'Универсальный горный велосипед, предлагающий отличное сочетание легкости, жесткости и подвески для плавного и уверенного катания по разнообразным трассам.',
        image: 'Merida.jpg',
        cost: 900
    },

]
async function insert_bicycles() {
    for (let i in bicycles) {
        let bicycle = bicycles[i]
        let new_bike = await db.query('INSERT INTO bicycle (name, description, image, cost) VALUES ($1, $2, $3, $4) RETURNING *',
            [bicycle.name, bicycle.description, bicycle.image, bicycle.cost])
        console.log(new_bike.rows[0])
    }
}

insert_bicycles()