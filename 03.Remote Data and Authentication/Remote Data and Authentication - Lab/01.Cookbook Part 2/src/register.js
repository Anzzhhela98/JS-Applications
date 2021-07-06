document.querySelector('form').addEventListener('submit', onRegister);

async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email == '' || password == '') {
        return alert('Fieds are required!');
    } else if (rePass != password) {
        return alert('Paswords must be eaqual!');
    }

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message)
    }
    sessionStorage.setItem('userToken', data.accessToeken);
    window.location.pathname = 'index.html';
}