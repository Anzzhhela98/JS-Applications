import { html } from '../node_modules/lit-html/lit-html.js';
import { register } from '../api/api.js';

const registerTemplate = (onSubmit, invalidEmail, invalidPass, invalidRepass) =>
    html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (invalidEmail ? ' is-invalid' : '' )} id="email" type="text"name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input 
                class=${"form-control" + (invalidPass ? ' is-invalid' : '' )} 
                id="password" 
                type="password"
                name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input 
                class=${"form-control" + (invalidRepass ? ' is-invalid' : '' )} 
                id="rePass" 
                type="password"
                name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

export async function registerPage(context) {
    context.render(registerTemplate(onSubmit));
    context.setUserNav();
    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const email = form.get('email');
        const password = form.get('password');
        const rePass = form.get('rePass');

        if (!email || !password || !rePass) {
             context.render(registerTemplate(onSubmit, !email, !password, !rePass));
            return alert('All fields are required! ')
        }
        if (rePass != password) {
            context.render(registerTemplate(onSubmit, false, true, true));
            return alert('Passwords must be match!')
        }

        await register(email, password);
        event.target.reset();
        context.page.redirect('/');
    }
}