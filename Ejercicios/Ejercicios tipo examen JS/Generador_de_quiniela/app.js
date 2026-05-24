const btnGenerar   = document.getElementById("btn-generar");
const quinielaList = document.getElementById("quiniela-list");
const historialSpan= document.getElementById("historial");
const count1       = document.getElementById("count-1");
const countX       = document.getElementById("count-x");
const count2       = document.getElementById("count-2");

// Variable de estado: cuenta cuántas quinielas se han generado
// Está fuera del listener para que persista entre pulsaciones
let totalQuinielas = 0;

btnGenerar.addEventListener("click", function () {

    // Limpiar la lista anterior antes de generar la nueva
    quinielaList.innerHTML = "";

    // Los tres posibles resultados en un array
    // Math.floor(Math.random() * 3) genera 0, 1 o 2
    // usamos ese número como índice del array
    const resultados = ["1", "X", "2"];

    // Contadores locales para esta quiniela
    let unos  = 0;
    let equis = 0;
    let doses = 0;

    // Generar 14 partidos
    for (let i = 1; i <= 14; i++) {
        const indice    = Math.floor(Math.random() * 3);
        const resultado = resultados[indice];

        // Acumular contadores
        if (resultado === "1") { unos++; }
        if (resultado === "X") { equis++; }
        if (resultado === "2") { doses++; }

        // Crear li con el partido y el resultado
        const li = document.createElement("li");

        const partidoSpan = document.createElement("span");
        partidoSpan.textContent = "Partido  " + i;

        const resultadoSpan = document.createElement("span");
        resultadoSpan.textContent =" : "+ resultado;
        resultadoSpan.classList.add("resultado");

        // Clase de color según el resultado
        if (resultado === "1") { resultadoSpan.classList.add("res-1"); }
        if (resultado === "X") { resultadoSpan.classList.add("res-x"); }
        if (resultado === "2") { resultadoSpan.classList.add("res-2"); }

        li.appendChild(partidoSpan);
        li.appendChild(resultadoSpan);
        quinielaList.appendChild(li);
    }

    // Actualizar contadores en el DOM
    count1.textContent = unos;
    countX.textContent = equis;
    count2.textContent = doses;

    // Incrementar y mostrar el historial de quinielas generadas
    totalQuinielas++;
    historialSpan.textContent = totalQuinielas;
});
