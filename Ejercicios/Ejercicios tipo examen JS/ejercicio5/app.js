const taskInput    = document.getElementById("task-input");
const addBtn       = document.getElementById("add-btn");
const errorMsg     = document.getElementById("error-msg");
const taskList     = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");
const filterAll    = document.getElementById("filter-all");
const filterPend   = document.getElementById("filter-pending");
const filterDone   = document.getElementById("filter-done");

let filtroActivo = "todas";

// ── AÑADIR TAREA ──────────────────────────────────────────────
addBtn.addEventListener("click", function () {
    const valor = taskInput.value.trim();

    if (valor === "") {
        errorMsg.textContent = "La tarea no puede estar vacía.";
        return;
    }
    if (valor.length < 3) {
        errorMsg.textContent = "La tarea debe tener al menos 3 caracteres.";
        return;
    }

    errorMsg.textContent = "";

    // Crear li
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type  = "checkbox";
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            li.classList.add("completada");
        } else {
            li.classList.remove("completada");
        }
        aplicarFiltro();
        actualizarContador();
    });

    // Texto
    const textoSpan = document.createElement("span");
    textoSpan.classList.add("tarea-texto");
    textoSpan.textContent = valor;

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        actualizarContador();
    });

    li.appendChild(checkbox);
    li.appendChild(textoSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();

    aplicarFiltro();
    actualizarContador();
});

// ── FILTROS ───────────────────────────────────────────────────
filterAll.addEventListener("click", function () {
    filtroActivo = "todas";
    marcarBotonActivo(filterAll);
    aplicarFiltro();
});

filterPend.addEventListener("click", function () {
    filtroActivo = "pendientes";
    marcarBotonActivo(filterPend);
    aplicarFiltro();
});

filterDone.addEventListener("click", function () {
    filtroActivo = "completadas";
    marcarBotonActivo(filterDone);
    aplicarFiltro();
});

function marcarBotonActivo(btn) {
    filterAll.classList.remove("activo");
    filterPend.classList.remove("activo");
    filterDone.classList.remove("activo");
    btn.classList.add("activo");
}

function aplicarFiltro() {
    const items = document.querySelectorAll("#task-list li");
    items.forEach(function (li) {
        const completada = li.classList.contains("completada");
        if (filtroActivo === "todas") {
            li.style.display = "flex";
        } else if (filtroActivo === "pendientes") {
            li.style.display = completada ? "none" : "flex";
        } else if (filtroActivo === "completadas") {
            li.style.display = completada ? "flex" : "none";
        }
    });
}

function actualizarContador() {
    const items = document.querySelectorAll("#task-list li");
    let pendientes = 0;
    items.forEach(function (li) {
        if (!li.classList.contains("completada")) {
            pendientes++;
        }
    });
    pendingCount.textContent = pendientes;
}
