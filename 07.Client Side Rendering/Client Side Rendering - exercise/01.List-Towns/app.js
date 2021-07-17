import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('root');

document.getElementById('btnLoadTowns').addEventListener('click', () => {
    event.preventDefault();

    const inputTowns = document.getElementById('towns')
        .value.split(', ')
        .map(x => x.trim());

    render(createView(inputTowns), root);
    document.getElementById('towns').value = '';
});

const createView = (towns) =>
    html `<ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`;