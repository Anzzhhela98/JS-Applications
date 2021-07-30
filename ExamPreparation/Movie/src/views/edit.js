import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMovieById, editMovie } from "../api/data.js"

const editTemplate = (movie, onSubmit) => html `
      <section id="edit-movie">
    <form @submit = ${onSubmit} class="text-center border border-light p-5">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value="${movie.title}" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..."  .value="${movie.description}" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value="${movie.img}" name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </section>`;

export async function editPage(context) {
    const movie = await getMovieById(context.params.id);
    console.log(context.params.id)
    context.render(editTemplate(movie, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const description = formData.get('description').trim();

        if ([title, imageUrl, description].map(Boolean).includes(false)) {
            return notify('All fields are required!');
        }

        await editMovie(movie._id, { title, description, imageUrl });
        event.target.reset();
        context.page.redirect('/details/' + movie._id);
    }
}