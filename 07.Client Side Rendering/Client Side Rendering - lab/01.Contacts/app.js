import { contacts } from './contacts.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';

contacts.forEach((c) => (c.isVisible = false));

const cardTemplate = (data) => html `
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${data.name}</h2>
            <button class="detailsBtn">Details</button>
            <div class="details" id=${data.id} style=${styleMap({ display: data.isVisible ? 'block' : 'none' })}>
                <p>Phone number: ${data.phoneNumber}</p>
                <p>Email: ${data.email}</p>
            </div>
        </div>
    </div>
`;

const container = document.getElementById('contacts');
container.addEventListener('click', onClick);
render(contacts.map(cardTemplate), container);

function onClick(e) {
    if (e.target.classList.contains('detailsBtn')) {
        const id = e.target.parentNode.querySelector('.details').id;
        const element = contacts.find((c) => c.id == id);

        element.isVisible = !element.isVisible;
        render(contacts.map(cardTemplate), container);
        // note: even that we send our elements trough render function again
        // lit-html only changes the values that have been changed and does
        // only partial update of the DOM!
    }
}