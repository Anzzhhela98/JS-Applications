import { html } from '../node_modules/lit-html/lit-html.js';
import { editItem ,getItemById} from '../api/data.js'

const editTemplate = (item,onSubmit) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" value="${item.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" value="${item.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" value="${item.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description" value="${item.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" value="${item.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" value="${item.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value="${item.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

export async function editPage(context) {
    context.setUserNav();

    const itemId = context.params.id;
    const item = await getItemById(itemId);
    context.render(editTemplate(item, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const make = form.get('make');
        const model = form.get('model');
        const year = Number(form.get('year'));
        const description = form.get('description');
        const price = Number(form.get('price'));
        const img = form.get('img');
        const material = form.get('material');

        await editItem(itemId, { make, model, year, description, price, img, material });
        context.page.redirect('/');
    }
}