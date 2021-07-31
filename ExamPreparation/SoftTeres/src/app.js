import * as api from "../src/api/data.js";
import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from "../src/api/data.js"

// window.api = api;
const container = document.getElementById('container');

import { loginPage } from "../src/views/login.js";
import { registerPage } from "../src/views/register.js";
import { homePage } from "../src/views/homePage.js";
import { catalogPage } from "../src/views/catalog.js";
import { createPage } from "../src/views/create.js";
import { detailsPage } from "../src/views/details.js";

page('/', renderMiddleware, homePage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);
page('/catalog', renderMiddleware, catalogPage);
page('/create', renderMiddleware, createPage);
page('/details/:id', renderMiddleware, detailsPage);

setUserNav();
page.start();

function renderMiddleware(context, netxt) {
    context.setUserNav = setUserNav
    context.render = (context) => render(context, container);
    netxt();
}

export function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        document.getElementById('user-create').style.display = 'block';
        document.getElementById('user-logoutBtn').style.display = 'block';
        document.getElementById('guest-login').style.display = 'none';
        document.getElementById('guest-register').style.display = 'none';

    } else {
        document.getElementById('user-create').style.display = 'none';
        document.getElementById('user-logoutBtn').style.display = 'none';
        document.getElementById('guest-login').style.display = 'block';
        document.getElementById('guest-register').style.display = 'block';
    }
}

document.getElementById('user-logoutBtn').addEventListener('click', async() => {
    await logout();
    page.redirect('/');
    setUserNav();
});