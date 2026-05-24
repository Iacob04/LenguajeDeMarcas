// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
const btnGenerar    = document.getElementById("btn-generar");   // botón "Generar quiniela"
const quinielaList  = document.getElementById("quiniela-list"); // <ul> donde se muestra la quiniela
const historialSpan = document.getElementById("historial");     // <span> con el total de quinielas generadas
const count1        = document.getElementById("count-1");       // <span> con el número de "1" generados
const countX        = document.getElementById("count-x");       // <span> con el número de "X" generados
const count2        = document.getElementById("count-2");       // <span> con el número de "2" generados

// ── VARIABLE DE ESTADO ────────────────────────────────────────────────────────
// Vive FUERA del listener para que su valor persista entre pulsaciones del botón
// Si estuviera dentro, se reiniciaría a 0 cada vez que se pulsa "Generar"
let totalQuinielas = 0;

// ── EVENTO: GENERAR QUINIELA ──────────────────────────────────────────────────
btnGenerar.addEventListener("click", function () {

    // Limpiamos la lista anterior antes de generar la nueva
    // .innerHTML = "" elimina TODOS los hijos del elemento de golpe
    // Es más rápido que recorrer y eliminar uno a uno
    quinielaList.innerHTML = "";

    // Array con los tres posibles resultados de un partido de fútbol
    // "1" = gana local | "X" = empate | "2" = gana visitante
    const resultados = ["1", "X", "2"];

    // Contadores locales para esta quiniela concreta
    // Se reinician a 0 con cada nueva quiniela (están DENTRO del listener)
    let unos  = 0;
    let equis = 0;
    let doses = 0;

    // ── GENERAR 14 PARTIDOS ───────────────────────────────────────────────────
    // Un partido por cada iteración del bucle
    // El bucle for recorre del 1 al 14 (i = 1; i <= 14; i++ incrementa de uno en uno)
    for (let i = 1; i <= 14; i++) {

        // Math.random() genera un decimal entre 0.0 y 0.9999...
        // Math.random() * 3 → entre 0.0 y 2.9999...
        // Math.floor(...) redondea hacia abajo → 0, 1 o 2
        // Usamos ese número como ÍNDICE del array resultados
        const indice    = Math.floor(Math.random() * 3);
        const resultado = resultados[indice]; // "1", "X" o "2"

        // Incrementamos el contador del resultado obtenido
        if (resultado === "1") { unos++; }
        if (resultado === "X") { equis++; }
        if (resultado === "2") { doses++; }

        // ── CREAR EL <li> DEL PARTIDO ──────────────────────────────────────────
        const li = document.createElement("li");

        // Span con el número del partido ("Partido 1", "Partido 2"...)
        const partidoSpan = document.createElement("span");
        partidoSpan.textContent = "Partido  " + i;

        // Span con el resultado ("1", "X" o "2")
        const resultadoSpan = document.createElement("span");
        resultadoSpan.textContent = " : " + resultado;

        // La clase "resultado" da el estilo base al span del resultado
        resultadoSpan.classList.add("resultado");

        // Añadimos una clase de color según el resultado:
        // "res-1" → verde (gana local), "res-x" → amarillo (empate), "res-2" → rojo (gana visitante)
        // classList.add añade una clase CSS sin borrar las que ya tiene
        if (resultado === "1") { resultadoSpan.classList.add("res-1"); }
        if (resultado === "X") { resultadoSpan.classList.add("res-x"); }
        if (resultado === "2") { resultadoSpan.classList.add("res-2"); }

        // Montamos el li: partido + resultado, y lo añadimos a la lista
        li.appendChild(partidoSpan);
        li.appendChild(resultadoSpan);
        quinielaList.appendChild(li);
    }

    // ── ACTUALIZAR ESTADÍSTICAS ───────────────────────────────────────────────
    // Mostramos cuántos 1, X y 2 salieron en esta quiniela
    count1.textContent = unos;
    countX.textContent = equis;
    count2.textContent = doses;

    // Incrementamos el historial de quinielas generadas y lo mostramos
    // totalQuinielas está FUERA del listener → no se reinicia entre pulsaciones
    totalQuinielas++;
    historialSpan.textContent = totalQuinielas;
});
