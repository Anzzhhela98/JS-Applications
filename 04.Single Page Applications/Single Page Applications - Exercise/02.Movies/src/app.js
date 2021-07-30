import { setupLogin, showLogin } from './login.js';
setupSection('form-login', setupLogin);

const links = {
    "homeLink": 'showHome',
    "loginLink": showLogin,
    "registerLink": 'showRegister',
    "createLink": 'showCreate'
}

function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}