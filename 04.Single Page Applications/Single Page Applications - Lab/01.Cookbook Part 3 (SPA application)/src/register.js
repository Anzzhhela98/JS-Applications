let main;
let section;
let onSucces;

export function setupRegister(mainTarget, sectionTarget, onSuccessTarget) {
    main = mainTarget;
    section = sectionTarget;
    onSucces = onSuccessTarget;

    section.querySelector('form').addEventListener('submit', onRegister);
    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const response = await fetch('http://localhost:3030/users/register', {
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

export async function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);
}