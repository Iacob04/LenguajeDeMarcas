// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
const nombreAlumno = document.getElementById('student-name');  // input texto: nombre del alumno
const notaAlumno   = document.getElementById('student-grade'); // input número: nota del alumno
const addBtn       = document.getElementById("add-btn");       // botón "Añadir alumno"
const errorMsg     = document.getElementById("error-msg");     // <p> para mensajes de error
const studentList  = document.getElementById("student-list");  // <ul> donde se listan los alumnos

// ── EVENTO: AÑADIR ALUMNO ─────────────────────────────────────────────────────
addBtn.addEventListener("click", function () {

    // Variable que guardará la calificación en texto según la nota numérica
    let notaCalificativa = "";

    // ── VALIDACIÓN NOMBRE ─────────────────────────────────────────────────────
    // .value lee el texto del input tal cual (sin trim aquí, pero se podría añadir)
    if (nombreAlumno.value === "") {
        errorMsg.textContent = "El nombre del alumno no puede estar vacío.";
        return; // sale de la función — no se añade nada
    }
    // .length devuelve el número de caracteres del string
    if (nombreAlumno.value.length < 3) {
        errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    }

    // ── VALIDACIÓN NOTA ───────────────────────────────────────────────────────
    if (notaAlumno.value === "") {
        errorMsg.textContent = "La nota no puede estar vacía";
        return;
    }
    // La nota debe estar entre 0 y 10 (rango válido de calificaciones)
    if (notaAlumno.value < 0 || notaAlumno.value > 10) {
        errorMsg.textContent = "La nota no puede ser negativa o mayor a 10";
        return;
    }

    // ── CALCULAR CALIFICACIÓN TEXTUAL ─────────────────────────────────────────
    // Según el valor numérico de la nota, asignamos una etiqueta descriptiva
    // Se usan varios if independientes (no if/else if) para cubrir todos los rangos
    if (notaAlumno.value >= 0   && notaAlumno.value <= 4.9) { notaCalificativa = "Suspenso"; }
    if (notaAlumno.value >= 5   && notaAlumno.value <= 6.9) { notaCalificativa = "Aprobado"; }
    if (notaAlumno.value >= 7   && notaAlumno.value <= 8.9) { notaCalificativa = "Notable"; }
    if (notaAlumno.value >= 9   && notaAlumno.value <= 10)  { notaCalificativa = "Sobresaliente"; }

    // ── SIN ERRORES ───────────────────────────────────────────────────────────
    // Limpiamos el mensaje de error anterior
    errorMsg.textContent = "";

    // ── CREAR EL <li> ─────────────────────────────────────────────────────────
    const li = document.createElement("li");

    // dataset guarda datos personalizados en el elemento HTML
    // li.dataset.nombreAlumno genera el atributo data-nombre-alumno en el <li>
    // li.dataset.grade genera data-grade
    // Los usamos después en actualizarMedia() para leer los valores sin parsear el texto visible
    li.dataset.nombreAlumno = nombreAlumno.value;
    li.dataset.grade        = notaAlumno.value;

    // Creamos el span con la información visible: "Ana — 8.5 Notable"
    const textoSpan = document.createElement("span");
    textoSpan.textContent = nombreAlumno.value + " — " + notaAlumno.value + " " + notaCalificativa;
    li.appendChild(textoSpan); // añadimos el span DENTRO del li

    // ── BOTÓN ELIMINAR ────────────────────────────────────────────────────────
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    // CLOSURE: esta función recuerda el "li" del scope exterior
    // Por eso siempre elimina el li correcto aunque haya muchos en la lista
    deleteBtn.addEventListener("click", function () {
        li.remove();       // elimina este <li> del DOM
        actualizarMedia(); // recalcula la media después de eliminar
    });

    li.appendChild(deleteBtn);      // añadimos el botón dentro del li
    studentList.appendChild(li);    // añadimos el li a la lista <ul>

    // ── LIMPIAR CAMPOS ────────────────────────────────────────────────────────
    nombreAlumno.value = "";
    notaAlumno.value   = "";
    nombreAlumno.focus(); // devuelve el cursor al campo de nombre

    actualizarMedia(); // recalculamos la media con el nuevo alumno
});

// ── FUNCIÓN: ACTUALIZAR MEDIA ─────────────────────────────────────────────────
// Recalcula la media de las notas de todos los alumnos de la lista
// Se llama cada vez que se añade o elimina un alumno
function actualizarMedia() {

    // Obtenemos todos los <li> que hay dentro de #student-list
    const items = document.querySelectorAll("#student-list li");

    // Si no hay ningún alumno mostramos "—" y salimos
    if (items.length === 0) {
        document.getElementById("average").textContent = "—";
        return; // salimos de la función, no hay nada que calcular
    }

    // Acumulador que irá sumando todas las notas
    let total = 0;

    // Recorremos cada li y sumamos su nota guardada en dataset.grade
    items.forEach(function (li) {
        // parseFloat convierte el string "7.5" al número decimal 7.5
        // Necesitamos el dataset porque el textContent del span incluye el nombre y la calificación
        total += parseFloat(li.dataset.grade);
    });

    // Dividimos el total entre el número de alumnos para obtener la media
    // items.length → número total de alumnos en la lista
    // .toFixed(2) redondea a 2 decimales → 7.333... → "7.33"
    document.getElementById("average").textContent = (total / items.length).toFixed(2);
}
