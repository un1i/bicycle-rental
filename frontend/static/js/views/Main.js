import Base from './Base.js'

function create_bicycle_card(bicycle) {
    const card = document.createElement('div')
    card.className = 'bicycle_card'

    const card_image = document.createElement('div')
    card_image.className = 'card_image'
    card_image.innerHTML = `<a href="/bicycle/${bicycle.id}"> <img src="/images/${bicycle.image}" alt="Велосипед"/> </a>`

    const card_title = document.createElement('a')
    card_title.className = 'card_title'
    card_title.href = `/bicycle/${bicycle.id}`
    card_title.innerText = `${bicycle.name}`

    const card_cost = document.createElement('div')
    card_cost.className = 'card_cost'
    card_cost.innerText = `${bicycle.cost}`

    card.appendChild(card_image)
    card.appendChild(card_title)
    card.appendChild(card_cost)
    return card
}

export default class extends Base {
    constructor() {
        super();
        this.set_title('Велосипеды');
    }

    async make_page() {
        let response = await fetch('/bicycles')
        let bicycles = await response.json()

        const container = document.getElementById('content')
        container.innerHTML = ''
        const bicycles_container = document.createElement("div")
        bicycles_container.className = 'cards'
        container.appendChild(bicycles_container)
        for (let i in bicycles) {
            const bicycle = bicycles[i]
            const cur = create_bicycle_card(bicycle)
            bicycles_container.appendChild(cur)
        }

    }
}