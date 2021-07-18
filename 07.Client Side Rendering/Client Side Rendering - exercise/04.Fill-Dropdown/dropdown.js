import { html, render } from "./node_modules/lit-html/lit-html.js";
const container = document.querySelector('div');
const input = document.getElementById('itemText');
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

getData();

async function getData() {
    document.querySelector('form').addEventListener('submit', (e) => addItem(event, list))
    const response = await fetch(url);

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    let list = Object.values(data);

    update(list)
}

async function addItem(event, list) {
    event.preventDefault();
    if (input.value) {
        const item = input.value

        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: item }),
        });

        const result = await response.json();
        list.push(result);
        input.value = ' ';
        update(list);
    }
}

const createTemplate = (list) =>
    html `<select id="menu">
    ${list.map((x) => html`<option value="${x._id}">${x.text}
    </option>`)};
</select>`;

function update(list) {
    const result = createTemplate(list);
    render(result, container);
}