function attachEvents() {
    document.querySelector('#btnLoad').addEventListener('click', loadPosts);
    document.querySelector('#btnCreate').addEventListener('click', createPost);
}

attachEvents();

async function loadPosts() {
    const ul = document.querySelector('#phonebook');
    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();

    ul.innerHTML = ''

    Object.values(data)
        .map(createElement)
        .forEach((p) => ul.appendChild(p))
}

async function deletePost(event) {
    const id = event.target.parentNode.id;
    const url = `http://localhost:3030/jsonstore/phonebook/` + id

    const response = await fetch(url, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
    })
    event.target.parentNode.remove();
}

async function createPost() {
    const person = document.querySelector('#person').value;
    const phone = document.querySelector('#phone').value;

    if (person && phone) {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        });

        loadPosts();
    } else {
        return alert('All fileds are required!');
    }
}

function createElement({ person, phone, _id }) {
    const contact = document.createElement('li');
    contact.setAttribute('id', _id);
    contact.textContent = `${person}: ${phone}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', deletePost);
    contact.append(delBtn);

    return contact;
}