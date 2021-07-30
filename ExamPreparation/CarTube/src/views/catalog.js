import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllCars } from "../../src/api/data.js";
import { carTemplate } from "../views/common/carTemplate.js"

const template = (cars) => html `
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">${cars.length ? cars.map(carTemplate) : html`<p class="no-cars">No cars in database.</p>`}
    </div>
</section>`;

// const carTemplate = ({ imageUrl, brand, model, year, price, _id }) => html `
// <div class="listing">
//     <div class="preview">
//         <img src="${imageUrl}">
//     </div>
//     <h2>${brand} ${model}</h2>
//     <div class="info">
//         <div class="data-info">
//             <h3>Year: ${year}</h3>
//             <h3>Price: ${price} $</h3>
//         </div>
//         <div class="data-buttons">
//             <a href="${'/details/'+_id}" class="button-carDetails">Details</a>
//         </div>
//     </div>
// </div>`;

export async function catalogPage(context) {
    const cars = await getAllCars();
    console.log(cars)
    context.render(template(cars));
    context.setUserNav();
}