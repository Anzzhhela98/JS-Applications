import { html } from "../../node_modules/lit-html/lit-html.js";
import { getArticleById, deleteArticleById } from "../api/data.js"

const template = (article, isOwner, onDelete, goBack) => html `    
    <section id="details-page" class="content details">
        <h1>${article.title}</h1>
        <div class="details-content">
            <strong>Published in category ${article.category}</strong>
            <p>${article.content}</p>
            ${isOwner
                ? html`
                      <div class="buttons">
                          <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                          <a href=${'/edit/' + article._id} class="btn edit">Edit</a>
                      </div>
                  `
                : null}
            <a @click=${goBack} href="javascript:void(0)" class="btn edit">Back</a>
        </div>
    </section>`;


export async function detailsPage(context) {
    const article = await getArticleById(context.params.id);
    const userId = sessionStorage.getItem('userId')
    const isOwner =userId===article._ownerId;
    console.log(isOwner)
    const goBack = () => window.history.back();
    context.render(template(article,isOwner,onDelete,goBack));

    async function onDelete(event){
        event.preventDefault();
        const confirmed = confirm('Are you sure you want to delete this article?');
        if(confirmed){
            await deleteArticleById(article._id);
            context.page.redirect('/')
        }
    }
}