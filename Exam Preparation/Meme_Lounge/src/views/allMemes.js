import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMemes } from "../api/data.js"


const memesTemplate = (memes) => html `
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">${memes.length ? memes.map(memeView) : html`<p class="no-memes">No memes in database.</p>`}</div>
    </section>`;

const memeView = (meme) => html`
<div class="meme" dataset=${meme._ownerId}>
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="${'/details/'+meme._id}">Details</a>
        </div>
    </div>
</div>`;

export async     function memesPage(context) {
    const memes = await getAllMemes();
    console.log(memes)
    context.render(memesTemplate(memes));
    context.setUserNav()
}