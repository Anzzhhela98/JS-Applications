import { html, render } from "../node_modules/lit-html/lit-html.js";

const container = document.getElementById('notifications');
console.log(container);
export function notify(message) {
    const messageToShow = html `            
    <div id="errorBox" class="notification">
    <span>${message}</span>
    </div>`;

    console.log(messageToShow);

    render(messageToShow, container);
    console.log(container);

    container.querySelector('span').style.display = 'block';
    console.log(container.querySelector('span'));

    setTimeout(() => {
        container.querySelector('span').style.display = 'none';
    }, 3000);
}