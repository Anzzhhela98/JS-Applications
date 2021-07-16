import { showDashboard } from "./dashboard.js"
let main;
let div;

export function setupDetails(mainTarget, divTarget) {
    main = mainTarget;
    div = divTarget;
}

export async function showDetails(id) {
    main.innerHTML = '';
    const data = await getCurrentDetails(id);

    const userId = sessionStorage.getItem('id');
    const detail = createDetailsView(data)
    main.append(detail);

    const deleteBtn = main.querySelector('.btn.detb');

    if (userId == data._ownerId) {
        deleteBtn.addEventListener('click', async(event) => {
            event.preventDefault();

            const confirmed = confirm('Are you sure you want to delete this idea?');
            if (confirmed) {
                console.log(id)

                const data = await fetch('http://localhost:3030/data/ideas/' + id, {
                    method: 'delete',
                    headers: {
                        'X-Authorization': sessionStorage.getItem('authToken'),
                    },
                });

                if (data.ok) {
                    alert('Movie deleted!');
                    showDashboard();
                }
            }
        });
    } else {
        deleteBtn.style.display = 'none'
    }
}

async function getCurrentDetails(id) {
    const response = await fetch('http://localhost:3030/data/ideas/' + id);
    const data = await response.json();

    return data;
}

function createDetailsView(data) {
    const div = document.createElement('div');
    div.setAttribute('id', 'details-page');
    div.className = 'container home some';
    div.innerHTML = `<img class="det-img" src="${data.img}" />
    <div class="desc">
        <h2 class="display-5">${data.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${data.description}</p>
    </div>
    <div class="text-center">
        <a class="btn detb" href="">Delete</a>
    </div>`
    return div;
}