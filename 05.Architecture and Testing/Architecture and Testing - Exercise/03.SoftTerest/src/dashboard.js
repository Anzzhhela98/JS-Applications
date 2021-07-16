import { html, render } from "../node_modules/lit-html/lit-html.js"

import { showDetails } from "./details.js"
let main;
let div;

export function setupDashboard(mainTarget, divTarget) {
    main = mainTarget;
    div = divTarget;
}

export async function showDashboard() {
    main.innerHTML = '';
    main.appendChild(div);
    console.log(html)
    const dashboard = await getDashboard();
    if (!dashboard) {
        const h1 = document.createElement('h1');
        h1.textContent = `No ideas yet! Be the first one :)`;
        div.innerHTML = '';
        div.appendChild(h1);
        return;
    };

    render(dashboard.map(createView), div);
    div.addEventListener('click', goToDetails);
}

async function getDashboard() {
    const response = await fetch('http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');

    if (response.ok == false) {
        const error = response;
        return alert(error.message);
    }

    return await response.json()
}

const createView = (idea) =>
    html `<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a id="${idea._id}" class="btn" href="">Details</a>
</div>`;


function goToDetails(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        showDetails(event.target.id)
    }
}