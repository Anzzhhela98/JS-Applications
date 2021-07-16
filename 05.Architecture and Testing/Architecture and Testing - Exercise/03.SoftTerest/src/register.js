import { setupNavigation } from "./app.js"
import { showHowme } from "./home.js";
let main;
let div;

export function setupRegister(mainTarget, divTarget) {
    main = mainTarget;
    div = divTarget;

    const form = div.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export function showRegister() {
    main.innerHTML = '';
    main.appendChild(div);
}

async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    const email = form.get('email');
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    if (password != repeatPassword) {
        return alert('Passwords don\'t match!');
    } if (email == '' || password == '' || repeatPassword == '') {
        return alert('All fileds are required!');
    }

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message)
    }

    const data = await response.json();
    sessionStorage.setItem('authToken', data.accessToken);
    sessionStorage.setItem('id', data._id);
    showHowme();
    setupNavigation();
}