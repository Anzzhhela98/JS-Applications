import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMovieById, deleteMovie, getLikesByMovieId, addLike, getOwnLikesByMovieId } from "../api/data.js"

const template = (movie, isOwner, countLikes, userLikes, onDelete, onLike) => html `
    <section id="movie-example">
        <div class="container">
            <div class="row bg-light text-dark">
                <h1>Movie title: ${movie.title}</h1>
    
                <div class="col-md-8">
                    <img class="img-thumbnail" src="${movie.img}" alt="Movie">
                </div>
                <div class="col-md-4 text-center">
                    <h3 class="my-3 ">Movie Description</h3>
                    <p>${movie.description}</p>
                    ${isOwner ? html`<a @click=${onDelete} class="btn btn-danger" href="#">Delete</a>
                    <a class="btn btn-warning" href="${'/edit/' + movie._id}">Edit</a>` : null}
                    ${isOwner  || userLikes.length>0 || !sessionStorage.getItem('userId')? null 
                    : html`<a @click=${onLike} class="btn btn-primary" href="#">Like</a>`}
                    <span class="enrolled-span">Liked ${countLikes}</span>
                </div>
            </div>
        </div>
    </section>`;


export async function detailsPage(context) {
    const movie = await getMovieById(context.params.id);
    const user = sessionStorage.getItem('userId');
    const isOwner = movie._ownerId == user;
    let userLikes = await getOwnLikesByMovieId(movie._id);
    let countLikes = await getLikesByMovieId(movie._id);
    context.render(template(movie, isOwner,countLikes,userLikes, onDelete, onLike,));

    async function onLike(event){
    event.target.remove();

    await addLike({movieId:movie._id});
    countLikes = await getLikesByMovieId(movie._id);
    userLikes = await getOwnLikesByMovieId(movie._id);
    context.render(template(movie, isOwner,countLikes,userLikes, onDelete));
     }

     async function onDelete(event) {
        event.preventDefault();
        await deleteMovie(context.params.id);
        context.page.redirect('/');
    }
}