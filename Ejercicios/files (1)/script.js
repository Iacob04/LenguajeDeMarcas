// =============================================
//  SmashZone - script.js
//  Funciones: Toast, Modal y validación form
// =============================================


// ── 1. TOAST ─────────────────────────────────
// Se llama al pulsar "Añadir al carrito"
function mostrarToast(nombre) {
  document.getElementById('toastNombre').textContent = nombre;

  const toastEl = document.getElementById('miToast');
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 });
  toast.show();
}


// ── 2. MODAL ─────────────────────────────────
// Rellena los datos del producto en el modal
function abrirModal(nombre, emoji, precio, precioViejo, s1, s2, s3) {
  document.getElementById('modalNombre').textContent = nombre;
  document.getElementById('modalEmoji').textContent  = emoji;
  document.getElementById('modalPrecio').textContent = precio;
  document.getElementById('mSpec1').textContent = s1;
  document.getElementById('mSpec2').textContent = s2;
  document.getElementById('mSpec3').textContent = s3;

  // Si hay precio antiguo lo mostramos, si no lo ocultamos
  const elem = document.getElementById('modalPrecioViejo');
  if (precioViejo) {
    elem.textContent = precioViejo;
    elem.style.display = 'inline';
  } else {
    elem.style.display = 'none';
  }

  // El botón de añadir dentro del modal también lanza el toast
  document.getElementById('modalBtnAnadir').onclick = function () {
    mostrarToast(nombre);
  };
}


// ── 3. VALIDACIÓN DEL FORMULARIO ─────────────
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('formNewsletter');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita recargar la página

    const campos = form.querySelectorAll('input');
    let valido = true;

    // Revisamos cada campo
    campos.forEach(function (campo) {
      if (campo.checkValidity()) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
      } else {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
        valido = false;
      }
    });

    // Mostramos el mensaje correspondiente
    document.getElementById('alertOk').style.display  = valido ? 'block' : 'none';
    document.getElementById('alertErr').style.display = valido ? 'none'  : 'block';

    if (valido) {
      form.reset();
      campos.forEach(c => c.classList.remove('is-valid'));
    }
  });

  // Validación en tiempo real (mientras el usuario escribe)
  form.querySelectorAll('input').forEach(function (campo) {
    campo.addEventListener('input', function () {
      if (this.checkValidity()) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
      }
    });
  });

});
