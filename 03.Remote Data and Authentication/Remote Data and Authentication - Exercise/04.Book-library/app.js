document.getElementById('editForm').style.display = 'none';
async function getAllBooks() {
    document.querySelector('tbody').innerHTML = '';
    const tbody = document.querySelector('tbody');
    const books = await request('http://localhost:3030/jsonstore/collections/books');

    tbody.innerHTML = Object.entries(books).map(createRow).join('')

    function createRow([id, book]) {
        const result = `
        <tr data-id="${id}">
        <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
                </td>
       </tr>`;
        return result;
    }
}

async function createBook(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    const book = {
        author: form.get('author'),
        title: form.get('title')
    }

    if (book.author == '' || book.title == '') {
        return alert('All fields are required!');
    }

    await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    getAllBooks();
}

async function updateBook(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const id = form.get('id');
    const book = {
        author: form.get('author'),
        title: form.get('title')
    }
    console.log(id)
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';

    getAllBooks();
}

async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    getAllBooks();
}


function handleTableClick(event) {
    if (event.target.className == 'editBtn') {
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';
        const bookId = event.target.parentNode.parentNode.dataset.id;
        loadBookForEditting(bookId);
    } else if (event.target.className == 'deleteBtn') {
        const confirmed = confirm('Are you sure you want to delete this book?');
        if (confirmed) {
            const bookId = event.target.parentNode.parentNode.dataset.id;
            deleteBook(bookId);
        }
    }
}

function start() {
    document.querySelector('tbody').innerHTML = '';
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    document.querySelector('form').addEventListener('submit', createBook);
    document.querySelector('#editForm').addEventListener('submit', updateBook);

    document.querySelector('#editForm [type="button"]').addEventListener('click', (event) => {
        document.getElementById('createForm').style.display = 'block';
        document.getElementById('editForm').style.display = 'none';

    });
    document.querySelector('table').addEventListener('click', handleTableClick);
    getAllBooks();
}

start();
async function loadBookForEditting(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + `${id}`);

    document.querySelector('#editForm [name="id"]').value = id;
    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;
}

async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}