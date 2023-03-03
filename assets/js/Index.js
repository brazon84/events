import {data} from '../js/data.js';

let capturedElement = document.getElementById("events-container");

let cards = ``;

for (let index in data.events) {
  let event = data.events[index];
  let cardTemplate = `
  <div class="cards">
  <div>
    <a href="./assets/Details.html" class="button_details" data-event-index="${_id}">
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

capturedElement.innerHTML = cards;

let buttons = document.querySelectorAll('.button_details');
for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  let index = parseInt(button.dataset.eventIndex);
  button.addEventListener('click', function() {
    window.location.href = `./assets/Details.html?eventName=${_id}`;
  });
}
