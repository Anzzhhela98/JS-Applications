async function getRecipesList() {
    const main = document.querySelector('main');
    try {
        const ulr = 'http://localhost:3030/jsonstore/cookbook/recipes';
        const response = await fetch(ulr);
        const recipies = await response.json();

        if (response.status == 404) {
            alert(response.statusText || response.status);
        }

        main.innerHTML = '';
        Object.values(recipies)
            .map((el) => {
                const article = createElement('article', undefined, 'preview', main);
                article.addEventListener('click', () => getRecipiesDetails(el._id, article));

                const div = createElement('div', undefined, 'title', article);
                const h2 = createElement('h2', el.name, div);
                const div2 = createElement('div', undefined, 'small', article);
                const img = createElement('img', undefined, undefined, div2);
                img.setAttribute('src', el.img)
            });

    } catch (error) {
        alert(error.message)
    }
}

async function getRecipiesDetails(id, preview) {
    const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok == false) {
        alert(response.statusText || response.status);
    }

    const article = createElement('article');
    const h2 = createElement('h2', 'Title', undefined, article);

    h2.addEventListener('click', () => toggleCard());

    const div = createElement('div', undefined, 'band', article);
    const div2 = createElement('div', undefined, 'thumb', div);

    const img = createElement('img', undefined, undefined, div2);
    img.setAttribute('src', data.img)

    const div3 = createElement('div', undefined, 'ingredients', div);
    const h3 = createElement('h3', 'Ingredients:');
    const ul = createElement('ul');
    [h3, ul].map(e => div3.appendChild(e));

    Object.values(data.ingredients).map((el) => {
        const li = createElement('li', el)
        ul.appendChild(li);
    })

    const div4 = createElement('div', undefined, 'descriptions', article);
    const h3Prep = createElement('h3', 'Preparation:', div4);

    Object.values(data.steps).map((el) => {
        const p = createElement('p', el)
        div4.appendChild(p);
    })

    preview.replaceWith(article);

    function toggleCard() {
        article.replaceWith(preview);
    }
}

function createElement(type, text, attributes, appender) {
    const result = document.createElement(type);
    if (text) {
        result.textContent = text;
    }
    if (attributes) {
        result.className = attributes;
    }
    if (appender) {
        appender.appendChild(result);
    }
    return result;
}

window.addEventListener('load', () => {
    getRecipesList();
});