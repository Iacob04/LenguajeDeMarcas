// =====================================================
//  TechGear — script.js
//  Únicamente: mostrar Toast y validar Newsletter.
//  NO hay lógica de carrito (solo visual).
// =====================================================


// ── Toast: se lanza al pulsar "Añadir al carrito" ──
function mostrarToast(nombreProducto) {
  document.getElementById('toastProducto').textContent = nombreProducto;
  bootstrap.Toast.getOrCreateInstance(
    document.getElementById('miToast'),
    { delay: 3000 }
  ).show();
}


// ── Modal: rellena los datos antes de abrirse ───────
function abrirModal(nombre, precio, descripcion, urlImagen) {
  document.getElementById('modalTitulo').textContent = nombre;
  document.getElementById('modalNombre').textContent = nombre;
  document.getElementById('modalPrecio').textContent = precio;
  document.getElementById('modalDesc').textContent   = descripcion;
  document.getElementById('modalImg').src            = urlImagen;
  document.getElementById('modalImg').alt            = nombre;

  // El botón del modal también lanza el Toast
  document.getElementById('modalBtnAnadir').onclick = function () {
    mostrarToast(nombre);
  };
}


// ── Validación del formulario Newsletter ────────────
document.addEventListener('DOMContentLoaded', function () {

  const formulario = document.getElementById('formNewsletter');

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

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

    document.getElementById('alertExito').style.display = todoValido ? 'block' : 'none';
    document.getElementById('alertError').style.display = todoValido ? 'none'  : 'block';

    if (todoValido) {
      formulario.reset();
      campos.forEach(c => c.classList.remove('is-valid'));
    }
  });

  // Validación en tiempo real campo a campo
  formulario.querySelectorAll('input').forEach(function (campo) {
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
