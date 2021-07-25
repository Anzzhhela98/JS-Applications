import { html } from "../../node_modules/lit-html/lit-html.js";
import { getIMemeById, deleteMeme } from "../api/data.js"

const detailsTemplate = (meme, isOwner, onDelete) => html `<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>
            ${isOwner
                 ? html`
            <a class="button warning" href="${'/edit/'+meme._id}">Edit</a>
            <button @click=${onDelete}  class="button danger">Delete</button>`
                 : null}
        </div>
    </div>
</section>`;

export async function detailsPage(context) {
    const userId = sessionStorage.getItem('userId');
    const meme = await getIMemeById(context.params.id);
    const isOwner = userId == meme._ownerId;
console.log(meme._ownerId,userId)
    context.render(detailsTemplate(meme, isOwner,onDelete));

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this meme?');
   if(confirmed){
    
   await deleteMeme(meme._id);
   context.page.redirect('/allMemes');
}
    }
}