import Base from './Base.js'
import {create_basic_skeleton} from "../skeleton.js";

function create_bicycle_info(bicycle) {
    const main_block = create_basic_skeleton(bicycle)
    const right = main_block.getElementsByClassName('right-column')[0]

    const desc = document.createElement('div')
    desc.className = 'bicycle-description'
    desc.innerHTML = `<p>${bicycle.description}</p>`
    right.appendChild(desc)

    const booking = document.createElement('div')
    booking.className = 'booking'
    right.appendChild(booking)

    const cost = document.createElement('div')
    cost.className = 'bicycle-cost'
    cost.innerText = bicycle.cost
    booking.appendChild(cost)

    const booking_button = document.createElement('div')
    booking_button.className = 'booking-button'
    booking_button.innerHTML = `<a href="/booking?id=${bicycle.id}">Забронировать</a>`
    booking.appendChild(booking_button)

    return main_block
}

export default class extends Base {
    constructor() {
        super();
    }

    async make_page() {
        const id = Number(location.pathname.split('/')[2])
        const res = await fetch(`/bicycles/${id}`)
        const bicycle = await res.json()

        this.set_title(bicycle.name)

        const container = document.getElementById('content')
        container.innerHTML = ""
        const info = create_bicycle_info(bicycle)
        container.appendChild(info)
    }
}