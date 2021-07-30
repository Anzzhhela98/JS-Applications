import { request } from './request.js';

function start() {
    showHomePage()
}

document.getElementById("homepageLink").addEventListener('click', showHomePage);
// document.getElementById('emailLink').addEventListener('click', displayEmail);
document.getElementById('loginLink').addEventListener('click', showLogin);
document.getElementById('logoutLink').addEventListener('click', logOut);
document.getElementById('registerLink').addEventListener('click', showRegister);

let liks = {
    'loginLink': document.getElementById('form-login'),
    'registerLink': document.getElementById('form-sign-up'),
    'homepageLink': document.getElementById('home-page'),
}
let main = document.querySelector('main');
start();

function showHomePage(event) {
    // event.preventDefault();
    main.innerHTML = '';
    addMovie();
    main.append(liks['homepageLink']);

    if (localStorage.getItem('token') == null) {
        document.getElementById('createLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'none';
    } else {
        document.getElementById('createLink').style.display = 'block';
        document.getElementById('createLink').addEventListener('click', addMovie);
        document.getElementById('logoutLink').style.display = 'block';
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'none';
    }

    async function addMovie() {
        const section = document.getElementById('movie')
        const movies = await getMovies();
        const cards = movies.map(createMoviePreview);

        const fragment = document.createDocumentFragment();
        cards.forEach(c => fragment.appendChild(c));
        section.innerHTML = ''
        section.append(fragment);

        function createMoviePreview(movie) {
            const element = document.createElement('div');
            element.className = 'card mb-4';
            element.innerHTML = `
            <img class="card-img-top" src="${movie.img}"
            alt="Card image cap" width="400">
            <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
            </div>
            <div class="card-footer">
            <a href="#/details/6lOxMFSMkML09wux6sAF">
            <button id=${movie._id} type="button" class="btn btn-info movieDetailsLink">Details</button>
            </a>
            </div>`;

            return element;
        }
    }

    async function getMovies() {
        const data = await request('http://localhost:3030/data/movies');
        // const data = await response.json();

        return data;
    }

    getMovies();
}

function showLogin(event) {
    event.preventDefault();
    main.innerHTML = '';
    main.append(liks[event.target.id]);

    const section = document.getElementById('form-login')
    const form = section.querySelector('form').addEventListener('submit', login);

    async function login(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (password == '' || email == '') {
            return alert('All fields are require!');
        }

        const data = await request('http://localhost:3030/users/login', {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('email', data.email);
        displayEmail(email);
        showHomePage();
    }
}

function showRegister(event) {
    event.preventDefault();
    main.innerHTML = '';
    main.append(liks[event.target.id]);

    const section = document.getElementById('form-sign-up')
    const form = section.querySelector('form').addEventListener('submit', register);

    async function register(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        if (password == '' || repeatPassword == '' || email == '') {
            return alert('All fields are require!');
        } else if (password != repeatPassword) {
            return alert('Passwords must be match!');
        }

        const data = await request('http://localhost:3030/users/register', {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('email', data.email);


    }

}

function displayEmail(email) {
    if (localStorage.getItem('token')) {
        document.getElementById('emailLink').textContent = `Welcome ${email}`;
    }
}

function logOut() {

}