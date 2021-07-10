let loadButton = document.querySelector('main aside .load');
loadButton.addEventListener('click', getCatches);

let catchesContainer = document.getElementById('catches');
catchesContainer.querySelectorAll('.catch').forEach(x => x.remove());

let addButton = document.querySelector('#addForm .add');
addButton.disabled = localStorage.getItem('token') === null;
addButton.addEventListener('click', createCatch);

async function getCatches() {
    let url = 'http://localhost:3030/data/catches';
    let getCatchesResponse = await fetch(url);
    let catches = await getCatchesResponse.json();
    console.log(catches);

    catchesContainer.querySelectorAll('.catch').forEach(x => x.remove());

    catchesContainer.append(...catches.map(c => createHtmlCatch(c)));
}

async function createCatch(){
    let anglerInput = document.querySelector('#addForm .angler');
    let weightInput = document.querySelector('#addForm .weight');
    let speciesInput = document.querySelector('#addForm .species');
    let locationInput = document.querySelector('#addForm .location');
    let baitInput = document.querySelector('#addForm .bait');
    let captureTimeInput = document.querySelector('#addForm .captureTime');

    let newCatch = {
        angler: anglerInput.value,
        weight: Number(weightInput.value),
        species: speciesInput.value,
        location: locationInput.value,
        bait: baitInput.value,
        captureTime: Number(captureTimeInput.value)
    };

    let createResponse = await fetch('http://localhost:3030/data/catches',
    {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        method: 'Post',
        body: JSON.stringify(newCatch)
    });
    let createResult = await createResponse.json();
    let createdCatch = createHtmlCatch(createResult);
    catchesContainer.appendChild(createdCatch);
    console.log(createResult);
}

async function updateCatch(e){
    let curCatch = e.target.parentElement;
    let anglerInput = curCatch.querySelector('.angler');
    let weightInput = curCatch.querySelector('.weight');
    let speciesInput = curCatch.querySelector('.species');
    let locationInput = curCatch.querySelector('.location');
    let baitInput = curCatch.querySelector('.bait');
    let captureTimeInput = curCatch.querySelector('.captureTime');

    let updatedCatch = {
        angler: anglerInput.value,
        weight: Number(weightInput.value),
        species: speciesInput.value,
        location: locationInput.value,
        bait: baitInput.value,
        captureTime: Number(captureTimeInput.value)
    };

    let id = curCatch.dataset.id;
    let url = `http://localhost:3030/data/catches/${id}`;
    let updateResponse = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        method: 'Put',
        body: JSON.stringify(updatedCatch)
    });

    let updateResult = await updateResponse.json();
    console.log(updateResult);
}

async function deleteCatch(e){
    let curCatch = e.target.parentElement;
    let id = curCatch.dataset.id;
    let url = `http://localhost:3030/data/catches/${id}`;
    let deleteResponse = await fetch(url, {
        headers: {
            'X-Authorization': localStorage.getItem('token')
        },
        method: 'Delete'
    });

    let deleteResult = await deleteResponse.json();
    console.log(deleteResult);
    if(deleteResponse.status === 200){
        curCatch.remove();
    }
}

function createHtmlCatch(curCatch) {
    let anglerLable = ce('label', undefined, 'Angler');
    let anglerInput = ce('input', {type: 'text', class:'angler'}, curCatch.angler);
    let hr1 = ce('hr');
    let weightLabel = ce('label', undefined, 'Weight');
    let weightInput = ce('input', {type:'number', class:'weight'}, curCatch.weight);
    let hr2 = ce('hr');
    let speciesLabel = ce('label', undefined, 'Species');
    let speciesInput = ce('input', {type:'text', class:'species'}, curCatch.species);
    let hr3 = ce('hr');
    let locationLabel = ce('label', undefined, 'Location');
    let locationInput = ce('input', {type:'text', class:'location'}, curCatch.location);
    let hr4 = ce('hr');
    let baitLabel = ce('label', undefined, 'Bait');
    let baitInput = ce('input', {type:'text', class:'bait'}, curCatch.bait);
    let hr5 = ce('hr');
    let captureTimeLabel = ce('label', undefined, 'Capture Time');
    let captureTimeInput = ce('input', {type:'number', class:'captureTime'}, curCatch.captureTime);
    let hr6 = ce('hr');
    let updateBtn = ce('button', {disabled:true, class:'update'}, 'Update');
    updateBtn.addEventListener('click', updateCatch);
    updateBtn.disabled = localStorage.getItem('userId') !== curCatch._ownerId;
    let deleteBtn = ce('button', {disabled:true, class:'delete'}, 'Delete');
    deleteBtn.addEventListener('click', deleteCatch);
    deleteBtn.disabled = localStorage.getItem('userId') !== curCatch._ownerId;

    let catchDiv = ce('div', {class:'catch'},
    anglerLable, anglerInput, hr1, weightLabel, weightInput, hr2, speciesLabel, speciesInput,
    hr3, locationLabel, locationInput, hr4, baitLabel, baitInput, hr5, captureTimeLabel,
    captureTimeInput, hr6, updateBtn, deleteBtn);
    catchDiv.dataset.id = curCatch._id;
    catchDiv.dataset.ownerId = curCatch._ownerId;
    return catchDiv;
}


function ce(tag, attributes, ...params) {
    let element = document.createElement(tag);
    let firstValue = params[0];
    if (params.length === 1 && typeof (firstValue) !== 'object') {
        if (['input', 'textarea'].includes(tag)) {
            element.value = firstValue;
        } else {
            element.textContent = firstValue;
        }
    } else {
        element.append(...params);
    }

    if (attributes !== undefined) {
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        })
    }

    return element;
}