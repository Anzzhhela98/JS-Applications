import * as api from "../src/api/data.js"
import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";

import { loginPage } from "../src/views/login.js";
import { registerPage } from "../src/views/register.js";
import { logout } from "../src/api/data.js"
import { homePage } from "../src/views/homePage.js";
import { memesPage } from "../src/views/allMemes.js";
import { detailsPage } from "../src/views/details.js";
import { createPage } from "../src/views/create.js";
import { editPage } from "../src/views/edit.js";
import { myProfilePage } from "../src/views/myProfile.js";

page('/login', renderMiddleware, loginPage);
page('/register', renderMiddleware, registerPage);
page('/', renderMiddleware, homePage);
page('/allMemes', renderMiddleware, memesPage);
page('/create', renderMiddleware, createPage);
page('/myProfile', renderMiddleware, myProfilePage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);


window.api = api;
const container = document.querySelector('main');

//applications Start
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
        document.getElementById('welcomeEmail').innerHTML = `Welcome, ${username}`;
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'block';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await logout();
    page.redirect('/');
    setUserNav();
});