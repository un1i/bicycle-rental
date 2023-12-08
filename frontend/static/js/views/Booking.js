import Base from './Base.js'
import Trip from'./Trip.js'
import {create_basic_skeleton, create_rental_points_select} from '../skeleton.js'


function create_book_form(bicycle, rental_points, user) {
    const name = user.name || ''
    const phone = user.phone_number || ''
    const user_id = user.id || ''

    const main_block = create_basic_skeleton(bicycle)
    const right = main_block.getElementsByClassName('right-column')[0]
    const form = document.createElement('form')
    form.id = "booking-form"
    form.method = 'POST'
    right.appendChild(form)

    form.innerHTML = '<label for="name"> Имя </label>'
    form.innerHTML += `<input type="text" id="name" name="name" value="${name}" required>`

    form.innerHTML += '<label for="phone"> Номер телефона </label>'
    form.innerHTML += `<input type="tel" id="phone" name="phone" value="${phone}" required>`

    form.innerHTML += '<label for="rental-point"> Пункт проката </label>'
    const select = create_rental_points_select(rental_points)
    select.id = 'rental-point'
    form.appendChild(select)

    form.innerHTML += '<label for="date"> Дата </label>'
    form.innerHTML += '<input type="datetime-local" name="date" required>'

    form.innerHTML += `<input type="hidden" name="user-id" value="${user_id}">`

    form.innerHTML += '<button type="submit">Забронировать</button>'

    return main_block
}

export default class extends Base {
    constructor() {
        super();
    }

    async make_page() {
        const id = Number(new URLSearchParams(window.location.search).get('id')) || 1
        let response = await fetch(`/bicycles/${id}`)
        const bicycle = await response.json()
        response = await fetch('/rental-points')
        const rental_points = await response.json()
        response = await fetch('/user/by-auth')
        const user = await response.json()

        const container = document.getElementById('content')
        container.innerHTML = ""
        const form = create_book_form(bicycle, rental_points, user)
        container.appendChild(form)

        document.getElementById('booking-form').addEventListener('submit', send_data)
    }
}

async function send_data(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const user_id = data.get('user-id') || null

    const response = await fetch('/trip/book-trip', {
        method: 'POST',
        body: JSON.stringify({
            name: data.get('name'),
            phone_number: data.get('phone'),
            date: data.get('date'),
            rental_point_id: data.get('rental-point'),
            user_id: user_id,
            bicycle_id: Number(new URLSearchParams(window.location.search).get('id')) || 1
        }),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.status === 200) {
        const book = await response.json()
            history.pushState(null, null, `/trips/${book.id}`)
            new Trip().make_page()
    }
    else {
        alert('При бронировании произошла ошибка, попробуйте позже.')
    }
}
