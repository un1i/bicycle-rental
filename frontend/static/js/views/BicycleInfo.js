import Base from './Base.js'

function create_bicycle_info(bicycle) {
    const bicycle_info = document.createElement('div')
    bicycle_info.className = 'bicycle-info'

    const left = document.createElement('div')
    left.className = 'left-column'
    left.innerHTML = `<img src="images/${bicycle.image}" alt="${bicycle.name}"/>`
    bicycle_info.appendChild(left)

    const right = document.createElement('div')
    right.className = 'right-column'
    bicycle_info.appendChild(right)

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

    const booking_button = document.createElement('div')
    booking_button.className = 'booking-button'
    booking_button.innerHTML = '<a href="#">Забронировать</a>'
    booking.appendChild(booking_button)

    return bicycle_info
}

export default class extends Base {
    constructor() {
        super();
        this.set_title('пока хз')
    }

    async make_page() {
        const id = Number(location.pathname.split('/')[2])
        const res = await fetch(`/bicycles/${id}`)
        const bicycle = await res.json()

        const container = document.getElementById('content')
        container.innerHTML = ""
        const info = create_bicycle_info(bicycle)
        container.appendChild(info)
    }
}