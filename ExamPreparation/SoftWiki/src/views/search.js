import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchByQuery } from "../api/data.js"


const template = (onSearch, result = []) => html `
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSearch} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search" />
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search" />
        </p>
    </form>
    <div class="search-container">${result.length ? result.map(articleCard) : html`<h3 class="no-articles">No matching
            articles</h3>`}</div>
</section>`;

const articleCard = (article) => html`
<a class="article-preview" href=${'/details/' + article._id}>
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`;

export async function searchPage(context) {
    if (context.queryString) {
        console.log(context.queryString);
        const result = await searchByQuery(context.querystring.split('=')[1]);
        return context.render(template(onSearch, result));
    }

    context.render(template(onSearch));

    function onSearch(event) {
        event.preventDefault();
        const query = new FormData(event.target).get('search').trim();

        if (query === '') {
            return alert("Search details can't be empty!");
        }

        event.target.reset();
        context.page.redirect('/search?query=' + query);
    }
}