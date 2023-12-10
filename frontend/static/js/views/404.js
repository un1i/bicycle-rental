import Base from './Base.js'

export default class extends Base {
    constructor() {
        super();
        this.set_title(404);
    }

    async make_page() {
        let response = await fetch('/bicycles')
        let bicycles = await response.json()

        const container = document.getElementById('content')
        container.innerHTML = ''
        const block = document.createElement('div')
        block.className = 'error-404'
        block.innerText = 'Ошибка 404. Страница не найдена('
        container.appendChild(block)
    }
}