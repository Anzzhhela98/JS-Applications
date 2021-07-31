import * as api from "./api/data.js";

import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { logout } from "../src/api/data.js";

window.api = api;
const container = document.getElementById('main-content');
import { loginPage } from "../src/views/login.js";
import { registerPage } from "../src/views/register.js";
import { homePage } from "../src/views/home.js";
import { cataloguePage } from "../src/views/catalogue.js";
import { detailsPage } from "../src/views/details.js";
import { editPage } from "../src/views/edit.js";
import { createPage } from "../src/views/create.js";
import { searchPage } from "../src/views/search.js";

page('/', renderMiddleware, homePage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);
page('/catalogue', renderMiddleware, cataloguePage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);
page('/create', renderMiddleware, createPage);
page('/search', renderMiddleware, searchPage);


setUserNav();
page.start();

function renderMiddleware(context, next) {
    context.setUserNav = setUserNav
    context.render = (context) => render(context, container);
    next();
};

export function setUserNav() {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
};

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await logout();
    page.redirect('/');
    setUserNav();
});