import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js"

const template = (onSubmit) => html `
       <div class="container auth">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Register</legend>
                <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up. It increases by diffusion and grows by dispersion.</blockquote>
                <p class="field email">
                    <input type="email" id="email" name="email" placeholder="maria@email.com">
                    <label for="email">Email:</label>
                </p>
                <p class="field password">
                    <input type="password" name="password" id="register-pass">
                    <label for="register-pass">Password:</label>
                </p>
                <p class="field password">
                    <input type="password" name="rep-pass" id="rep-pass">
                    <label for="rep-pass">Repeat password:</label>
                </p>
                <p class="field submit">
                    <button class="btn submit" type="submit">Register</button>
                </p>
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </div>`;

export function registerPage(context) {
    context.render(template(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const email = form.get('email');
        const password = form.get('password');
        const repPass = form.get('rep-pass');

        if (email === '' || password === '') {
            return alert('All fields are required!');
        }

        if (password !== repPass) {
            return alert("Passwords don't match!");
        }

        await register(email, password);
        context.setUserNav();
        event.target.reset();
        context.page.redirect('/');
    }
}