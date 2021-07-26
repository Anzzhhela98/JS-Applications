import { html } from "../../node_modules/lit-html/lit-html.js";
import { createCar } from "../../src/api/data.js";

const createTemplate = (onSubmit) => html `  
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`;

export async function createPage(context) {
    context.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const year = Number(formData.get('year').trim());
        const price = Number(formData.get('price').trim());
        const description = formData.get('description').trim();
        const ad = { brand, model, description, year, imageUrl, price };

        if ([brand, model, imageUrl, description].map(Boolean).includes(false)) {
            return alert('All fields are required!');
        }

        if (year < 1 || price < 1) {
            return alert('Year and price must be a positive numbers!');
        }

        await createCar(ad);
        context.page.redirect('/catalog');
    }
}