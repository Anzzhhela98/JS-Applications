import { html } from '../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js'

const createItemTemplate = (onSubmit, invalidPrice, invalidModel, invalidMake, invalidYear, invalidDescriprion, invalidImg) =>
    html `<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (invalidMake ? ' is-invalid' : '')} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (invalidModel ? ' is-invalid' : '')} type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (invalidYear ? ' is-invalid' : '')} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (invalidDescriprion ? ' is-invalid' : '')} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (invalidPrice ? ' is-invalid' : '')} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (invalidImg ? ' is-invalid' : '')} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export async function createPage(context) {
    context.render(createItemTemplate(onSubmit));
    context.setUserNav();

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

        //Here we must fill all inputs before initialize new Item
        const isValid = validation(make, model, year, description, price, img);
        if (isValid.includes(true)) {
            context.render(createItemTemplate(onSubmit, isValid[0], isValid[1], isValid[2], isValid[3], isValid[4], isValid[5]));
            return alert('All fields are required!');
        }

        const data = await createItem({ make, model, year, description, price, img, material });
        console.log(data);
        context.page.redirect('/');
    }
}

function validation(make, model, year, description, price, img) {
    let invaidPrice = false;
    let invaidModel = false;
    let invaidMake = false;
    let invaidYear = false;
    let invaidDescriprion = false;
    let invaidImg = false;

    if (price <= 0) {
        invaidPrice = true;
    }
    if (img == '') {
        invaidImg = true;
    }
    if (description.length <= 10) {
        invaidDescriprion = true;
    }
    if (year < 1950 || year > 2500) {
        invaidYear = true;
    }
    if (model.length < 4) {
        invaidModel = true;
    }
    if (make.length < 4) {
        invaidMake = true;
    }

    return [invaidPrice, invaidModel, invaidMake, invaidYear, invaidDescriprion, invaidImg];
}