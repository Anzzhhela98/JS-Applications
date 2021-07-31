import { html } from "../../node_modules/lit-html/lit-html.js";
import { createArticle } from "../api/data.js";

const template = (onSubmit) => html `  
<section id="create-page" class="content">
    <h1>Create Article</h1>
    <form @submit=${onSubmit} id="create" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title" required />
            </p>
            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category" required />
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content" required></textarea>
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Create" />
            </p>
        </fieldset>
    </form>
</section>`;

export function createPage(context) {
    context.render(template(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const category = formData.get('category').trim();
        const content = formData.get('content').trim();

        if ([title, category, content].map(Boolean).includes(false)) {
            return alert('All fields are required!');
        }

        await createArticle({ title, category, content });
        console.log('yes')
        context.page.redirect('/');
    }
}