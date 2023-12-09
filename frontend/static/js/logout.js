import {create_nav_bar} from './nav_bar.js';

async function logout() {
    const res = await fetch('/auth/logout')
        if (res.status === 200) {
            create_nav_bar()
        }
        else {
            alert('Произошла ошибка, попробуй еще раз')
        }
}

export {logout}