import { data } from './data.js';


let capturedElement = document.getElementById("Past");

let cards = ``;

let currentDate = data.currentDate;

for (let event of data.events) {
    if (event.date < currentDate) {
        let cardTemplate = `
        <div class="card bg-danger text-center" style="width: 25rem;">
        <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
        <div class="card-body">
          <h2 class="card-title">${event.name}</h2>
          <a href="../assets/details.html?eventId=${event._id}" data-event-id="${event._id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
        </div>
      </div>`;
        cards = cards + cardTemplate;
    }
}

capturedElement.innerHTML = cards;

let buttons = document.querySelectorAll('.button_details');
for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  let eventId = button.getAttribute('data-event-id');
  button.addEventListener('click', function () {
    window.location.href = `../assets/details.html?eventId=${eventId}`;
  });
}

let capturedCategories = document.getElementById("category");
let categoryElements = ``;
let categoryExist = [];

for (let objectEvent of data.events) {
  if (
    categoryExist.findIndex((cat) => {
      return cat == objectEvent.category;
    }) < 0
  ) {
    categoryExist.push(objectEvent.category);
  }
}

categoryExist = categoryExist.sort();

for (let i = 0; i < categoryExist.length; i++) {
  categoryElements =
    categoryElements +
    `
    <div class="categori_checkbox">
                <div class="check">
                    <input type="checkbox" id="${categoryExist[i]}" name="category" value="${categoryExist[i]}">
                    <label for="${categoryExist[i]}">${categoryExist[i]}</label>
                </div>
            </div>`;
}

capturedCategories.innerHTML = categoryElements;


let checkboxes = document.querySelectorAll('input[type=checkbox]');

for (let checkbox of checkboxes) {
  checkbox.addEventListener('click', function() {
    let selectedCategories = getSelectedCategories();
    updateView(selectedCategories);
  });
}

function getSelectedCategories() {
  let selectedCategories = [];
  let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  for (let checkbox of checkboxes) {
    selectedCategories.push(checkbox.value);
  }
  return selectedCategories;
}

function updateView(selectedCategories) {
  let events = data.events;
  let currentDate = data.currentDate;

  if (selectedCategories.length === 0) { // Si no hay categorías seleccionadas, mostrar todos los eventos de la página actual
    let visibleEvents = events.filter(event => {
      return event.date < currentDate;
    });

    let cards = '';
    for (let event of visibleEvents) {
      let cardTemplate = `
      <div class="card bg-danger text-center" style="width: 25rem;">
      <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
      <div class="card-body">
        <h2 class="card-title">${event.name}</h2>
        <a href="../assets/details.html?eventId=${event._id}" data-event-id="${event._id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
      </div>
    </div>`;
      cards = cards + cardTemplate;
    }
    capturedElement.innerHTML = cards;
  } else { // Mostrar eventos según categorías seleccionadas
    let visibleEvents = events.filter(event => {
      return selectedCategories.includes(event.category) && event.date < currentDate;
    });

    let cards = '';
    for (let event of visibleEvents) {
      let cardTemplate = `
      <div class="card bg-danger text-center" style="width: 25rem;">
      <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
      <div class="card-body">
        <h2 class="card-title">${event.name}</h2>
        <a href="../assets/details.html?eventId=${event._id}" data-event-id="${event._id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
      </div>
    </div>`;
      cards = cards + cardTemplate;
    }
    capturedElement.innerHTML = cards;
  }
}


//! ***********SEARCH*************



const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');


// Evento para buscar eventos al hacer clic en el botón de búsqueda
searchButton.addEventListener('click', function (event) {
  event.preventDefault(); // Evita que se recargue la página
  const query = searchInput.value.toLowerCase().trim();

  if (query.length === 0) {
    showAllEvents();
    return;
  }

  const searchResults = data.events.filter(function (event) {
    return event.name.toLowerCase().includes(query);
  });

  if (searchResults.length === 0) {
    alert('No events found.');
    capturedElement.innerHTML = '';
    showAllEvents();
  } else {
    const cards = searchResults.map(function (event) {
      return `
        <div class="card bg-danger text-center" style="width: 25rem;">
          <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
          <div class="card-body">
            <h2 class="card-title">${event.name}</h2>
            <a href="../assets/details.html?eventId=${event._id}" data-event-id="${event._id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
          </div>
        </div>
      `;
    }).join('');

    capturedElement.innerHTML = cards;

  }
});

// Evento para mostrar todas las cards cuando se borra el contenido del campo de búsqueda
searchInput.addEventListener('input', function () {
  if (this.value.length === 0) {
    showAllEvents();
  }
});

// Función para mostrar todas las cards
function showAllEvents() {
  const cards = data.events.map(function (event) {
    return `
      <div class="card bg-danger text-center" style="width: 25rem;">
        <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
        <div class="card-body">
          <h2 class="card-title">${event.name}</h2>
          <a href="../assets/details.html?eventId=${event._id}" data-event-id="${event._id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
        </div>
      </div>
    `;
  }).join('');

  capturedElement.innerHTML = cards;

}
