// O'CLOCK — script.js

let carrito = [];

/* ── CARRITO ───────────────────────────────────── */
function agregarAlCarrito(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  _actualizarBadge();
  _renderizarCarrito();
  mostrarToast(nombre);
}

function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(p => p.nombre !== nombre);
  _actualizarBadge();
  _renderizarCarrito();
}

function _actualizarBadge() {
  const total = carrito.reduce((s, p) => s + p.cantidad, 0);
  const badge = document.getElementById('carritoBadge');
  badge.textContent = total;
  badge.classList.toggle('activo', total > 0);
}

function _renderizarCarrito() {
  const lista   = document.getElementById('carritoLista');
  const vacio   = document.getElementById('carritoVacio');
  const totalEl = document.getElementById('carritoTotal');

  if (carrito.length === 0) {
    lista.innerHTML = '';
    vacio.style.display = 'block';
    totalEl.textContent = '0 €';
    return;
  }

  vacio.style.display = 'none';
  lista.innerHTML = carrito.map(p => `
    <div class="oc-carrito-item">
      <div class="oc-carrito-item-info">
        <p>${p.nombre}</p>
        <small>${p.precio} € &times; ${p.cantidad}</small>
      </div>
      <span class="oc-carrito-item-precio">${(p.precio * p.cantidad).toFixed(0)} €</span>
      <button class="oc-btn-eliminar" onclick="eliminarDelCarrito('${p.nombre}')" aria-label="Eliminar">&times;</button>
    </div>
  `).join('');

  const total = carrito.reduce((s, p) => s + p.precio * p.cantidad, 0);
  totalEl.textContent = total.toFixed(0) + ' €';
}

/* ── TOAST ─────────────────────────────────────── */
function mostrarToast(nombre) {
  document.getElementById('toastNombre').textContent = nombre;
  bootstrap.Toast.getOrCreateInstance(
    document.getElementById('miToast'), { delay: 3200 }
  ).show();
}

/* ── MODAL PRODUCTO ────────────────────────────── */
function abrirModal(nombre, precio, precioAntes, desc, ref, garantia, imgSrc, emoji) {
  document.getElementById('modalTitulo').textContent = nombre;
  document.getElementById('modalNombre').textContent = nombre;
  document.getElementById('modalPrecio').textContent = precio + ' €';
  document.getElementById('modalDesc').textContent   = desc;
  document.getElementById('modalRef').textContent    = ref;
  document.getElementById('modalGarantia').textContent = garantia;

  const elAntes = document.getElementById('modalPrecioAntes');
  elAntes.textContent    = precioAntes ? precioAntes + ' €' : '';
  elAntes.style.display  = precioAntes ? 'inline' : 'none';

  const img         = document.getElementById('modalImagen');
  const placeholder = document.getElementById('modalPlaceholder');
  if (imgSrc) {
    img.src               = imgSrc;
    img.style.display     = 'block';
    placeholder.style.display = 'none';
  } else {
    img.style.display         = 'none';
    placeholder.textContent   = emoji || '⌚';
    placeholder.style.display = 'flex';
  }

  document.getElementById('modalBtnAnadir').onclick = function () {
    agregarAlCarrito(nombre, precio);
    bootstrap.Modal.getInstance(document.getElementById('modalProducto')).hide();
  };
}

/* ── NEWSLETTER ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formNewsletter');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const campos = form.querySelectorAll('input');
    let ok = true;

    campos.forEach(c => {
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

  form.querySelectorAll('input').forEach(c => {
    c.addEventListener('input', function () {
      this.classList.toggle('is-valid',   this.checkValidity());
      this.classList.toggle('is-invalid', !this.checkValidity());
    });
  });
});
