import { html } from "../../node_modules/lit-html/lit-html.js";
import { getArticles } from "../api/data.js";


const template = (articles) => html `
    <!-- Catalogue Page -->
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
        ${articles.length ? articles.map(articleCard) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>`;

const articleCard = (article) => html`
<a class="article-preview" href=${'/details/' + article._id}>
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`;

export async function cataloguePage(context) {
    const articles = await getArticles();
    context.render(template(articles));
    context.setUserNav();
}