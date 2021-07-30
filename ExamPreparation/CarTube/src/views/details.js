import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCarById, deleteCar } from "../api/data.js";

const detailsTemplate = ({ imageUrl, brand, model, year, price, _id, description }, isOwner, onDelete) => html `
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${brand}</li>
            <li><span>Model:</span>${model}</li>
            <li><span>Year:</span>${year}</li>
            <li><span>Price:</span>${price}$</li>
        </ul>
        <p class="description-para">${description}
        </p>
        ${isOwner ?
         html` <div class="listings-buttons">
            <a href="${'/edit/'+_id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>` : null}
    </div>
</section>`;

export async function detailsPage(context) {
    const carById = await getCarById(context.params.id)
    const isOwner = carById._ownerId == sessionStorage.getItem('userId');
    context.render(detailsTemplate(carById, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this advertise?');

        if (confirmed) {
            await deleteCar(context.params.id);
            context.page.redirect('/catalog');
        }
    }
}