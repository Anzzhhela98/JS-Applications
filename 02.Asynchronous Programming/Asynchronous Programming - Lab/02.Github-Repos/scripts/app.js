function loadRepos() {
    const username = document.querySelector('#username').value;
    const url = `https://api.github.com/users/${username}/repos`;

    fetch(url)
        .then((response) => {
            if (response.status == 404) {
                throw new Error('User not found')
            }
            console.log(response);
            return response.json() //return promisse
        })
        .then((data) => {
            //dat => like array
            console.log(data)
            const ul = document.querySelector('#repos');
            ul.innerHTML = '';

            data.forEach(d => {
                const a = document.createElement('a');
                const li = document.createElement('li');
                a.setAttribute('href', d.html_url);
                a.textContent = d.full_name;

                li.append(a);
                ul.append(li);
            });
        })
        .catch(error => {
            alert(error.message)
        });
}