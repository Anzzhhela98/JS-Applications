import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { styleMap } from "../../node_modules/lit-html/directives/style-map.js";

const loginTemplate = (onSubmit) =>
    html `<div class="row space-top">
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
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

export async function loginPage(context) {
    const data =
        context.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const email = form.get('email');
        const password = form.get('password');

        await login(email, password);
        event.target.reset();

        context.page.redirect('/');
    }
}