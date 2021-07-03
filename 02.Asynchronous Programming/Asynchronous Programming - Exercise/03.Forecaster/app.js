function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather)
}
attachEvents();

async function getWeather() {
    const cityCodes = {
        'New York': 'ny',
        'London': 'london',
        'Barcelona': 'barcelona',
    };

    const symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degree': '&#176',
    };

    const currentDiv = document.getElementById('current');
    const upcommingDiv = document.getElementById('upcoming');
    const location = document.getElementById('location');
    const cityName = location.value;
    location.value = '';

    // if (!Object.keys(cityCodes).includes(cityName)) {
    //     console.log(currentDiv)
    //     return (currentDiv.value = 'Error - Wrong city name!');
    // }
    //make sure you are displaing just one weather forecast
    while (currentDiv.children.length >= 1 && upcommingDiv.children.length >= 1) {
        currentDiv.removeChild(currentDiv.lastChild);
        upcommingDiv.removeChild(upcommingDiv.lastChild);
    }

    const code = await getCode(cityName);

    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpcomming(code)
    ]);


    document.getElementById('forecast').style.display = 'block';

    //1 => forecast 
    const divForecasts = createElemente('div', undefined, 'forecasts');
    const conditionSymbol = current.forecast.condition;
    const spanConditonSymbol = createElemente('span', undefined, 'condition symbol');
    spanConditonSymbol.innerHTML = symbols[conditionSymbol];

    divForecasts.appendChild(spanConditonSymbol);
    currentDiv.appendChild(divForecasts);

    const span = createElemente('span', undefined, 'condition');
    const spanCity = createElemente('span', `${current.name}`, 'forecast-data');
    const spanHighLow = createElemente('span', undefined, 'forecast-data');
    spanHighLow.innerHTML = `${current.forecast.low}${symbols.Degree}/${current.forecast.high}${symbols.Degree}`;
    const spanCondition = createElemente('span', `${current.forecast.condition}`, 'forecast-data');

    [spanCity, spanHighLow, spanCondition].map((el) => span.appendChild(el));
    divForecasts.appendChild(span);

    //1 => upcomingDiv
    const divForecastInfo = createElemente('div', undefined, 'forecast-info');
    upcommingDiv.appendChild(divForecastInfo);

    for (let index = 0; index < upcoming.forecast.length; index++) {
        createSpan(upcoming, index, symbols).map(e => divForecastInfo.appendChild(e))
    }

}

async function getCode(cityName) {
    try {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const response = await fetch(url);
        const data = await response.json();

        return data.find((currentDiv) => currentDiv.name.toLowerCase() == cityName.toLowerCase()).code;
    } catch (error) {
        alert(error)
    }
}

async function getCurrent(code) {
    try {
        const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getUpcomming(code) {
    try {
        const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
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

function createSpan(upcoming, index, symbols) {
    const symbol = upcoming.forecast[index].condition;
    const low = upcoming.forecast[index].low;
    const high = upcoming.forecast[index].high;

    const spanSymbol = createElemente('span', undefined, 'symbol');
    spanSymbol.innerHTML = symbols[symbol]
    const highLow = createElemente('span', undefined, 'forecast-data');
    highLow.innerHTML = `${low}${symbols.Degree}/${high}${symbols.Degree}`
    const condition = createElemente('span', symbol, 'forecast-data');

    return [spanSymbol, highLow, condition]
}