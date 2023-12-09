import Main from './views/Main.js'
import BicycleInfo from './views/BicycleInfo.js';
import Booking from './views/Booking.js';
import Trip from './views/Trip.js';
import Registration from './views/Registration.js';
import Login from './views/Login.js'
import {logout} from './logout.js'
import Settings from "./views/Settings.js";
import {create_nav_bar} from './nav_bar.js'

function navigate_to(url) {
    history.pushState(null, null, url)
    router()
}
async function router() {
    const routes = [
        {path: new RegExp('^/$'), view: Main},
        // {path: '/posts', view: ()=>console.log('view posts')},
        {path: new RegExp('^/bicycle/\d*'), view: BicycleInfo},
        {path: new RegExp('^/settings$'), view: Settings},
        {path: new RegExp('^/booking$'), view: Booking},
        {path: new RegExp('^/trips/.'), view: Trip},
        {path: new RegExp('^/registration$'), view: Registration},
        {path: new RegExp('^/login$'), view: Login},
    ]

    let match = routes[0]
    for (let i in routes) {
        const route = routes[i]
        if (route.path.test(location.pathname)) {
            match = route
            break
        }
    }

    const view = new match.view()
    await view.make_page()
}

document.addEventListener('DOMContentLoaded', create_nav_bar)
document.addEventListener('DOMContentLoaded', router)

window.addEventListener('popstate', router)

document.addEventListener('click', async e => {
    if (e.target.tagName === 'A' || (e.target.tagName === 'IMG' && e.target.parentNode.tagName === 'A')) {
        e.preventDefault()
        if (e.target.id === 'name-nav') {
            logout()
            return
        }
        let href = ""

        if (e.target.tagName ==='A') {
            href = e.target.href
        }
        else {
            href = e.target.parentNode.href
        }
        navigate_to(href)
    }
})