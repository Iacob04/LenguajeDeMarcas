// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
const wordInput = document.getElementById("word-input"); // input de texto donde se escribe la palabra
const addBtn    = document.getElementById("add-btn");    // botón "Añadir"
const errorMsg  = document.getElementById("error-msg"); // <p> para mensajes de error
const wordList  = document.getElementById("word-list"); // <ul> de la lista de palabras
const wordCount = document.getElementById("word-count");// <span> que muestra cuántas palabras hay
const sortBtn   = document.getElementById("sort-btn");  // botón "Ordenar A-Z"
const dupBtn    = document.getElementById("dup-btn");   // botón "Buscar duplicados"

// ── EVENTO: AÑADIR PALABRA ────────────────────────────────────────────────────
addBtn.addEventListener("click", function () {

    // .trim() elimina espacios del principio y del final
    const valor = wordInput.value.trim();

    // Validación 1: campo vacío
    if (valor === "") {
        errorMsg.textContent = "La palabra no puede estar vacía.";
        return; // sale de la función sin añadir nada
    }

    // Validación 2: mínimo 2 caracteres
    if (valor.length < 2) {
        errorMsg.textContent = "La palabra debe tener al menos 2 caracteres.";
        return;
    }

    // Validación 3: no permitir palabras duplicadas
    // Recorremos todos los <li> existentes y comparamos su dataset.word con el valor nuevo
    const items = document.querySelectorAll("#word-list li");
    let existe = false; // bandera → empezamos asumiendo que no existe

    items.forEach(function (li) {
        // Comparamos en minúsculas para que "Manzana" y "manzana" sean la misma
        // li.dataset.word ya está en minúsculas (lo guardamos así al crearlo)
        if (li.dataset.word === valor.toLowerCase()) {
            existe = true; // encontramos un duplicado → marcamos la bandera
        }
    });

    if (existe) {
        errorMsg.textContent = "Esa palabra ya está en la lista.";
        return; // salimos sin añadir el duplicado
    }

    // Sin errores → limpiamos el mensaje de error
    errorMsg.textContent = "";

    // ── CREAR EL <li> ─────────────────────────────────────────────────────────
    const li = document.createElement("li");

    // Guardamos la palabra en MINÚSCULAS en dataset para poder comparar después
    // sin distinguir entre mayúsculas y minúsculas (case-insensitive)
    // El texto visible puede ser "Manzana" pero dataset.word será "manzana"
    li.dataset.word = valor.toLowerCase();

    // El span muestra la palabra tal como la escribió el usuario (con mayúsculas originales)
    const textoSpan = document.createElement("span");
    textoSpan.textContent = valor;
    li.appendChild(textoSpan);

    // ── BOTÓN ELIMINAR ────────────────────────────────────────────────────────
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    // CLOSURE: recuerda su propio li
    deleteBtn.addEventListener("click", function () {
        li.remove();
        actualizarContador();
    });

    li.appendChild(deleteBtn);
    wordList.appendChild(li);

    // Limpiar y preparar para la siguiente palabra
    wordInput.value = "";
    wordInput.focus();
    actualizarContador(); // actualizar el total de palabras
});

// ── EVENTO: ORDENAR A-Z ───────────────────────────────────────────────────────
sortBtn.addEventListener("click", function () {

    // querySelectorAll devuelve una NodeList, que NO tiene método .sort()
    // Usamos el spread operator [...] para convertirla en un Array normal
    const items = [...document.querySelectorAll("#word-list li")];

    // .sort(función comparadora) ordena el array
    // La función recibe dos elementos (a, b) y debe devolver:
    //   número negativo → a va ANTES que b
    //   número positivo → b va ANTES que a
    //   0 → son iguales, no importa el orden
    items.sort(function (a, b) {
        if (a.dataset.word < b.dataset.word) { return -1; } // a va antes (orden alfabético)
        if (a.dataset.word > b.dataset.word) { return 1; }  // b va antes
        return 0;                                            // iguales
    });

    // Volvemos a insertar los li en el nuevo orden
    // CLAVE: si un elemento ya está en el DOM y usamos appendChild, lo MUEVE (no lo duplica)
    // Esto es lo que reordena la lista visualmente
    items.forEach(function (li) {
        wordList.appendChild(li); // mueve cada li al final → queda en orden
    });
});

// ── EVENTO: BUSCAR DUPLICADOS (por raíz) ─────────────────────────────────────
// Marca en rojo las palabras que comparten los primeros 4 caracteres (misma "raíz")
// Ejemplo: "cantar" y "cantante" comparten "cant" → se marcan como duplicadas
dupBtn.addEventListener("click", function () {
    const items = [...document.querySelectorAll("#word-list li")];

    // Primero quitamos la clase "duplicada" de TODOS los li (resetear el estado anterior)
    items.forEach(function (li) {
        li.classList.remove("duplicada");
    });

    // Comparamos cada palabra con todas las demás
    // forEach con índice: la función recibe el elemento Y su posición en el array
    items.forEach(function (liA, i) {
        // .substring(0, 4) extrae los primeros 4 caracteres del string
        // "manzana" → "manz" | "mantequilla" → "mant"
        const raizA = liA.dataset.word.substring(0, 4);

        items.forEach(function (liB, j) {
            // i !== j evita comparar un elemento CONSIGO MISMO
            if (i !== j) {
                const raizB = liB.dataset.word.substring(0, 4);
                // Si las raíces son iguales → ambas palabras son "duplicadas"
                if (raizA === raizB) {
                    liA.classList.add("duplicada"); // marcar A
                    liB.classList.add("duplicada"); // marcar B
                }
            }
        });
    });
});

// ── FUNCIÓN: ACTUALIZAR CONTADOR ──────────────────────────────────────────────
// Cuenta cuántos <li> hay en la lista y actualiza el <span>
function actualizarContador() {
    const items = document.querySelectorAll("#word-list li");
    // .length devuelve el número de elementos en la NodeList
    wordCount.textContent = items.length;
}
