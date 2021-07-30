import * as api from "../src/api/data.js"
import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from "../src/api/data.js"

import { homePage } from "../src/views/home.js";
import { loginPage } from "../src/views/login.js";
import { registerPage } from "../src/views/register.js";
import { catalogPage } from "../src/views/catalog.js";
import { detailsPage } from "../src/views/details.js";
import { editPage } from "../src/views/edit.js";
import { createPage } from "../src/views/create.js";
import { myCarsPage } from "../src/views/myListings.js";
import { searchPage } from "../src/views/search.js";

window.api = api;
const container = document.getElementById('site-content');

page('/', renderMiddleware, homePage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);
page('/catalog', renderMiddleware, catalogPage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);
page('/create', renderMiddleware, createPage);
page('/my-listings', renderMiddleware, myCarsPage);
page('/search', renderMiddleware, searchPage);

setUserNav();
page.start();

function renderMiddleware(context, next) {
    context.setUserNav = setUserNav;
    context.render = (context) => render(context, container);
    next();
}

export function setUserNav() {
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('welcome').textContent = `Welcome, ${username}`;

        document.getElementById('guest').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await logout();
    page.redirect('/');
    setUserNav();
});