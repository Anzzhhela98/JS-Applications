import { showDashboard } from "./dashboard.js";
let main;
let div;

export function setupCreate(mainTarget, divTarget) {
    main = mainTarget;
    div = divTarget;

    const form = div.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export function showCreate() {
    main.innerHTML = '';
    main.appendChild(div);
}

async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    const title = form.get('title');
    const description = form.get('description');
    const img = form.get('imageURL');
    const token = sessionStorage.getItem('authToken');

    const data = await (await fetch('http://localhost:3030/data/ideas', {
        method: 'post',
        headers: {
            'Content-Type': 'applications/json',
            'X-Authorization': token
        },
        body: JSON.stringify({ title, description, img })
    })).json();
    showDashboard()
}