import { html } from "../../node_modules/lit-html/lit-html.js";
import { createMovie } from "../api/data.js";


const template = (onSubmit) => html`
    <section id="add-movie">
        <form @submit=${onSubmit} class="text-center border border-light p-5">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>`;

    
export function addMoviePage(context) {
    context.render(template(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const description = form.get('description');
        const title = form.get('title');
        const imageUrl = form.get('imageUrl');

        if ([description, title, imageUrl].map(Boolean).includes(false)) {
            return alert('All fields are required!');
        }

        await createMovie({title,description,imageUrl});
        event.target.reset();
        context.page.redirect('/');
    }
}