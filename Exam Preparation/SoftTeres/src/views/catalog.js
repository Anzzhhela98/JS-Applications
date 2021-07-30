import { html } from "../../node_modules/lit-html/lit-html.js";
import { getIdeas } from "../api/data.js"

const template = (ideas) => html`
<div id="dashboard-holder">
    ${ideas.length ? ideas.map(ideaTemplate) :
        html`<h1>No ideas yet! Be the first one :)</h1>`}
</div>`;

const ideaTemplate = (idea) => html`
<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a class="btn" href="${'/details/'+idea._id}">Details</a>
</div>`;

export async function catalogPage(context) {
    const ideas = await getIdeas();
    context.render(template(ideas));
    context.setUserNav();
}