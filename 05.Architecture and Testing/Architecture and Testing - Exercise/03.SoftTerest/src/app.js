import { setupHome, showHowme } from "./home.js";
import { setupLogin, showLogin } from "./login.js";
import { setupRegister, showRegister } from "./register.js";
import { setupDashboard, showDashboard } from "./dashboard.js";
import { setupCreate, showCreate } from "./create.js";
import { setupDetails, showDetails } from "./details.js";


const main = document.querySelector('main');
const links = {
    'img-link': showHowme,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'dashboardLink': showDashboard,
    'createdLink': showCreate,
    'logoutBtn': logout,
}


setupSection('home-page', setupHome);
setupSection('login-page', setupLogin);
setupSection('register-page', setupRegister);
setupSection('dashboard-holder', setupDashboard);
setupSection('create-page', setupCreate);
setupSection('details-page', setupDetails);


setupNavigation();

// Start application in home view
showHowme();


function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}

export function setupNavigation() {
    const auth = sessionStorage.getItem('authToken');
    if (auth == null) {
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('createdLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'block';
        document.getElementById('loginLink').style.display = 'block';

    } else {
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('createdLink').style.display = 'block';
        document.getElementById('registerLink').style.display = 'none';
        document.getElementById('loginLink').style.display = 'none';
    }

}

(function addEvents() {
    document.querySelector('nav').addEventListener('click', (event) => {
        event.preventDefault();
        const view = links[event.target.id];
        if (typeof view == 'function') {
            view();
        }
    });
})()

async function logout() {
    const token = sessionStorage.getItem('authToken');

    await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': token },
    });
    sessionStorage.removeItem('authToken');
    setupNavigation();
}