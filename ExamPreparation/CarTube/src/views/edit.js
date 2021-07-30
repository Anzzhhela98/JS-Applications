import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCarById, editCar } from "../../src/api/data.js";

const editTemplate = (carById, onSubmit) => html `
<section id="edit-listing">
    <div class="container">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value="${carById.brand}">
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value="${carById.model}">
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value="${carById.description}">
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value="${carById.year}">
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${carById.imageUrl}">
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value="${carById.price}">
            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function editPage(context) {
    const carById = await getCarById(context.params.id)
    context.render(editTemplate(carById, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const year = Number(formData.get('year').trim());
        const price = Number(formData.get('price').trim());
        const imageUrl = formData.get('imageUrl').trim();
        const description = formData.get('description').trim();
        const editedCar = { brand, model, description, year, imageUrl, price };

        if ([brand, model, imageUrl, description].map(Boolean).includes(false)) {
            return alert('All fields are required!');
        }

        if (year < 1 || price < 1) {
            return alert('Year and price must be a positive numbers!');
        }

        await editCar(carById._id, editedCar);
        context.page.redirect('/catalog');
    }
}