const monthNames = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};
const years = [...document.querySelectorAll('.monthCalendar')].reduce((a, c) => {
    a[c.id] = c;
    return a;
}, {});
const months = [...document.querySelectorAll('.daysCalendar')].reduce((a, c) => {
    a[c.id] = c;
    return a;
}, {});

//First Visualisation main Calendar
const calendar = document.getElementById('years');
const body = document.querySelector('body');
updateBody(calendar);

calendar.addEventListener('click', (event) => {
    if (event.target.classList.contains('date') || event.target.classList.contains('day')) {
        event.stopImmediatePropagation();
        const idYear = `year-${event.target.textContent.trim()}`;
        updateBody(years[idYear]);
    }
});

//Second Visualisation m
body.addEventListener('click', (event) => {
    if (event.target.tagName == 'CAPTION') {
        const sectionId = event.target.parentNode.parentNode.id;
        if (sectionId.includes('year-')) {
            updateBody(calendar);
        } else if (sectionId.includes('month-')) {
            const yearId = `year-${sectionId.split('-')[1]}`;
            updateBody(years[yearId]);
        }
    } else if (event.target.tagName == 'DIV' || event.target.tagName == 'TD') {
        const month = event.target.textContent.trim();

        if (monthNames.hasOwnProperty(month)) {
            console.log(event.target.parentNode);
            let parent = event.target.parentNode
            while (parent.tagName != 'TABLE') {
                parent = parent.parentNode;
            }
            const year = parent.querySelector('caption')
                .textContent.trim();
                const yearId = `month-${year}-${monthNames[month]}`;
                updateBody(months[yearId]);
        }
    }
});

function updateBody(section) {
    body.innerHTML = ''
    body.append(section);
}
console.log(Object.keys(months), Object.values(months))