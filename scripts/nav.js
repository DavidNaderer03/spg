

export class Navbar {
    constructor(path, id) {
        this.path = path;
        this.text = "";
        this.id = id;
        this.folder = "./pages/"
    }

    async insert() {
        const file = await fetch(this.path);
        const json = await file.json();
        this.getTabulatorElements(json);
        document.getElementById(this.id).innerHTML = this.text;
    }

    getEndpoint(element) {
        return `<li class="link"><a href="${this.folder + element.url}">${element.name}</a></li>`;
    }

    getTabulatorElements(elements) {
        for(const element of elements) {
            if(element.url) {
                this.text += this.getEndpoint(element);
            } else {
                this.text += "<li class='link'>" + element.name + "<ul>"
                this.folder += element.folder;
                this.getTabulatorElements(element.items);
                this.text += "</ul></li>";
                this.folder = this.folder.substring(0, this.folder.indexOf('/')) + "/";
            }
        }
    }
}