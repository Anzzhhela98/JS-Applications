import { request } from './request';

function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (password == '' || email == '') {
        return alert('All fields are require!');
    }

    const data = await request('http://localhost:3030/users/login', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    sessionStorage.setItem('token', data.accessToken);
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('email', data.email);

    document.getElementById('emailLink').textContent = `Welcome ${email}`;
    Array.from(document.querySelectorAll('nav .user')).forEach(u => u.style.display = 'block');
    Array.from(document.querySelectorAll('nav .guest')).forEach(u => u.style.display = 'none');
}

let main;
let section;

export function setupLogin(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export async function showLogin() {
    main.innerHTML = '';
    main.appendChild(section);
}