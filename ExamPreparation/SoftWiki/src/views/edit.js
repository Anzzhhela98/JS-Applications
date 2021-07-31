import { html } from "../../node_modules/lit-html/lit-html.js";
import { getArticleById, editArticleById } from "../api/data.js";

const template = (article, onSubmit) => html `
<section id="edit-page" class="content">
    <h1>Edit Article</h1>
    <form @submit=${onSubmit} id="edit">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}
                    required />
            </p>
            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category"
                    .value=${article.category} required />
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${article.content} required></textarea>
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes" />
            </p>
        </fieldset>
    </form>
</section>`;

export async function editPage(context) {
    const article = await getArticleById(context.params.id);
    context.render(template(article, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const title = form.get('title').trim();
        const category = form.get('category').trim();
        const content = form.get('content').trim();

        if ([title, category, content].map(Boolean).includes(false)) {
            return alert('All fields are required!');
        }

        await editArticleById(article._id, { title, category, content });
        context.setUserNav();
        event.target.reset();
        context.page.redirect('/details/' + article._id);
    }
}