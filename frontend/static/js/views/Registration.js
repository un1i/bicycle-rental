import Base from './Base.js'
import Login from './Login.js'

function create_reg_form() {
    const main_block = document.createElement('div')
    main_block.className = 'auth-form'

    const header = document.createElement('h1')
    header.innerText = 'Регистрация'
    main_block.appendChild(header)

    const notification = document.createElement('div')
    notification.id = 'reg-notification'
    notification.className = 'success-notification'
    main_block.appendChild(notification)

    const form = document.createElement('form')
    form.id = 'registration-form'
    form.method = 'POST'

    form.innerHTML = '<label for="name"> Имя </label>'
    form.innerHTML += '<input id="name" name="name" required>'

    form.innerHTML += '<label for="phone"> Номер телефона </label>'
    form.innerHTML += '<input type="tel" id="phone" name="phone" required>'

    form.innerHTML += '<label for="password"> Пароль </label>'
    form.innerHTML += '<input type="password" id="password" name="password" required>'

    form.innerHTML += '<button class="button" type="submit"> Зарегистрироваться </button>'
    main_block.appendChild(form)

    return main_block
}


export default class extends Base {
    constructor() {
        super();
        this.set_title('Регистрация')
    }

    async make_page() {
        const container = document.getElementById('content')
        container.innerHTML = ''
        const form = create_reg_form()
        container.appendChild(form)

        document.getElementById('registration-form').addEventListener('submit', send_data)
    }
}

async function send_data(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const res = await fetch('/auth/registration', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: data.get('name'),
            phone_number: data.get('phone'),
            password: data.get('password')
        })
    })

    if (res.status === 200) {
        const notification = document.getElementById('reg-notification')
        notification.innerText = 'Успешная регистрация!'
        setTimeout(()=>{
            history.pushState(null, null, `/login`)
            new Login().make_page()
            },
            1000)
    }
    else {
        const info = await res.json()
        let msg = info.message + '\n'
        if (info.errors) {
            for (let i in info.errors) {
                msg += info.errors[i].msg + '\n'
            }
        }
        alert(msg)
    }
}