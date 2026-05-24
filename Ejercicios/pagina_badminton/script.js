 // ============================================================
//  SmashZone – script.js
//  Lógica visual: Toast, Modal y validación del formulario
// ============================================================


// ── 1. TOAST – Mostrar notificación al añadir producto ──────
function mostrarToast(nombreProducto) {
  // Ponemos el nombre del producto en el toast
  document.getElementById('toastNombreProducto').textContent = nombreProducto;

  // Obtenemos o creamos la instancia del toast de Bootstrap
  const elementoToast = document.getElementById('toastCarrito');
  const instanciaToast = bootstrap.Toast.getOrCreateInstance(elementoToast, {
    delay: 3500  // Se cierra solo a los 3.5 segundos
  });

  instanciaToast.show();
}


// ── 2. MODAL – Rellenar datos antes de mostrar ──────────────
function abrirModal(nombre, emoji, precio, precioAntiguo, spec1, spec2, spec3, spec4) {
  // Rellenamos los datos del producto en el modal
  document.getElementById('modalNombre').textContent  = nombre;
  document.getElementById('modalEmoji').textContent   = emoji;
  document.getElementById('modalPrecio').textContent  = precio;
  document.getElementById('modalTitulo').textContent  = nombre;

  // Solo mostramos el precio antiguo si no es un guion
  const elemPrecioAntiguo = document.getElementById('modalPrecioAntiguo');
  elemPrecioAntiguo.textContent = (precioAntiguo !== '-') ? precioAntiguo : '';

  // Rellenamos las especificaciones
  document.getElementById('spec1').textContent = spec1;
  document.getElementById('spec2').textContent = spec2;
  document.getElementById('spec3').textContent = spec3;
  document.getElementById('spec4').textContent = spec4;

  // El botón "Añadir" dentro del modal también lanza el toast
  document.getElementById('modalBtnAnadir').onclick = function () {
    mostrarToast(nombre);
  };
}


// ── 3. FORMULARIO NEWSLETTER – Validación ──────────────────
document.addEventListener('DOMContentLoaded', function () {

  const formulario = document.getElementById('formularioNewsletter');

  // Al hacer submit validamos todos los campos
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();  // Evitamos que recargue la página

    const campos = formulario.querySelectorAll('input');
    let todoValido = true;

    campos.forEach(function (campo) {
      if (campo.checkValidity()) {
        campo.classList.add('is-valid');
        campo.classList.remove('is-invalid');
      } else {
        campo.classList.add('is-invalid');
        campo.classList.remove('is-valid');
        todoValido = false;
      }
    });

    // Mostramos el alert correspondiente
    const alertExito = document.getElementById('alertExito');
    const alertError = document.getElementById('alertError');

    if (todoValido) {
      alertExito.style.display = 'block';
      alertError.style.display = 'none';

      // Limpiamos el formulario y quitamos las clases de validación
      formulario.reset();
      campos.forEach(function (campo) {
        campo.classList.remove('is-valid', 'is-invalid');
      });
    } else {
      alertError.style.display = 'block';
      alertExito.style.display = 'none';
    }
  });

  // Validación en tiempo real campo por campo (mientras el usuario escribe)
  const campos = formulario.querySelectorAll('input');
  campos.forEach(function (campo) {
    campo.addEventListener('input', function () {
      if (this.checkValidity()) {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
      } else {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
      }
    });
  });

});
