import Main from './views/Main.js'
import BicycleInfo from './views/BicycleInfo.js';
import Settings from "./views/Settings.js";
function navigate_to(url) {
    history.pushState(null, null, url)
    router()
}
async function router() {
    const routes = [
        {path: new RegExp('^/$'), view: Main},
        // {path: '/posts', view: ()=>console.log('view posts')},
        {path: new RegExp('^/bicycle/\d*'), view: BicycleInfo},
        {path: new RegExp('^/settings$'), view: Settings}
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

document.addEventListener('DOMContentLoaded', router)

window.addEventListener('popstate', router)

document.addEventListener('click', e => {
    if (e.target.tagName === 'A' || (e.target.tagName === 'IMG' && e.target.parentNode.tagName === 'A')) {
        e.preventDefault()
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