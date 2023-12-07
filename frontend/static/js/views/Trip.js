import Base from './Base.js'
import {create_basic_skeleton, create_rental_points_select} from "../skeleton.js";

async function start_trip() {
    const id = location.pathname.split('/')[2]
    const res = await fetch(`/trip/start-trip/${id}`)
    if (res.status === 200) {
        new Trip().make_page()
    }
    else {
        alert('Произошла ошибка при старте поездки, попробуйте еще раз')
    }
}

async function finish_trip() {
    const id = location.pathname.split('/')[2]
    const rental_point_id = document.getElementById('finish-rental-point').value
    const res = await fetch(`/trip/finish-trip/${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            rental_point: rental_point_id
        })
    })

    if (res.status === 200) {
        new Trip().make_page()
    }
    else {
        alert('Произошла ошибка при завершении поездки, попробуйте еще раз')
    }
}

function refresh_stopwatch(stopwatch, start_date) {
    const date_now = new Date()
    stopwatch.innerText = new Date(date_now - start_date).toISOString().slice(11, 19)
}

function create_start_trip(block, booking) {
    const header = document.createElement('h1')
    header.className = 'local-header'
    header.innerText = 'Бронь'
    block.appendChild(header)

    const date = document.createElement('div')
    date.className = 'date'
    date.innerHTML = `<p> Дата: ${new Date(booking.date).toLocaleString()} </p>`
    block.appendChild(date)

    const rental_point = document.createElement('div')
    rental_point.className = 'rental-point'
    rental_point.innerHTML = `<p> Адрес пункта проката: <br>${booking.rental_point_addr} </p>`
    block.appendChild(rental_point)

    const start_button = document.createElement('button')
    start_button.className = 'start-button'
    start_button.innerText = 'Начать поездку'
    start_button.onclick = start_trip
    block.appendChild(start_button)
}

function create_current_trip(block, trip, rental_points) {
    const header = document.createElement('h1')
    header.className = 'local-header'
    header.innerText = 'Прошло времени:'
    block.appendChild(header)

    const stopwatch = document.createElement('div')
    stopwatch.className = 'stopwatch'
    const start_date = new Date(trip.date_start)
    stopwatch.innerText = '00:00:00'
    setInterval(() => refresh_stopwatch(stopwatch, start_date), 1000)
    block.appendChild(stopwatch)

    const label = document.createElement('label')
    label.setAttribute('for', 'finish-rental-point')
    label.innerText = 'Выберите пункт, в котором желаете завершить поездку'
    block.appendChild(label)

    const select = create_rental_points_select(rental_points)
    select.id = 'finish-rental-point'
    block.appendChild(select)

    const finish_button = document.createElement('button')
    finish_button.className = 'finish-button'
    finish_button.innerText = 'Завершить поездку'
    finish_button.onclick = finish_trip
    block.appendChild(finish_button)
}

function create_completed_trip(block, trip) {
    const header = document.createElement('h1')
    header.className = 'local-header'
    header.innerText = 'Поездка завершена'
    block.appendChild(header)

    const start = document.createElement('div')
    start.className = 'start'
    start.innerHTML += '<h2> Начало:</h2>'
    start.innerHTML += `<p> ${new Date(trip.date_start).toLocaleString()}</p>`
    start.innerHTML += `<p> ${trip.rental_point_start_addr}</p>`
    block.appendChild(start)

    const finish = document.createElement('div')
    finish.className = 'finish'
    finish.innerHTML += '<h2> Конец: </h2>'
    finish.innerHTML += `<p> ${new Date(trip.date_finish).toLocaleString()} </p>`
    finish.innerHTML += `<p> ${trip.rental_point_finish_addr} </p>`
    block.appendChild(finish)

    const cost = document.createElement('div')
    cost.className = 'cost'
    cost.innerHTML += '<h2>Стоимость:</h2>'
    cost.innerHTML += `<span> ${trip.cost} </span>`
    block.appendChild(cost)
}

export default class  Trip extends Base {
    constructor() {
        super();
        this.set_title('Поездка')
    }

    async make_page() {
        const id = location.pathname.split('/')[2]
        let res = await fetch(`/trip/book/${id}`)
        const booking = await res.json()

        res = await fetch(`/bicycles/${booking.bicycle_id}`)
        const bicycle = await res.json()

        const container = document.getElementById('content')
        container.innerHTML = ""

        const main_block = create_basic_skeleton(bicycle)
        const right = main_block.getElementsByClassName('right-column')[0]
        container.appendChild(main_block)

        if (booking.booking_status_id) {
            create_start_trip(right, booking)
        }
        else {
            res = await fetch(`trip/active/${id}`)
            let trip = await res.json()
            res = await fetch('/rental-points')
            const rental_points = await res.json()
            if (trip.status_id) {
                create_current_trip(right, trip, rental_points)
            } else {
                res = await fetch(`trip/completed/${id}`)
                trip = await res.json()
                create_completed_trip(right, trip)
            }
        }
    }
}