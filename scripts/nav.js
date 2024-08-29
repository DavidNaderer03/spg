

export class Navbar {
    constructor(path, id) {
        this.path = path;
        this.text = "";
        this.id = id;
        this.prev = "./pages/"
        this.folder = "./pages/"
    }

    async insert() {
        const file = await fetch(this.path);
        const json = await file.json();
        this.getTabulatorElements(json);
        document.getElementById(this.id).innerHTML = this.text;
        this.setEventListener();
    }

    getEndpoint(element) {
        return `<li class="link"><a href="${this.folder + element.url}">${element.name}</a></li>`;
    }

    getTabulatorElements(elements) {
        for(const element of elements) {
            if(element.url) {
                this.text += this.getEndpoint(element);
            } else {
                this.text += "<li class='link folder'>" + element.name + "<ul>"
                this.prev = this.folder;
                this.folder += element.folder;
                this.getTabulatorElements(element.items);
                this.text += "</ul></li>";
                this.folder = this.prev
            }
        }
    }

    setEventListener() {
        document.querySelectorAll('.folder').forEach(element => {
            element.addEventListener('click', () => {
                if(element.children[0].classList.contains("d-none")) {
                    element.children[0].classList.remove("d-none");
                } else {
                    element.children[0].classList.add("d-none");
                }
            })
        });
    }
}