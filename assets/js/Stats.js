// Selecciona el botón de navegación
const navbarToggler = document.querySelector('.navbar-toggler');

// Selecciona el elemento que contiene el menú de navegación
const navbarCollapse = document.querySelector('#navbarSupportedContent');

// Añade un evento de click al botón de navegación
navbarToggler.addEventListener('click', function() {
  // Añade o quita la clase "show" del elemento que contiene el menú de navegación
  navbarCollapse.classList.toggle('show');
});
