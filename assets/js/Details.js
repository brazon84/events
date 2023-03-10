fetch('https://mindhub-ab35.onrender.com/api/amazing-events')
.then(response => {
  //console.log(response);
  return response.json();
})
.then(data => {
// Selecciona el botón de navegación
const navbarToggler = document.querySelector('.navbar-toggler');

// Selecciona el elemento que contiene el menú de navegación
const navbarCollapse = document.querySelector('#navbarSupportedContent');

// Añade un evento de click al botón de navegación
navbarToggler.addEventListener('click', function() {
  // Añade o quita la clase "show" del elemento que contiene el menú de navegación
  navbarCollapse.classList.toggle('show');
});


function renderDetails(event) {
  return `
  <div class="card bg-danger text-center" style="width: 25rem;">
  <img src="${event.image}" class="card-img-top  border rounded" alt="${event.name}">
  <div class="card-body">
  <h1>Titulo</h1>
    <h2 class="card-title">${event.name}</h2>
    <h2> Descripcion</h2>
    <h3>${event.description}</h3>
    <h3>Price</h3>
    <h4>$ ${event.price}</h4>
    <a href="../index.html" class="btn btn-outline-primary btn-lg button_details">Home</a>
  </div>
</div>
  `;
}
function printDetails() {
  const currentEvent = getCurrentEvent();
  const container = document.querySelector('#details');
  const cardHTML = renderDetails(currentEvent[0]);
  container.innerHTML = cardHTML;
}

function getCurrentEvent() {
  let eventName = new URLSearchParams(window.location.search).get("eventId");
  let event = data.events.filter(e => e.id == eventName);
  return event;
}
printDetails();

})
.catch(error => {
console.error(error);
});