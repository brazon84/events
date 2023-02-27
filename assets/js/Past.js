import { data } from './data.js'

const eventsWithAssistance = data.events.filter(event => event.assistance);

const pastEvents = document.getElementById('assistances-container')

const eventsWithAssistanceHTML = eventsWithAssistance.map(event => `
<div class="cards">
<div>
    <a href="/assets/Details.html">
        <img src="${event.image}" alt="${event.name}">
    </a>
</div>
<h2>
${event.name}
</h2>
<h3>
${event.description}
</h3>
<div class="price">
    <div>
        <p>
       $ ${event.price}
        </p>
    </div>
    <div>
        <input class="submit_price" type="submit" value="submit">
    </div>
</div>
</div>
 `).join('');

pastEvents.innerHTML = eventsWithAssistanceHTML;