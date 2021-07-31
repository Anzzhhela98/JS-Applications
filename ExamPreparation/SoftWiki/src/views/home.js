import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMostRecentArticle } from "../api/data.js"

const template = (cSharp, java, python, JavaScript) => html `
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${JavaScript ? articleTemplate(JavaScript) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${cSharp ? articleTemplate(cSharp) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${java ? articleTemplate(java) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${python ? articleTemplate(python) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
</section>`;

const articleTemplate = ({ content, title, _id }) => html`
    <article>
        <h3>${title}</h3>
        <p>${content}</p>
        <a href=${'/details/' + _id} class="btn details-btn">Details</a>
    </article>`;

export async function homePage(context) {
    const response = await getMostRecentArticle();
    const cSharp = response.find((a) => a.category === 'C#');
    const java = response.find((a) => a.category === 'Java');
    const python = response.find((a) => a.category === 'Python');
    const JavaScript = response.find((a) => a.category === 'JavaScript');
    context.render(template(cSharp, java, python, JavaScript));
}