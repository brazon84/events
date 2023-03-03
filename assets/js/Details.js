import { data } from './data.js'

let query = location.search;
let params = new URLSearchParams(query);
let eventIndex = parseInt(params.get('eventIndex'));

let event = data.events[eventIndex];

function defineDetails(event) {
    return `
    <div class="img_details">
      <img src="${event.image}" alt="${event.name}">
    </div>
    <div class="title_details">
      <h2>${event.name}</h2>
      <br>
      <p>${event.description}</p>
      <br>
      <p>${event.category}</p>
      <br>
      <p>${event.place}</p>
    </div>
  `;
}

let container = document.getElementById('details');
let details = defineDetails(event);
container.innerHTML = details;

console.log(data);