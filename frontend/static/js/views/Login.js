import Base from './Base.js'
import Main from './Main.js';
import {create_nav_bar} from '../nav_bar.js'

function create_login_form() {
    const main_block = document.createElement('div')
    main_block.className = 'auth-form'

    const header = document.createElement('h1')
    header.innerText = 'Вход'
    main_block.appendChild(header)

    const form = document.createElement('form')
    form.id = 'login-form'
    form.method = 'POST'

    form.innerHTML += '<label for="phone"> Номер телефона </label>'
    form.innerHTML += '<input type="tel" id="phone" name="phone" required>'

    form.innerHTML += '<label for="password"> Пароль </label>'
    form.innerHTML += '<input type="password" id="password" name="password" required>'

    form.innerHTML += '<button type="submit"> Войти </button>'
    main_block.appendChild(form)

    return main_block
}
export default class extends Base {
    constructor() {
        super();
        this.set_title('Вход')
    }

    async make_page() {
        const container = document.getElementById('content')
        container.innerHTML = ''
        const form = create_login_form()
        container.appendChild(form)

        document.getElementById('login-form').addEventListener('submit', send_data)
    }
}

async function send_data(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            phone_number: data.get('phone'),
            password: data.get('password')
        })
    })

    if (res.status === 200) {
        await create_nav_bar()
        history.pushState(null, null, `/`)
        new Main().make_page()
    }
    else {
        const info = await res.json()
        alert(info.message)
    }
}