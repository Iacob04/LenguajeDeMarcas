// ======================================================
//  O'CLOCK — script.js
//  Solo: Toast visual + Modal + Validación Newsletter.
//  NO hay lógica de carrito (el enunciado no lo requiere).
// ======================================================


// ── Toast ──────────────────────────────────────────────
function mostrarToast(nombre) {
  document.getElementById('toastProducto').textContent = nombre;
  bootstrap.Toast.getOrCreateInstance(
    document.getElementById('miToast'),
    { delay: 3000 }
  ).show();
}


// ── Modal: rellenar datos del producto ─────────────────
function abrirModal(nombre, precio, precioAntes, descripcion, ref, imgSrc) {
  document.getElementById('modalTitulo').textContent  = nombre;
  document.getElementById('modalNombre').textContent  = nombre;
  document.getElementById('modalPrecio').textContent  = precio + ' €';
  document.getElementById('modalDesc').textContent    = descripcion;
  document.getElementById('modalRef').textContent     = ref;

  const imgEl = document.getElementById('modalImg');
  imgEl.src = imgSrc;
  imgEl.alt = nombre;
  imgEl.onerror = function () {
    this.src = 'https://placehold.co/600x400/0d0d0d/c9a84c?text=' +
               encodeURIComponent(nombre);
  };

  const antes = document.getElementById('modalPrecioAntes');
  if (precioAntes) {
    antes.textContent    = precioAntes + ' €';
    antes.style.display  = 'inline';
  } else {
    antes.style.display  = 'none';
  }

  document.getElementById('modalBtnAnadir').onclick = function () {
    mostrarToast(nombre);
  };
}


// ── Validación Newsletter ──────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('formNewsletter');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const campos = form.querySelectorAll('input');
    let ok = true;

    campos.forEach(function (c) {
      if (c.checkValidity()) {
        c.classList.add('is-valid');
        c.classList.remove('is-invalid');
      } else {
        c.classList.add('is-invalid');
        c.classList.remove('is-valid');
        ok = false;
      }
    });

    document.getElementById('alertOk').style.display  = ok ? 'block' : 'none';
    document.getElementById('alertErr').style.display = ok ? 'none'  : 'block';

    if (ok) {
      form.reset();
      campos.forEach(c => c.classList.remove('is-valid'));
    }
  });

  form.querySelectorAll('input').forEach(function (c) {
    c.addEventListener('input', function () {
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
