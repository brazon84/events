import { data } from "./data.js";
// Filtrar los eventos que tienen la propiedad "assistance"
//const eventsWithAssistance = data.events.filter(event => event.assistance);

// Filtrar los eventos que tienen la propiedad "estimate"
const eventsWithEstimate = data.events.filter(event => event.estimate);

const container = document.getElementById('events-container');
//const pastEvents = document.getElementById('assistances-container')

// Crear una matriz de elementos HTML para los eventos con "assistance"
// const eventsWithAssistanceHTML = eventsWithAssistance.map(event => `
//   <div class="event-card">
//     <img src="${event.image}" alt="${event.name}" class="event-image">
//     <h2 class="event-title">${event.name}</h2>
//     <p class="event-description">${event.description}</p>
//     <p class="event-price">$${event.price}</p>
//     <button class="buy-button">Buy</button>
//   </div>
// `).join('');

// Crear una matriz de elementos HTML para los eventos con "estimate"
const eventsWithEstimateHTML = eventsWithEstimate.map(event => `
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

// Insertar la matriz de eventos con "assistance" en el DOM
//pastEvents.innerHTML = eventsWithAssistanceHTML;

// Insertar la matriz de eventos con "estimate" en el DOM
container.innerHTML += eventsWithEstimateHTML;