// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
const searchInput = document.getElementById("search-input"); // input donde el usuario escribe para buscar
const clearBtn    = document.getElementById("clear-btn");    // botón "Limpiar búsqueda"
const itemList    = document.getElementById("item-list");    // <ul> con los elementos de la lista
const countSpan   = document.getElementById("count");        // <span> que muestra cuántos elementos son visibles
const noResults   = document.getElementById("no-results");   // mensaje "Sin resultados" (oculto por defecto)

// ── DATOS INICIALES ───────────────────────────────────────────────────────────
// Array de strings con los elementos que aparecerán en la lista desde el principio
const elementos = [
    "Manzana", "Banana", "Cereza", "Dátil",
    "Frambuesa", "Kiwi", "Lima", "Mango",
    "Naranja", "Pera", "Sandía", "Uva"
];

// ── CARGAR LISTA AL INICIO ────────────────────────────────────────────────────
// forEach recorre cada elemento del array y crea un <li> por cada uno
elementos.forEach(function (nombre) {
    const li = document.createElement("li"); // crear el elemento <li>
    li.textContent = nombre;                 // escribir el nombre dentro del <li>
    itemList.appendChild(li);               // añadir el <li> a la lista <ul>
});

// Mostramos el contador inicial (12 elementos visibles al principio)
actualizarContador();

// ── EVENTO: FILTRADO EN TIEMPO REAL ──────────────────────────────────────────
// El evento "input" se dispara CADA VEZ que el usuario escribe o borra una letra
// Es más inmediato que "change", que solo se dispara al perder el foco
searchInput.addEventListener("input", function () {

    // .value.trim() lee el texto del input y elimina espacios al principio/final
    // .toLowerCase() convierte a minúsculas para buscar sin distinguir mayúsculas
    // "Manzana" y "manzana" serán iguales al comparar
    const query = searchInput.value.trim().toLowerCase();

    // Obtenemos todos los <li> que hay actualmente en la lista
    const items = document.querySelectorAll("#item-list li");

    // Recorremos cada <li> y decidimos si mostrarlo u ocultarlo
    items.forEach(function (li) {
        // .textContent lee el texto visible del <li> (ej: "Manzana")
        // .toLowerCase() lo convierte a minúsculas para comparar igual que la query
        // .includes(query) devuelve true si el texto CONTIENE lo que se buscó
        // Funciona aunque la query esté en el medio: "anz" encuentra "Manzana"
        const coincide = li.textContent.toLowerCase().includes(query);

        // Ternario: si coincide → mostrar | si no → ocultar
        // "list-item" es el valor display normal de un <li>
        li.style.display = coincide ? "list-item" : "none";
    });

    actualizarContador(); // actualizar el número de elementos visibles
});

// ── EVENTO: LIMPIAR BÚSQUEDA ──────────────────────────────────────────────────
clearBtn.addEventListener("click", function () {
    searchInput.value = ""; // vaciar el input de búsqueda

    // Volver a mostrar TODOS los <li> (quitar el filtro)
    const items = document.querySelectorAll("#item-list li");
    items.forEach(function (li) {
        li.style.display = "list-item"; // mostrar todos
    });

    actualizarContador();  // actualizar contador (volverá a ser 12)
    searchInput.focus();   // devolver el cursor al input de búsqueda
});

// ── FUNCIÓN: ACTUALIZAR CONTADOR ──────────────────────────────────────────────
// Cuenta cuántos <li> están visibles y actualiza el span del contador
// También muestra u oculta el mensaje "Sin resultados"
function actualizarContador() {
    const items = document.querySelectorAll("#item-list li");
    let visibles = 0;

    // Recorremos todos los <li> y contamos los que NO están ocultos
    items.forEach(function (li) {
        // style.display !== "none" → el elemento está visible
        if (li.style.display !== "none") {
            visibles++;
        }
    });

    // Actualizamos el número en el <span>
    countSpan.textContent = visibles;

    // Si no hay ninguno visible → mostramos el mensaje "Sin resultados"
    // Si hay al menos uno → lo ocultamos
    // Ternario: condición ? valor_si_true : valor_si_false
    noResults.style.display = visibles === 0 ? "block" : "none";
}
