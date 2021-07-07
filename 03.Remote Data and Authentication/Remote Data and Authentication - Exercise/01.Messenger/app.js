function attachEvents() {
    document.querySelector('#submit').addEventListener('click', sendMessage);
    document.querySelector('#refresh').addEventListener('click', getMessage);
}

attachEvents();

async function sendMessage() {
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    if (author == '' || content == '') {
        return alert('All fields are required!');
    }

    await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify({ author, content })
    });

    document.getElementById('author').value = '';
    document.getElementById('content').value = '';

    getMessage();
}

async function getMessage() {
    const response = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await response.json();

    const messages = document.getElementById('messages');

    messages.value = Object.values(data)
        .map((e) => `${e.author}: ${e.content}`)
        .join('\n');
    console.log(Object.values(data))
}