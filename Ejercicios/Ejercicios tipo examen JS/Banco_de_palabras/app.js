const wordInput = document.getElementById("word-input");
const addBtn    = document.getElementById("add-btn");
const errorMsg  = document.getElementById("error-msg");
const wordList  = document.getElementById("word-list");
const wordCount = document.getElementById("word-count");
const sortBtn   = document.getElementById("sort-btn");
const dupBtn    = document.getElementById("dup-btn");

// ── AÑADIR PALABRA ────────────────────────────────────────────
addBtn.addEventListener("click", function () {
    const valor = wordInput.value.trim();

    // Validación: vacío
    if (valor === "") {
        errorMsg.textContent = "La palabra no puede estar vacía.";
        return;
    }

    // Validación: mínimo 2 caracteres
    if (valor.length < 2) {
        errorMsg.textContent = "La palabra debe tener al menos 2 caracteres.";
        return;
    }

    // Validación: duplicado exacto
    // Recorre los li existentes y compara con dataset.word
    const items = document.querySelectorAll("#word-list li");
    let existe = false;
    items.forEach(function (li) {
        if (li.dataset.word === valor.toLowerCase()) {
            existe = true;
        }
    });
    if (existe) {
        errorMsg.textContent = "Esa palabra ya está en la lista.";
        return;
    }

    // Sin errores
    errorMsg.textContent = "";

    // Crear li
    const li = document.createElement("li");

    // Guardamos la palabra en minúsculas en dataset para comparar después
    li.dataset.word = valor.toLowerCase();

    const textoSpan = document.createElement("span");
    textoSpan.textContent = valor;
    li.appendChild(textoSpan);

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        actualizarContador();
    });

    li.appendChild(deleteBtn);
    wordList.appendChild(li);

    // Limpiar
    wordInput.value = "";
    wordInput.focus();
    actualizarContador();
});

// ── ORDENAR A-Z ───────────────────────────────────────────────
sortBtn.addEventListener("click", function () {
    // Convertir NodeList a array para poder usar .sort()
    const items = [...document.querySelectorAll("#word-list li")];

    // Ordenar por dataset.word alfabéticamente
    items.sort(function (a, b) {
        if (a.dataset.word < b.dataset.word) { return -1; }
        if (a.dataset.word > b.dataset.word) { return 1; }
        return 0;
    });

    // Volver a añadir los li en el nuevo orden
    // appendChild mueve el nodo si ya está en el DOM — no lo duplica
    items.forEach(function (li) {
        wordList.appendChild(li);
    });
});

// ── BUSCAR DUPLICADOS ─────────────────────────────────────────
dupBtn.addEventListener("click", function () {
    const items = [...document.querySelectorAll("#word-list li")];

    // Primero quitamos la clase duplicada de todos
    items.forEach(function (li) {
        li.classList.remove("duplicada");
    });

    // Comparamos la raíz de 4 letras de cada palabra con el resto
    // substring(0,4) devuelve los primeros 4 caracteres
    items.forEach(function (liA, i) {
        const raizA = liA.dataset.word.substring(0, 4);

        items.forEach(function (liB, j) {
            if (i !== j) {
                const raizB = liB.dataset.word.substring(0, 4);
                if (raizA === raizB) {
                    liA.classList.add("duplicada");
                    liB.classList.add("duplicada");
                }
            }
        });
    });
});

// ── ACTUALIZAR CONTADOR ───────────────────────────────────────
function actualizarContador() {
    const items = document.querySelectorAll("#word-list li");
    wordCount.textContent = items.length;
}