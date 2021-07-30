import { html } from "../../node_modules/lit-html/lit-html.js";
import { createIdea } from "../api/data.js"

const template = (onSubmit) => html`
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class=" d-md-flex flex-mb-equal ">
        <div class="col-md-6">
            <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
        </div>
        <form @submit=${onSubmit} class="form-idea col-md-5" action="#/create" method="post">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
            </div>
            <div class="form-label-group">
                <label for="ideaTitle">Title</label>
                <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?"
                    required="" autofocus="">
            </div>
            <div class="form-label-group">
                <label for="ideaDescription">Description</label>
                <textarea type="text" name="description" class="form-control" placeholder="Description"
                    required=""></textarea>
            </div>
            <div class="form-label-group">
                <label for="inputURL">Add Image</label>
                <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                    required="">
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
        </form>
    </div>
</div>`;


export async function createPage(context) {
    context.render(template(onSubmit));
    context.setUserNav();

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const idea = {
            title: formData.get('title'),
            description: formData.get('description'),
            img: formData.get('imageURL'),
        };

        
        if (idea.title.length < 6) {
            return alert('Idea title must be at least 6 characters long!');
        }
        
        if (idea.description.length < 10) {
            return alert('Idea description must be at least 10 characters long!');
        }
        
        if (idea.img.length < 5) {
            return alert('Image URL must be at least 5 characters long!');
        }
        
        await createIdea(idea);
        event.target.reset();
        context.page.redirect('/catalog');
    }
}