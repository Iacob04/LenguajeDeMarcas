// ================================================
//  SmashZone — script.js
//  Tres funciones: Toast, Modal y Newsletter
// ================================================


// ── 1. TOAST ────────────────────────────────────
// Se llama al pulsar "Añadir al carrito"
function mostrarToast(nombre) {
  document.getElementById('toastNombre').textContent = nombre;
  const toast = bootstrap.Toast.getOrCreateInstance(
    document.getElementById('miToast'),
    { delay: 3000 }
  );
  toast.show();
}


// ── 2. MODAL ────────────────────────────────────
// Rellena los datos del producto antes de mostrarlo
function abrirModal(nombre, emoji, precio, precioAntes, desc, spec1, spec2) {
  document.getElementById('modalTitulo').textContent    = nombre;
  document.getElementById('modalEmoji').textContent     = emoji;
  document.getElementById('modalPrecio').textContent    = precio;
  document.getElementById('modalDesc').textContent      = desc;
  document.getElementById('modalSpec1').textContent     = spec1;
  document.getElementById('modalSpec2').textContent     = spec2;

  // Precio tachado: solo se muestra si existe
  const elemAntes = document.getElementById('modalPrecioAntes');
  if (precioAntes) {
    elemAntes.textContent    = precioAntes;
    elemAntes.style.display  = 'inline';
  } else {
    elemAntes.style.display  = 'none';
  }

  // El botón "Añadir" del modal también lanza el toast
  document.getElementById('modalBtnAnadir').onclick = function () {
    mostrarToast(nombre);
  };
}


// ── 3. VALIDACIÓN NEWSLETTER ────────────────────
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('formNewsletter');

  // Validar al hacer submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const campos = form.querySelectorAll('input');
    let todoOk = true;

    campos.forEach(function (campo) {
      if (campo.checkValidity()) {
        campo.classList.add('is-valid');
        campo.classList.remove('is-invalid');
      } else {
        campo.classList.add('is-invalid');
        campo.classList.remove('is-valid');
        todoOk = false;
      }
    });

    // Mostrar alert de éxito o error
    document.getElementById('alertOk').style.display  = todoOk ? 'block' : 'none';
    document.getElementById('alertErr').style.display = todoOk ? 'none'  : 'block';

    if (todoOk) {
      form.reset();
      campos.forEach(c => c.classList.remove('is-valid'));
    }
  });

  // Validar campo a campo mientras el usuario escribe
  form.querySelectorAll('input').forEach(function (campo) {
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
