// ── REFERENCIAS AL DOM ────────────────────────────────────────
// Guardamos cada elemento HTML en una variable para usarlo después
// document.getElementById busca el elemento por su atributo id
const nombreContacto = document.getElementById('contact-name');
const numeroContacto = document.getElementById('contact-phone');
const addBtn         = document.getElementById("add-btn");
const errorMsg       = document.getElementById("error-msg");
const contactList    = document.getElementById("contact-list");
const contactCount   = document.getElementById("contact-count");
const searchInput    = document.getElementById("search-input");


// ── EVENTO: AÑADIR CONTACTO ───────────────────────────────────
// addEventListener escucha el evento 'click' sobre el botón
// Cada vez que se pulse, ejecuta la función
addBtn.addEventListener("click", function () {

    // ── VALIDACIÓN NOMBRE ─────────────────────────────────────
    // .value lee el texto que el usuario escribió en el input
    // .trim() eliminaría espacios — aquí no está pero es buena práctica
    if (nombreContacto.value === "") {
        errorMsg.textContent = "El nombre del contacto no puede estar vacío.";
        return; // return corta la función — no sigue ejecutando nada más
    }
    // .length devuelve el número de caracteres del string
    if (nombreContacto.value.length < 3) {
        errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    }

    // ── VALIDACIÓN NÚMERO ─────────────────────────────────────
    if (numeroContacto.value === "") {
        errorMsg.textContent = "El número no puede estar vacío.";
        return;
    }
    // !== 9 comprueba que la longitud sea exactamente 9 dígitos
    // si es menor O mayor, entra en este if y para
    if (numeroContacto.value.length !== 9) {
        errorMsg.textContent = "El número no puede ser mayor o menor a 9 DÍGITOS";
        return;
    }

    // ── SIN ERRORES ───────────────────────────────────────────
    // Si llegamos aquí es que todas las validaciones pasaron
    // Limpiamos el mensaje de error por si había uno anterior
    errorMsg.textContent = "";

    // ── CREAR EL LI ───────────────────────────────────────────
    // createElement crea un elemento HTML nuevo pero aún no está en la página
    const li = document.createElement("li");

    // dataset permite guardar datos personalizados en el elemento HTML
    // se accede después como li.dataset.nombreContacto
    // útil para recuperar el valor sin tener que parsear el texto visible
    li.dataset.nombreContacto = nombreContacto.value;
    li.dataset.numeroContacto = numeroContacto.value;

    // Creamos un span para el texto visible del contacto
    const textoSpan = document.createElement("span");
    textoSpan.textContent = nombreContacto.value + ":   " + " +34 " + numeroContacto.value;
    li.appendChild(textoSpan); // añadimos el span dentro del li

    // ── BOTÓN ELIMINAR ────────────────────────────────────────
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    // El listener del botón eliminar tiene acceso a 'li' por closure:
    // la función recuerda la variable li del scope exterior aunque
    // se ejecute más tarde — así cada botón elimina su propio li
    deleteBtn.addEventListener("click", function () {
        li.remove();           // elimina este li del DOM
        actualizarContador();  // recalcula el total tras eliminar
    });

    // Orden correcto: primero montar todo, luego añadir al DOM
    li.appendChild(deleteBtn);    // botón dentro del li
    contactList.appendChild(li);  // li dentro de la lista ul
    actualizarContador();         // actualizar contador al añadir

    // ── LIMPIAR CAMPOS ────────────────────────────────────────
    // Vaciamos los inputs para que el usuario pueda añadir otro contacto
    nombreContacto.value = "";
    numeroContacto.value = "";
    nombreContacto.focus(); // devuelve el cursor al primer campo
});


// ── FUNCIÓN: ACTUALIZAR CONTADOR ──────────────────────────────
function actualizarContador() {
    // querySelectorAll devuelve TODOS los li dentro de #contact-list
    // como una NodeList — similar a un array
    const items = document.querySelectorAll("#contact-list li");

    // .length devuelve cuántos elementos hay en la NodeList
    // lo mostramos en el span #contact-count
    document.getElementById("contact-count").textContent = items.length;
}


// ── EVENTO: BÚSQUEDA EN TIEMPO REAL ──────────────────────────
// El evento 'input' se dispara cada vez que el usuario escribe o borra
// una letra — más inmediato que 'change' que solo se dispara al perder foco
searchInput.addEventListener("input", function () {

    // toLowerCase convierte a minúsculas para comparar sin distinguir
    // mayúsculas: "Ana" y "ana" serán iguales al comparar
    const query = searchInput.value.toLowerCase();

    const items = document.querySelectorAll("#contact-list li");

    // Recorremos cada li y decidimos si mostrarlo u ocultarlo
    items.forEach(function (li) {

        // Leemos el nombre guardado en el dataset (no el texto visible)
        const nombre = li.dataset.nombreContacto.toLowerCase();

        // includes devuelve true si el string contiene la query
        // funciona aunque la query esté en medio del nombre
        if (nombre.includes(query)) {
            li.style.display = "list-item"; // mostrar (valor normal de li)
        } else {
            li.style.display = "none";      // ocultar sin eliminar del DOM
        }
    });
});