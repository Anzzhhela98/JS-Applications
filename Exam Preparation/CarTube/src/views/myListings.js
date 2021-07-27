import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyCars } from "../../src/api/data.js";

const myCarsTemplate = (cars) => html `       
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        <div class="listings">${cars.length ? cars.map(carTemplate) : html`<p class="no-cars">You haven't listed any cars yet.'</p>`}
        </div>
</section>`;

const carTemplate = ({ imageUrl, brand, model, year, price, _id }) => html`
<div class="listing">
    <div class="preview">
        <img src="${imageUrl}">
    </div>
    <h2>${brand} ${model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${year}</h3>
            <h3>Price: ${price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="${'/details/' + _id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function myCarsPage(context) {
    const cars = await getMyCars();
    console.log(cars.length)
    context.render(myCarsTemplate(cars));
}