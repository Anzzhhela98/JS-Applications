import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js"
import { notify } from "../notifications.js";

const registerTemplate = (onSubmit) => html `
    <section id="register">
        <form @submit=${onSubmit}id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="#">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>`;


export function registerPage(context) {
    context.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const username = form.get('username');
        const email = form.get('email');
        const password = form.get('password');
        const repeatPass = form.get('repeatPass');
        const gender = form.get('gender');

        try {
            if ([username, email, password, repeatPass, gender].map(Boolean).includes(false)) {
                throw new Error('All fields are required!');
            }

            if (password !== repeatPass) {
                throw new Error("Passwords don't match!");
            }
            await register(username, email, password, gender);
            event.target.reset();
            context.page.redirect('/allMemes');
        } catch (error) {
            notify(error);
        }
    }
}