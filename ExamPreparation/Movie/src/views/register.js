import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js"

const registerTemplate = (onSubmit) => html`
<section id="form-sign-up">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="post">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" >
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" >
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</section>
  `;


export function registerPage(context) {
    context.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const email = form.get('email');
        const password = form.get('password');
        const repeatPassword = form.get('repeatPassword');

        if ([email, password, repeatPassword].map(Boolean).includes(false)) {
            return alert('All fields are required!');
        }

        if (password !== repeatPassword) {
            return alert("Passwords don't match!");
        }

        await register(email, password);
        event.target.reset();
        context.page.redirect('/');
    }
}