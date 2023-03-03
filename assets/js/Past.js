import { data } from './data.js';


let capturedElement = document.getElementById("Past");

let cards = ``;

let currentDate = data.currentDate;

for (let event of data.events) {
    if (event.date < currentDate) {
        let cardTemplate = `
  <div class="cards">
  <div>
    <a href="./assets/Details.html" data-event-index="${event._id}">
      <img src="${event.image}" alt="${event.name}">
    </a>
  </div>
  <h2>${event.name}</h2>
  <h3>${event.description}</h3>
  <div class="price">
    <div>
      <p>$ ${event.price}</p>
    </div>
    <div>
      <input class="submit_price" type="submit" value="submit">
    </div>
  </div>
</div>`;
        cards = cards + cardTemplate;
    }
}

capturedElement.innerHTML = cards;

