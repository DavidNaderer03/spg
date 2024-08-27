import { Navbar } from "../../nav.js";

const navbar = new Navbar('./json/nav.json', 'list');

document.addEventListener("DOMContentLoaded", () => {
    navbar.insert();
});