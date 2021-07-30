import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteIdeaById, getIdeaById } from "../api/data.js"

const template = ({ title, description, img }, isOwner, onDelete) => html`
<div class="container home some">
    <img class="det-img" src="${img}" />
    <div class="desc">
        <h2 class="display-5">${title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${description}</p>
    </div>
    ${isOwner ? html`
    <div class="text-center">
        <a @click=${onDelete} class="btn detb" href="javascript:void(0)">Delete</a>
    </div>`: null}
</div>`;

export async function detailsPage(context) {
    const idea = await getIdeaById(context.params.id);
    const userId = sessionStorage.getItem('userId');
    const isOwner = userId == idea._ownerId;

    context.render(template(idea, isOwner, onDelete));

    async function onDelete(event) {
        event.preventDefault();

        await deleteIdeaById(idea._id);
        context.page.redirect('/catalog');
    }
}