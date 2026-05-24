const searchInput = document.getElementById("search-input");
const clearBtn    = document.getElementById("clear-btn");
const itemList    = document.getElementById("item-list");
const countSpan   = document.getElementById("count");
const noResults   = document.getElementById("no-results");

// Elementos predefinidos
const elementos = [
    "Manzana", "Banana", "Cereza", "Dátil",
    "Frambuesa", "Kiwi", "Lima", "Mango",
    "Naranja", "Pera", "Sandía", "Uva"
];

// Cargar lista al inicio
elementos.forEach(function (nombre) {
    const li = document.createElement("li");
    li.textContent = nombre;
    itemList.appendChild(li);
});

actualizarContador();

// Filtrado en tiempo real
searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    const items = document.querySelectorAll("#item-list li");

    items.forEach(function (li) {
        const coincide = li.textContent.toLowerCase().includes(query);
        li.style.display = coincide ? "list-item" : "none";
    });

    actualizarContador();
});

// Botón limpiar
clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    const items = document.querySelectorAll("#item-list li");
    items.forEach(function (li) {
        li.style.display = "list-item";
    });
    actualizarContador();
    searchInput.focus();
});

function actualizarContador() {
    const items   = document.querySelectorAll("#item-list li");
    let visibles  = 0;
    items.forEach(function (li) {
        if (li.style.display !== "none") {
            visibles++;
        }
    });
    countSpan.textContent    = visibles;
    noResults.style.display  = visibles === 0 ? "block" : "none";
}
