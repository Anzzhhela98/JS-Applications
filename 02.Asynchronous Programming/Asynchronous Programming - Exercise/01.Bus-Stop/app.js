async function getInfo() {
    const id = document.querySelector('#stopId');
    const ul = document.querySelector('#buses');

    try {
        const ulr = `http://localhost:3030/jsonstore/bus/businfo/${id.value}`;
        const response = await fetch(ulr);
        const busStop = await response.json();

        ul.innerHTML = '';
        document.querySelector('#stopName').textContent = busStop.name;

        Object.entries(busStop.buses).map(([bus, time]) => {
            const li = createElemente('li', `Bus ${bus} arrives in ${time} `);
            ul.appendChild(li);
        })
        id.value = ''
    } catch (error) {
        ul.innerHTML = ''
        document.querySelector('#stopName').textContent = `Error`;
        alert(error.message)
    }
}

function createElemente(type, text, attributes) {
    const result = document.createElement(type);
    if (text) {
        result.textContent = text;
    }
    if (attributes) {
        result.className = attributes;
    }

    return result;
}