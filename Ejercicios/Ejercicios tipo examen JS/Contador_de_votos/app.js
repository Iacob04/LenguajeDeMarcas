// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
// querySelectorAll devuelve TODOS los elementos que coincidan con el selector
// como una NodeList → parecida a un array, se puede recorrer con forEach
const opciones = document.querySelectorAll(".option");   // todos los <div class="option">
const botones  = document.querySelectorAll(".vote-btn"); // todos los botones de votar
const winner   = document.getElementById("winner");      // <p> donde mostramos el ganador

// ── EVENTO: VOTAR ─────────────────────────────────────────────────────────────
// Recorremos todos los botones de voto y le añadimos un listener a cada uno
// forEach también funciona sobre NodeList directamente
botones.forEach(function (btn) {
    btn.addEventListener("click", function () {

        // ── INCREMENTAR EL CONTADOR DE VOTOS ──────────────────────────────────
        // btn.parentElement → el elemento padre del botón (el <div class="option">)
        // Así accedemos al contenedor del candidato al que se votó
        const option = btn.parentElement;

        // Dentro de ese option, buscamos el <span class="vote-count"> que tiene el número
        // querySelector busca el PRIMER elemento con esa clase dentro de "option"
        const countSpan = option.querySelector(".vote-count");

        // parseInt convierte el texto "3" al número entero 3
        // Le sumamos 1 y lo volvemos a guardar como texto en textContent
        countSpan.textContent = parseInt(countSpan.textContent) + 1;

        // ── DESHABILITAR TODOS LOS BOTONES ────────────────────────────────────
        // Solo se puede votar una vez: deshabilitamos todos los botones
        // .disabled = true → el botón queda gris y no se puede pulsar
        botones.forEach(function (b) {
            b.disabled = true;
        });

        // Recalculamos los porcentajes y mostramos el ganador
        actualizarPorcentajes();
        mostrarGanador();
    });
});

// ── FUNCIÓN: ACTUALIZAR PORCENTAJES ──────────────────────────────────────────
// Calcula qué porcentaje del total de votos tiene cada opción
function actualizarPorcentajes() {

    // Primero sumamos el total de votos de todas las opciones
    let total = 0;
    opciones.forEach(function (opt) {
        // Leemos los votos de cada opción y los sumamos
        total += parseInt(opt.querySelector(".vote-count").textContent);
    });

    // Luego calculamos el porcentaje de cada opción
    opciones.forEach(function (opt) {
        const votos = parseInt(opt.querySelector(".vote-count").textContent);

        // Si total > 0 calculamos el porcentaje, si no ponemos 0 (para evitar dividir entre 0)
        // Ternario: condición ? valor_si_true : valor_si_false
        // Math.round redondea al entero más cercano → 33.33... → 33
        const pct = total > 0 ? Math.round((votos / total) * 100) : 0;

        // Mostramos el porcentaje en el <span class="percentage"> de cada opción
        opt.querySelector(".percentage").textContent = pct + "%";
    });
}

// ── FUNCIÓN: MOSTRAR GANADOR ──────────────────────────────────────────────────
// Busca la opción con más votos y muestra su nombre
function mostrarGanador() {
    let maxVotos = -1;      // empezamos en -1 para que cualquier número gane
    let nombreGanador = ""; // guardará el nombre del candidato ganador

    // Recorremos todas las opciones para encontrar la que más votos tiene
    opciones.forEach(function (opt) {
        const votos = parseInt(opt.querySelector(".vote-count").textContent);

        // Si esta opción tiene más votos que el máximo actual, la guardamos
        if (votos > maxVotos) {
            maxVotos = votos;
            // .option-name → el <span> con el nombre del candidato dentro de este option
            nombreGanador = opt.querySelector(".option-name").textContent;
        }
    });

    // Mostramos el resultado en el <p id="winner">
    winner.textContent = "Ganador: " + nombreGanador + " con " + maxVotos + " voto/s";
}
