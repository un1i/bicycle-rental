async function create_nav_bar() {
    const res = await fetch('/user/by-auth')
    const user = await res.json()

    const nav = document.getElementById('nav')
    nav.innerHTML = ''

    const logo = document.createElement('div')
    logo.className = 'logo'
    logo.innerHTML = '<a href="/"><img src="static/images/logo.png" alt="Главная"></a>'
    nav.appendChild(logo)

    const auth_nav = document.createElement('div')
    auth_nav.className = 'auth-nav'
    nav.appendChild(auth_nav)

    if (user.name) {
        auth_nav.innerHTML = `<span id="login-nav"">  </span>`
        const link = document.createElement('a')
        auth_nav.appendChild(link)
        link.href = '/logout'
        link.id = 'name-nav'
        link.innerText = user.name
        link.addEventListener('mouseover', show_logout)
        link.addEventListener('mouseout', show_name)
    }
    else {
        auth_nav.innerHTML = '<a id="registration-nav" href="/registration">Регистрация</a>'
        auth_nav.innerHTML += '<a id="login-nav" href="/login">Войти</a>'
    }
}

function show_logout(event) {
    const element = event.target
    element.dataset.originalText = element.innerText
    element.innerText = 'Выйти'
}

function show_name(event) {
    const element = event.target
    if (element.dataset.originalText) {
        element.innerText = element.dataset.originalText
    }
}

export {create_nav_bar}
