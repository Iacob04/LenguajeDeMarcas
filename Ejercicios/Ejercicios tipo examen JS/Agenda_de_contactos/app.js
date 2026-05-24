// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
// document.getElementById busca el elemento HTML que tenga ese id
// Lo guardamos en variables para no tener que buscarlo cada vez que lo necesitamos
const nombreContacto = document.getElementById('contact-name');  // input texto: nombre del contacto
const numeroContacto = document.getElementById('contact-phone'); // input texto: teléfono del contacto
const addBtn         = document.getElementById("add-btn");       // botón "Añadir contacto"
const errorMsg       = document.getElementById("error-msg");     // <p> para mensajes de error
const contactList    = document.getElementById("contact-list");  // <ul> donde se listan los contactos
const contactCount   = document.getElementById("contact-count"); // <span> con el total de contactos
const searchInput    = document.getElementById("search-input");  // input de búsqueda en tiempo real

// ── EVENTO: AÑADIR CONTACTO ───────────────────────────────────────────────────
// addEventListener("click", función) → ejecuta la función cada vez que se pulsa el botón
addBtn.addEventListener("click", function () {

    // ── VALIDACIÓN NOMBRE ─────────────────────────────────────────────────────
    // .value lee el texto escrito en el input
    if (nombreContacto.value === "") {
        errorMsg.textContent = "El nombre del contacto no puede estar vacío.";
        return; // "return" corta la función aquí — no sigue ejecutando lo de abajo
    }
    // .length devuelve el número de caracteres del string
    if (nombreContacto.value.length < 3) {
        errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    }

    // ── VALIDACIÓN NÚMERO ─────────────────────────────────────────────────────
    if (numeroContacto.value === "") {
        errorMsg.textContent = "El número no puede estar vacío.";
        return;
    }
    // !== 9 comprueba que la longitud sea EXACTAMENTE 9 dígitos
    // Si es menor O mayor → error
    if (numeroContacto.value.length !== 9) {
        errorMsg.textContent = "El número debe tener exactamente 9 dígitos.";
        return;
    }

    // ── SIN ERRORES ───────────────────────────────────────────────────────────
    // Si llegamos aquí todas las validaciones pasaron
    // Limpiamos el mensaje de error por si quedó uno de antes
    errorMsg.textContent = "";

    // ── CREAR EL <li> ─────────────────────────────────────────────────────────
    // createElement crea el elemento pero todavía NO está en la página
    const li = document.createElement("li");

    // dataset guarda datos personalizados en el elemento HTML
    // li.dataset.nombreContacto genera el atributo data-nombre-contacto en el HTML
    // Lo usamos después en la búsqueda para comparar el nombre sin parsear el texto visible
    li.dataset.nombreContacto = nombreContacto.value;
    li.dataset.numeroContacto = numeroContacto.value;

    // Creamos el span con el texto visible: "Ana:   +34 612345678"
    const textoSpan = document.createElement("span");
    textoSpan.textContent = nombreContacto.value + ":   " + " +34 " + numeroContacto.value;
    li.appendChild(textoSpan); // añadimos el span DENTRO del li

    // ── BOTÓN ELIMINAR ────────────────────────────────────────────────────────
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    // CLOSURE: el listener del botón Eliminar "recuerda" el li de este scope
    // aunque el listener del addBtn ya haya terminado de ejecutarse
    // → cada botón Eliminar borra solo su propio li y no otro
    deleteBtn.addEventListener("click", function () {
        li.remove();          // elimina este <li> del DOM completamente
        actualizarContador(); // recalcula el total de contactos
    });

    // Montamos el li completo y lo añadimos a la lista
    li.appendChild(deleteBtn);   // botón dentro del li
    contactList.appendChild(li); // li dentro de la <ul>
    actualizarContador();        // actualizar contador al añadir

    // ── LIMPIAR CAMPOS ────────────────────────────────────────────────────────
    nombreContacto.value = ""; // vaciamos el input de nombre
    numeroContacto.value = ""; // vaciamos el input de teléfono
    nombreContacto.focus();    // devolvemos el cursor al primer campo
});

// ── FUNCIÓN: ACTUALIZAR CONTADOR ──────────────────────────────────────────────
// Cuenta cuántos <li> hay en la lista y actualiza el <span> del total
function actualizarContador() {
    // querySelectorAll devuelve TODOS los <li> dentro de #contact-list como NodeList
    // .length devuelve cuántos hay
    const items = document.querySelectorAll("#contact-list li");
    document.getElementById("contact-count").textContent = items.length;
}

// ── EVENTO: BÚSQUEDA EN TIEMPO REAL ──────────────────────────────────────────
// El evento "input" se dispara cada vez que el usuario escribe o borra una letra
// Es más inmediato que "change" que solo se dispara al perder el foco
searchInput.addEventListener("input", function () {

    // .toLowerCase() convierte a minúsculas para buscar sin distinguir mayúsculas
    // "Ana" y "ana" serán iguales al comparar → búsqueda case-insensitive
    const query = searchInput.value.toLowerCase();

    // Obtenemos todos los contactos de la lista
    const items = document.querySelectorAll("#contact-list li");

    // Recorremos cada contacto y decidimos si mostrarlo u ocultarlo
    items.forEach(function (li) {

        // Leemos el nombre del dataset (no el texto visible con el +34 y el número)
        // así la búsqueda solo filtra por nombre, no por teléfono
        const nombre = li.dataset.nombreContacto.toLowerCase();

        // .includes(query) devuelve true si el nombre CONTIENE lo que el usuario escribió
        // Funciona en cualquier posición: "na" encuentra "Ana" y "Nadia"
        if (nombre.includes(query)) {
            li.style.display = "list-item"; // mostrar (valor display normal de un <li>)
        } else {
            li.style.display = "none";      // ocultar (el elemento sigue en el DOM, no se borra)
        }
    });
});
