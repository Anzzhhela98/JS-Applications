let main;
let div;

import { showHowme } from "./home.js";
import { setupNavigation } from "./app.js";

export function setupLogin(mainTarget, divTarget) {
    main = mainTarget;
    div = divTarget;

    const form = div.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export function showLogin() {
    main.innerHTML = '';
    main.appendChild(div);
}

async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    const email = form.get('email');
    const password = form.get('password');

    if (email == '' || password == '') {
        return alert('All fileds are required!');
    }

    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }
    sessionStorage.setItem('authToken', data.accessToken);
    sessionStorage.setItem('id', data._id);
    console.log(data);

    showHowme();
    setupNavigation();
}