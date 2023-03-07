
const form = document.getElementById('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  const alertMessage = `
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `;

  Swal.fire({
    title: 'Form submitted',
    text: alertMessage,
    icon: 'success',
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: 'my-button-class'
    }
  });
  form.reset();
});