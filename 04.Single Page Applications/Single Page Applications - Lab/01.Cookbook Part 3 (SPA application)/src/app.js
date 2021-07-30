import { setupCatalog, showCatalog } from './catalog.js';
import { setupLogin, showLogin } from './login.js';
import { setupRegister, showRegister } from './register.js';
import { setupCreate, showCreate } from './create.js';

main();

const links = {
    'catalogLink': showCatalog,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createrLink': showCreate,
}

function main() {
    setUserNav();

    const main = document.querySelector('main');
    const catalogSection = document.getElementById('catalogSection');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const createSection = document.getElementById('ceateSection');

    setupCatalog(main, catalogSection);
    setupLogin(main, loginSection, () => { setUserNav(), showCatalog() });
    setupRegister(main, registerSection, () => { setUserNav(), showCatalog() })
    setupCreate(main, createSection, () => { showCatalog() })

    setupNavigation();

    //Start application in catalog view
    showCatalog();

    function setupNavigation() {
        document.querySelector('nav').addEventListener('click', (event) => {
            if (event.target.tagName == 'A') {
                event.preventDefault();
                const view = links[event.target.id];
                if (typeof view == 'function') {
                    view();
                }
            }
        })
    }

    function setUserNav() {
        if (sessionStorage.getItem('userToken') == null) {
            document.getElementById('guest').style.display = 'inline-block';
            document.getElementById('user').style.display = 'none';
        } else {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
            document.getElementById('logoutBtn').addEventListener('click', onLogOut);
        }
    }

    async function onLogOut() {
        const token = sessionStorage.getItem('userToken');

        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: { 'X-Authorization': token },
        });

        if (response.ok == false) {
            const error = await response.json();
            return alert(error.message);
        }

        sessionStorage.removeItem('userToken');
        setUserNav();
        showCatalog();
    }
}