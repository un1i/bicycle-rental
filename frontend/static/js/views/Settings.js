import Base from './Base.js'

export default class extends Base {
    constructor() {
        super();
        this.set_title('Settings');
    }

    async make_page() {
        document.getElementById('content').innerHTML = "<h1> Settings </h1>"
    }

}