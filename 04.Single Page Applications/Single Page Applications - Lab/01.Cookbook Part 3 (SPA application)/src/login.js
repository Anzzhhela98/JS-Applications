let main;
let section;
let onSucces;

export function setupLogin(mainTarget, sectionTarget, onSuccessTarget) {
    main = mainTarget;
    section = sectionTarget;
    onSucces = onSuccessTarget;

    section.querySelector('form').addEventListener('submit', onLogin);
    async function onLogin(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: { 'Content-Type': 'applications/json' },
            body: JSON.stringify({ email, password })
        })


        if (response.ok == false) {
            const error = await response.json();
            return alert(error.message);
        }

        const data = await response.json();
        sessionStorage.setItem('userToken', data.accessToken);
        onSucces();
    }
}

export async function showLogin() {
    main.innerHTML = '';
    main.appendChild(section);
}