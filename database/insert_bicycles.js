const db = require('./db')
const bicycles = [
    {
        name: 'Scott',
        description: 'Бренд назван по фамилии его создателя и появился в середине прошлого века, а сама компания начала с изготовления лыжных палок. Сейчас она делает очень «взрослые» велосипеда, в том числе горные, шоссейные',
        cost: 250,
    },
    {
        name: 'Trek',
        description: 'велосипеды разных типов от этой популярной торговой марки производятся уже более 40 лет. В их ассортименте – более двух сотен моделей.',
        cost: 340
    },
    {
        name: 'Merida',
        description: 'Тайваньская компания Merida Industry Co., Ltd – это один из крупнейших мировых производителей велосипедов. Компания начинала во второй половине прошлого века как производитель велосипедов других брендов, лишь потом стала выпускать технику под собственной маркой. ',
        cost: 500
    }
]
async function insert_bicycles() {
    for (i in bicycles) {
        let bicycle = bicycles[i]
        let new_bike = await db.query('INSERT INTO bicycle (name, description, cost) VALUES ($1, $2, $3) RETURNING *',
            [bicycle.name, bicycle.description, bicycle.cost])
        console.log(new_bike)
    }
}

insert_bicycles()