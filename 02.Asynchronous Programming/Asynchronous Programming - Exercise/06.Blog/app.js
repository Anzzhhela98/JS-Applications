function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', getComments);
}

attachEvents();

async function getPosts() {
    try {
        const url = 'http://localhost:3030/jsonstore/blog/posts';
        const response = await fetch(url);
        const data = await response.json();

        const select = document.getElementById('posts');
        select.innerHTML = '';

        Object.values(data).map(createOptions).forEach(o => select.appendChild(o));
    } catch (error) {
        alert(error);
    }
}

function createOptions(post) {
    const option = document.createElement('option');
    option.value = post.id;
    option.textContent = post.title;

    return option;
}

async function getComments() {
    const postId = document.getElementById('posts').value;
    if (postId) {
        const urlPosts = 'http://localhost:3030/jsonstore/blog/posts/' + postId;
        const urlComments = 'http://localhost:3030/jsonstore/blog/comments';

        const [postResponse, commentsResponse] = await Promise
            .all([fetch(urlPosts), fetch(urlComments)]);
        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();

        const postTitle = document.getElementById('post-title');
        postTitle.textContent = postData.body;
        const ulComments = document.getElementById('post-comments');

        const comments = Object.values(commentsData).filter((p) => p.postId == postId);

        comments.map(createComments).forEach(c => ulComments.appendChild(c));
    } else {
        alert('You should load posts firs!')
    }
}

function createComments(comment) {
    const li = document.createElement('li');
    li.textContent = comment.text;
    li.id = comment.id;

    return li;
}