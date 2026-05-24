// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
const taskInput    = document.getElementById("task-input");    // input de texto donde se escribe la tarea
const addBtn       = document.getElementById("add-btn");       // botón "Añadir tarea"
const errorMsg     = document.getElementById("error-msg");     // <p> para mensajes de error
const taskList     = document.getElementById("task-list");     // <ul> donde se añaden las tareas
const pendingCount = document.getElementById("pending-count"); // <span> con el número de tareas pendientes
const filterAll    = document.getElementById("filter-all");    // botón filtro "Todas"
const filterPend   = document.getElementById("filter-pending");// botón filtro "Pendientes"
const filterDone   = document.getElementById("filter-done");   // botón filtro "Completadas"

// ── VARIABLE DE ESTADO ────────────────────────────────────────────────────────
// Esta variable vive FUERA de los listeners para persistir entre clics
// Guarda qué filtro está activo en cada momento
// Si estuviera dentro de un listener, se reiniciaría en cada clic
let filtroActivo = "todas"; // valor por defecto al cargar la página

// ── EVENTO: AÑADIR TAREA ──────────────────────────────────────────────────────
addBtn.addEventListener("click", function () {
    // .trim() elimina espacios del principio y del final
    // Evita que "   " (solo espacios) pase la validación de vacío
    const valor = taskInput.value.trim();

    // Validación 1: campo vacío
    if (valor === "") {
        errorMsg.textContent = "La tarea no puede estar vacía.";
        return; // corta la función — no añade nada
    }

    // Validación 2: mínimo 3 caracteres
    if (valor.length < 3) {
        errorMsg.textContent = "La tarea debe tener al menos 3 caracteres.";
        return;
    }

    // Sin errores → limpiamos el mensaje de error anterior
    errorMsg.textContent = "";

    // ── CREAR EL <li> DE LA TAREA ─────────────────────────────────────────────
    const li = document.createElement("li");

    // ── CREAR EL CHECKBOX ─────────────────────────────────────────────────────
    const checkbox = document.createElement("input");
    checkbox.type  = "checkbox"; // lo convertimos en un checkbox (casilla de verificación)

    // Evento "change" se dispara cuando el checkbox cambia de estado (marcado/desmarcado)
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            // .checked es true cuando la casilla está marcada (✓)
            // classList.add añade una clase CSS al elemento
            // La clase "completada" normalmente añade tachado y color gris en el CSS
            li.classList.add("completada");
        } else {
            // Si se desmarca, quitamos la clase "completada"
            li.classList.remove("completada");
        }
        aplicarFiltro();    // re-aplicamos el filtro activo (puede que este li deba ocultarse)
        actualizarContador(); // recalculamos el número de tareas pendientes
    });

    // ── CREAR EL SPAN DE TEXTO ────────────────────────────────────────────────
    const textoSpan = document.createElement("span");
    textoSpan.classList.add("tarea-texto"); // clase CSS para dar estilo al texto
    textoSpan.textContent = valor;          // el texto de la tarea

    // ── CREAR EL BOTÓN ELIMINAR ───────────────────────────────────────────────
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    // CLOSURE: esta función recuerda el "li" de este scope aunque el listener
    // del addBtn ya haya terminado → cada botón elimina solo su propio li
    deleteBtn.addEventListener("click", function () {
        li.remove();          // elimina el <li> del DOM
        actualizarContador(); // actualizamos el contador de pendientes
    });

    // ── MONTAR EL <li> ────────────────────────────────────────────────────────
    // Orden: checkbox → texto → botón eliminar, todo dentro del li
    li.appendChild(checkbox);
    li.appendChild(textoSpan);
    li.appendChild(deleteBtn);

    // Añadimos el li terminado a la lista del HTML
    taskList.appendChild(li);

    // Limpiamos el input y devolvemos el foco para que el usuario pueda seguir escribiendo
    taskInput.value = "";
    taskInput.focus();

    aplicarFiltro();    // aplicamos el filtro activo (si estamos en "completadas" este li quedará oculto)
    actualizarContador(); // actualizamos el contador
});

// ── EVENTOS: BOTONES DE FILTRO ────────────────────────────────────────────────
// Cada botón actualiza la variable de estado y aplica el filtro correspondiente

filterAll.addEventListener("click", function () {
    filtroActivo = "todas";          // cambiamos el estado global
    marcarBotonActivo(filterAll);    // resaltamos el botón pulsado
    aplicarFiltro();                 // mostramos u ocultamos los li según el filtro
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

// ── FUNCIÓN: MARCAR BOTÓN ACTIVO ──────────────────────────────────────────────
// Quita la clase "activo" de todos los botones y se la añade solo al pulsado
// Así solo uno tiene el estilo de "seleccionado" a la vez
function marcarBotonActivo(btn) {
    filterAll.classList.remove("activo");
    filterPend.classList.remove("activo");
    filterDone.classList.remove("activo");
    btn.classList.add("activo"); // solo el botón recibido como parámetro queda marcado
}

// ── FUNCIÓN: APLICAR FILTRO ───────────────────────────────────────────────────
// Muestra u oculta cada <li> según el filtro activo y si la tarea está completada o no
function aplicarFiltro() {
    const items = document.querySelectorAll("#task-list li");

    items.forEach(function (li) {
        // classList.contains("completada") → true si el li tiene esa clase CSS
        const completada = li.classList.contains("completada");

        if (filtroActivo === "todas") {
            // Mostrar todos (display "flex" porque el li usa flexbox para alinear sus hijos)
            li.style.display = "flex";
        } else if (filtroActivo === "pendientes") {
            // Mostrar solo los NO completados
            li.style.display = completada ? "none" : "flex";
        } else if (filtroActivo === "completadas") {
            // Mostrar solo los completados
            li.style.display = completada ? "flex" : "none";
        }
    });
}

// ── FUNCIÓN: ACTUALIZAR CONTADOR DE PENDIENTES ───────────────────────────────
// Cuenta los <li> que NO tienen la clase "completada" y actualiza el span
function actualizarContador() {
    const items = document.querySelectorAll("#task-list li");
    let pendientes = 0;

    items.forEach(function (li) {
        // Si el li NO tiene la clase "completada" → está pendiente
        if (!li.classList.contains("completada")) {
            pendientes++;
        }
    });

    // Mostramos el número de pendientes en el <span>
    pendingCount.textContent = pendientes;
}
