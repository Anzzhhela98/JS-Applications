import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../api/data.js";
import { carTemplate } from "../views/common/carTemplate.js";


const template = (cars, onSearch, year) => html `       
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value="${year||''}">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${cars.length==0 ? html`<p class="no-cars"> No results.</p>` : cars.map(carTemplate) }
        
    </div>
</section>`;

export async function searchPage(context) {
    const year = Number(context.querystring.split('=')[1]);
    const cars = Number.isNaN(year) ? [] : await search(year);
    context.render(template(cars, onSearch, year));

    function onSearch() {
        const query = document.getElementById('search-input').value;

        if(Number.isNaN(query)==false){
            context.page.redirect('/search?query='+query)
        }else{
            return alert('Year must be positive number!')
        }
    }
}