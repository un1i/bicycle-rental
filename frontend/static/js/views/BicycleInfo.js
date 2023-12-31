import Base from './Base.js'
import {create_basic_skeleton} from "../skeleton.js";

function create_bicycle_info(bicycle) {
    const main_block = create_basic_skeleton(bicycle)
    const right = main_block.getElementsByClassName('right-column')[0]

    const name = document.createElement('div')
    name.className = 'bicycle-name'
    name.innerText = bicycle.name
    right.appendChild(name)

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

    const booking_button = document.createElement('a')
    booking_button.href = `/booking?id=${bicycle.id}`
    booking_button.className = 'button'
    booking_button.innerText = 'Забронировать'

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