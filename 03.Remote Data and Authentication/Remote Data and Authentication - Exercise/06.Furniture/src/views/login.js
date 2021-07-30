import { html } from '../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

const loginTemplate = (onSubmit,invalidEmail,invalidPass) =>
    html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (invalidEmail ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (invalidPass ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

export async function loginPage(context) {
    context.render(loginTemplate(onSubmit));
    context.setUserNav();

    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const email = form.get('email');
        const password = form.get('password');

        if (!email || !password ) {
            context.render(loginTemplate(onSubmit, !email, !password));
            return alert('All fields are required! ')
        }

        await login(email, password);
        event.target.reset();
        context.page.redirect('/');
    }
}