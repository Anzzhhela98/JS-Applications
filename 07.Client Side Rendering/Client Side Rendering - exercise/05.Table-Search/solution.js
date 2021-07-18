import { html, render } from "./node_modules/lit-html//lit-html.js"
const container = document.querySelector('tbody');
const url = 'http://localhost:3030/jsonstore/advanced/table';
const input = document.getElementById('searchField');

const createTemplate = (student, match) =>
    html `<tr class="${match == true ? 'select' : ''}">
   <td>${student.firstName} ${student.lastName}}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`;

async function initialize() {
    input.addEventListener('input', () => update(list, input.value));

    const studentsData = await (await fetch(url)).json();
    const list = Object.values(studentsData);

    update(list);
}

initialize()

function update(list, match = '') {
    const result = list.map(x => createTemplate(x, compare(x, match)));
    render(result, container);
}

function compare(item, match) {
    return Object.values(item).some((v) => match && v.toLowerCase().includes(match.toLowerCase()));
}