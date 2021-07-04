function lockedProfile() {
    getUsers();
}

async function getUsers() {
    const main = document.querySelector('main');

    // Request to get all users from server
    try {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles';
        const response = await fetch(url);
        const users = await response.json();

        main.innerHTML = ''
        Object.values(users)
            .map(createUser)
            .forEach((u) => main.appendChild(u));
    } catch (error) {
        alert(error);
    }
}

function createUser({ age, email, username, _id }) {
    const divProfile = createElement('div');
    divProfile.className = 'profile'
    const img = createElement('img', undefined, 'userIcon', { src: './iconProfile2.png' }, divProfile);
    const labelLock = createElement('label', 'Lock', undefined, undefined, divProfile);
    const inputLock = createElement('input', undefined, undefined, { type: 'radio', name: 'user1Locked', value: 'lock', checked: true }, divProfile);
    const labelUnlock = createElement('label', 'Unlock', undefined, undefined, divProfile);
    const inputUnlock = createElement('input', undefined, undefined, { type: 'radio', name: 'user1Locked', value: 'unlock' }, divProfile);
    const br = createElement('br');
    divProfile.appendChild(br);
    const hr = createElement('hr');
    divProfile.appendChild(hr);
    const labelUser = createElement('label', 'Username', undefined, undefined, divProfile);
    const inputUser = createElement('input', undefined, undefined, { type: 'text', name: 'user1Username', value: username, disabled: true, readonly: true }, divProfile);

    const divId = createElement('div', undefined, undefined, { id: _id }, divProfile);
    const hr2 = createElement('hr');
    divId.appendChild(hr2);
    const labelEmail = createElement('label', 'Email:', undefined, undefined, divId);
    const inputEmail = createElement('input', undefined, undefined, { type: 'email', name: 'user1Email', value: email, disabled: false, readonly: true }, divId);

    const labelAge = createElement('label', 'Age:', undefined, undefined, divId);
    const inputAge = createElement('input', undefined, undefined, { type: 'email', name: 'user1Age', value: age, disabled: true, readonly: true }, divId);
    const bntShowMore = createElement('button', 'Show more', undefined, undefined, divProfile);

    divId.style.display = 'none';
    bntShowMore.addEventListener('click', () => {
        if (inputLock.checked) {
            return;
        }
        divId.style.display = bntShowMore.textContent === 'Hide it' ? 'none' : 'block';
        bntShowMore.textContent = bntShowMore.textContent === 'Show more' ? 'Hide it' : 'Show more';
    });

    return divProfile;
}

function createElement(type, text, className, attributes, appender) {
    const element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    if (className) {
        element.className = className;
    }
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value == true ? '' : value);
        });
    }
    if (appender) {
        appender.appendChild(element);
    }

    return element;
}