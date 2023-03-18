fetch('https://mindhub-ab35.onrender.com/api/amazing-events')
.then(response => {
  //console.log(response);
  return response.json();
})
.then(data => {
  let capturedElement = document.getElementById("events-container");
  
let cards = ``;

for (let index in data.events) {
  let event = data.events[index];
  let cardTemplate = `
  <div class="card bg-danger text-center" style="width: 25rem;">
  <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
  <div class="card-body">
    <h2 class="card-title">${event.name}</h2>
    <a href="../assets/details.html?eventId=${event.id}" data-event-id="${event.id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
  </div>
</div>
    `;

  cards = cards + cardTemplate;
}
capturedElement.innerHTML = cards;

let capturedCategory = document.getElementById("category");

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
    `  <div class="categori_checkbox">
                <div class="check">
                <label for="${categoryExist[i]}">${categoryExist[i]}</label>
                    <input type="checkbox" id="${categoryExist[i]}" name="category" value="${categoryExist[i]}">
                </div>
            </div>
    `;
}

capturedCategory.innerHTML = categoryElements;

let checkboxes = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', function () {
    let selectedCategories = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        selectedCategories.push(checkboxes[i].value);
      }
    }
    filterEvents(selectedCategories);
  });
}

function filterEvents(selectedCategories, query) {
  let filteredEvents = [];
  if (selectedCategories.length === 0) {
    // Si no se seleccionó ninguna categoría, mostrar todos los eventos
    filteredEvents = data.events;
  } else {
    // Filtrar los eventos por categoría
    filteredEvents = data.events.filter((event) => {
      return selectedCategories.includes(event.category);

    });
  }

  let filteredCards = '';
  for (let event of filteredEvents) {
    let cardTemplate = `
    <div class="card bg-danger text-center" style="width: 25rem;">
    <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
    <div class="card-body">
      <h2 class="card-title">${event.name}</h2>
      <a href="../assets/details.html?eventId=${event.id}" data-event-id="${event.id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
      </div>
      </div>`;
      filteredCards += cardTemplate;
  }
  capturedElement.innerHTML = filteredCards;
}

//! ****************  SEARCH   **************************

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
            <a href="../assets/details.html?eventId=${event.id}" data-event-id="${event.id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
          </div>
        </div>
      `;
    }).join('');

    capturedElement.innerHTML = cards;

  }
});

// Evento para mostrar todas las cards cuando se borra el contenido del campo de búsqueda
searchInput.addEventListener('input', function (event) {
  const query = event.target.value.trim().toLowerCase();

  // Filtrar eventos en función de la consulta
  const filteredEvents = data.events.filter((event) => {
    return event.name.toLowerCase().includes(query);
  });

// Función para mostrar todas las cards
let filteredCards = '';
  for (let event of filteredEvents) {
    let cardTemplate = `
      <div class="card bg-danger text-center" style="width: 25rem;">
        <img src="${event.image}" class="card-img-top border rounded" alt="${event.name}">
        <div class="card-body">
          <h2 class="card-title">${event.name}</h2>
          <a href="../assets/details.html?eventId=${event.id}" data-event-id="${event.id}" class="btn btn-outline-primary btn-lg button_details">Details</a>
        </div>
      </div>`;
    filteredCards += cardTemplate;
  }
  capturedElement.innerHTML = filteredCards;
});
      
      })
      .catch(error => {
      console.error(error);
      });