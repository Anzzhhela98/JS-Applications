import * as api from "./api/data.js";
import { render } from './node_modules/lit-html/lit-html.js'
import page from '//unpkg.com/page/page.mjs';
import { logout } from './api/data.js';

import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { dashboardPage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myFurniturePage } from "./views/myFurniture.js";

// window.api = api;

const container = document.querySelector('.container');

page('/', renderMiddleware, dashboardPage);
page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);
page('/create', renderMiddleware, createPage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);
page('/my-furniture', renderMiddleware, myFurniturePage);

page.start();

function renderMiddleware(context, next) {
    context.setUserNav = setUserNav;
    context.render = (context) => render(context, container);
    next();
}

export function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId !== null) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await logout();
    page.redirect('/');
    console.log(sessionStorage.length)
    setUserNav();
});