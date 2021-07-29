import * as api from "../src/api/data.js";
import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from "../src/api/data.js"

import { catalogPage } from "../src/views/catalog.js"
import { loginPage } from "../src/views/login.js"
import { registerPage } from "../src/views/register.js"
import { addMoviePage } from "../src/views/addMovie.js"
import { detailsPage } from "../src/views/details.js"
import { editPage } from "../src/views/edit.js"

window.api = api;
const container = document.getElementById('container');


page('/', renderMiddleware, catalogPage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);
page('/addMovie', renderMiddleware, addMoviePage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);

setUserNav();
page.start();

function renderMiddleware(context, next) {
    context.setUserNav = setUserNav;
    context.render = (context) => render(context, container);
    next();
}

export function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email) {
        document.getElementById('welcome').textContent = `Welcome, ${email}`;

        [...document.querySelectorAll('#guest')].map(x => x.style.display = 'none');
        [...document.querySelectorAll('#user')].map(x => x.style.display = 'block')
    } else {
        [...document.querySelectorAll('#guest')].map(x => x.style.display = 'block');
        [...document.querySelectorAll('#user')].map(x => x.style.display = 'none')

    }
}

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await logout();
    page.redirect('/');
    setUserNav();
});