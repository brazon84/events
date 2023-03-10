fetch('https://mindhub-ab35.onrender.com/api/amazing-events')
.then(response => {
  //console.log(response);
  return response.json();
})
.then(data => {

let capturedElement = document.getElementById("Upcoming");
let cards = ``;
let currentDate = data.currentDate;

for (let event of data.events) {
  if (event.date >= currentDate) {
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


// let buttons = document.querySelectorAll('.button_details');
// for (let i = 0; i < buttons.length; i++) {
//   let button = buttons[i];
//   let eventId = button.getAttribute('data-event-id');
//   button.addEventListener('click', function () {
//     window.location.href = `../assets/details.html?eventId=${eventId}`;
//   });
// }


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
  checkbox.addEventListener('click', function () {
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
      return event.date >= currentDate;
    });

    let cards = '';
    for (let event of visibleEvents) {
      let cardTemplate = `
      <div class="card bg-danger text-center" style="width: 25rem;">
      <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
      <div class="card-body">
        <h2 class="card-title">${event.name}</h2>
        <a href="../assets/details.html?eventId=${event.id}" data-event-id="${event.id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
      </div>
    </div>`;
      cards = cards + cardTemplate;
    }
    capturedElement.innerHTML = cards;
  } else { // Mostrar eventos según categorías seleccionadas
    let visibleEvents = events.filter(event => {
      return selectedCategories.includes(event.category) && event.date >= currentDate;
    });

    let cards = '';
    for (let event of visibleEvents) {
      let cardTemplate = `
      <div class="card bg-danger text-center" style="width: 25rem;">
      <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
      <div class="card-body">
        <h2 class="card-title">${event.name}</h2>
        <a href="../assets/details.html?eventId=${event.id}" data-event-id="${event.id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
      </div>
    </div>`;
      cards = cards + cardTemplate;
    }
    capturedElement.innerHTML = cards;
  }
}

//! ***********SEARCH*************

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Función para mostrar todas las cards
function showAllEvents() {
  let cards = '';
  for (let event of data.events) {
    if (event.date >= currentDate) {
      let cardTemplate = `
      <div class="card bg-danger text-center" style="width: 25rem;">
        <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
        <div class="card-body">
          <h2 class="card-title">${event.name}</h2>
          <a href="../assets/details.html?eventId=${event.id}" data-event-id="${event.id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
        </div>
      </div>`;
      cards += cardTemplate;
    }
  }
  capturedElement.innerHTML = cards;
}

// Función para buscar eventos que coincidan con la consulta
function searchEvents(query) {
  let searchResults = '';
  if (query) {
    searchResults = data.events.filter(event => {
      const name = event.name.toLowerCase();
      return name.includes(query);
    });
  } else {
    searchResults = data.events;
  }
  let cards = '';
  for (let event of searchResults) {
    if (event.date >= currentDate) {
      let cardTemplate = `
      <div class="card bg-danger text-center" style="width: 25rem;">
        <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
        <div class="card-body">
          <h2 class="card-title">${event.name}</h2>
          <a href="../assets/details.html?eventId=${event.id}" data-event-id="${event.id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
        </div>
      </div>`;
      cards += cardTemplate;
    }
  }
  if (cards) {
    capturedElement.innerHTML = cards;
  } else {
    alert('No events found.');
  }
}

// Evento para mostrar todas las cards cuando se borra el contenido del campo de búsqueda
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) {
    showAllEvents();
  } else {
    searchEvents(query);
  }
});

// Evento para buscar eventos cuando se hace clic en el botón de búsqueda
searchButton.addEventListener('click', event => {
  event.preventDefault();
  const query = searchInput.value.toLowerCase().trim();
  searchEvents(query);
});

// Mostrar todas las cards al cargar la página
showAllEvents();

})
.catch(error => {
console.error(error);
});