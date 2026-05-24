// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
// getElementById busca el elemento HTML que tenga ese id y lo guarda en una variable
// Así no tenemos que buscarlo cada vez que lo necesitemos
const nameInput   = document.getElementById("product-name");  // input de texto: nombre del producto
const priceInput  = document.getElementById("product-price"); // input numérico: precio del producto
const addBtn      = document.getElementById("add-btn");       // botón "Añadir"
const errorMsg    = document.getElementById("error-msg");     // párrafo donde mostramos errores
const productList = document.getElementById("product-list");  // <ul> donde se añaden los productos
const totalSpan   = document.getElementById("total");         // <span> que muestra el total acumulado

// ── EVENTO: AÑADIR PRODUCTO ───────────────────────────────────────────────────
// addEventListener("click", función) ejecuta la función cada vez que se pulsa el botón
addBtn.addEventListener("click", function () {

    // .value lee el texto que el usuario escribió en el input
    // .trim() elimina los espacios en blanco del principio y del final
    const name  = nameInput.value.trim();

    // parseFloat convierte el string del input ("12.50") al número decimal 12.5
    const price = parseFloat(priceInput.value);

    // ── VALIDACIONES ──────────────────────────────────────────────────────────
    // Se comprueban los datos antes de hacer nada con ellos
    // Si hay un error: se muestra el mensaje y se usa "return" para CORTAR la función aquí
    // "return" sin valor simplemente sale de la función, no sigue ejecutando lo de abajo

    // Validación 1: el nombre no puede estar vacío
    if (name === "") {
        errorMsg.textContent = "El nombre del producto no puede estar vacío.";
        return; // sale de la función — no se añade ningún producto
    }

    // Validación 2: el nombre debe tener al menos 3 caracteres
    // .length devuelve el número de caracteres del string
    if (name.length < 3) {
        errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    }

    // Validación 3: el precio debe ser un número válido y mayor que 0
    // isNaN(x) devuelve true si x NO es un número ("not a number")
    // parseFloat("hola") → NaN → isNaN(NaN) → true
    if (isNaN(price) || price <= 0) {
        errorMsg.textContent = "El precio debe ser un número mayor que 0.";
        return;
    }

    // ── SIN ERRORES ───────────────────────────────────────────────────────────
    // Si llegamos aquí es porque todas las validaciones pasaron
    // Limpiamos el mensaje de error por si quedó uno de antes
    errorMsg.textContent = "";

    // ── CREAR EL ELEMENTO <li> ────────────────────────────────────────────────
    // createElement("li") crea un <li> nuevo pero aún NO está en la página
    const li = document.createElement("li");

    // dataset permite guardar datos personalizados en el elemento HTML
    // li.dataset.price = 12.5 añade el atributo data-price="12.5" al <li>
    // Lo usamos después en actualizarTotal() para leer el precio sin parsear el texto
    li.dataset.price = price;

    // Creamos un <span> para mostrar el texto "nombre — precio€"
    const textoSpan = document.createElement("span");
    // .toFixed(2) redondea a 2 decimales y devuelve un string → 12.5 → "12.50"
    textoSpan.textContent = name + " — " + price.toFixed(2) + "€";
    li.appendChild(textoSpan); // añadimos el span DENTRO del li

    // ── BOTÓN ELIMINAR ────────────────────────────────────────────────────────
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    // Añadimos el listener del botón eliminar AQUÍ dentro (listener anidado)
    // Gracias al CLOSURE, esta función "recuerda" el li de arriba aunque
    // el listener del addBtn ya haya terminado de ejecutarse
    // → cada botón elimina SOLO su propio li, no otros
    deleteBtn.addEventListener("click", function () {
        li.remove();          // elimina este <li> del DOM completamente
        actualizarTotal();    // recalcula el total después de eliminar
    });

    li.appendChild(deleteBtn);       // añadimos el botón DENTRO del li
    productList.appendChild(li);     // añadimos el li a la lista <ul> del HTML

    // ── LIMPIAR CAMPOS ────────────────────────────────────────────────────────
    nameInput.value  = "";   // vaciamos el input de nombre
    priceInput.value = "";   // vaciamos el input de precio
    nameInput.focus();       // devolvemos el cursor al primer campo

    actualizarTotal(); // recalculamos el total después de añadir
});

// ── FUNCIÓN: ACTUALIZAR TOTAL ─────────────────────────────────────────────────
// Esta función se llama tanto al AÑADIR como al ELIMINAR un producto
// Recorre todos los <li> que haya en la lista y suma sus precios
function actualizarTotal() {

    // querySelectorAll devuelve TODOS los <li> que hay dentro de #product-list
    // como una NodeList (parecida a un array, se puede recorrer con forEach)
    const items = document.querySelectorAll("#product-list li");

    let total = 0; // acumulador que empieza en 0

    // forEach recorre cada elemento li de la lista
    items.forEach(function (li) {
        // parseFloat convierte el string del dataset ("12.50") al número 12.5
        // y lo suma al acumulador total
        total += parseFloat(li.dataset.price);
    });

    // Mostramos el total con 2 decimales en el <span>
    totalSpan.textContent = total.toFixed(2);
}
