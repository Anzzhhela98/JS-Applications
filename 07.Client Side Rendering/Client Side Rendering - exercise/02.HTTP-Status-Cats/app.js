import { html, render } from "./node_modules/lit-html/lit-html.js";
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';
import { cats } from "./catSeeder.js"

const container = document.getElementById('allCats');
cats.forEach((c) => c.info == false);

const createList = (cat) =>
    html `<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style=${styleMap(cat.info==true? {display:'block'} : { display: 'none' })} id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;


const createUl = () => {
    const catssUl = html `<ul @click=${toggleInfo}>
    ${cats.map((c) => createList(c))}
</ul>`
    render(catssUl, container);
}

function toggleInfo(event) {
    if (event.target.classList.contains('showBtn')) {
        const curId = event.target.parentNode.querySelector('.status').id;
        const cat = cats.find((c) => c.id == curId);
        cat.info = cat.info == true ? false : true;

        createUl();
    }
}
//start
createUl();