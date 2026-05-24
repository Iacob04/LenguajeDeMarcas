// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
const importe  = document.getElementById("importe");   // input numérico: importe de la cuenta
const errorMsg = document.getElementById("error-msg"); // <p> para mensajes de error
const propina  = document.getElementById("propina");   // <span> donde mostramos la propina calculada
const total    = document.getElementById("total");     // <span> donde mostramos el total (cuenta + propina)
const btn10    = document.getElementById("btn-10");    // botón propina 10%
const btn15    = document.getElementById("btn-15");    // botón propina 15%
const btn20    = document.getElementById("btn-20");    // botón propina 20%
const btnClear = document.getElementById("btn-clear"); // botón limpiar/resetear

// ── FUNCIÓN: CALCULAR ─────────────────────────────────────────────────────────
// Función reutilizable que recibe el porcentaje como parámetro
// De esta forma evitamos copiar el mismo código 3 veces (uno por botón)
// Principio: si el mismo código se repite 3 veces, mejor hacerlo una función con parámetro
function calcular(porcentaje) {

    // parseFloat convierte el string del input ("45.00") al número decimal 45
    const cuenta = parseFloat(importe.value);

    // Validación 1: campo vacío
    // Importante: validar vacío ANTES del isNaN porque parseFloat("") devuelve NaN
    // y así el mensaje de error es más claro para el usuario
    if (importe.value === "") {
        errorMsg.textContent = "El importe no puede estar vacío.";
        return; // sale de la función sin calcular nada
    }

    // Validación 2: debe ser un número válido y mayor que 0
    // isNaN(x) → true si x NO es un número ("not a number")
    // parseFloat("hola") → NaN → isNaN(NaN) → true
    if (isNaN(cuenta) || cuenta <= 0) {
        errorMsg.textContent = "El importe debe ser un número mayor que 0.";
        return;
    }

    // Sin errores → limpiamos el mensaje de error
    errorMsg.textContent = "";

    // ── CÁLCULO ───────────────────────────────────────────────────────────────
    // Propina = cuenta × (porcentaje / 100)
    // Ejemplo con 15%: 45 × (15 / 100) = 45 × 0.15 = 6.75
    const propinaValor = cuenta * (porcentaje / 100);

    // Total = cuenta original + propina
    const totalValor = cuenta + propinaValor;

    // ── MOSTRAR RESULTADOS ────────────────────────────────────────────────────
    // .toFixed(2) redondea a 2 decimales y devuelve un STRING → 6.75 → "6.75"
    propina.textContent = propinaValor.toFixed(2) + "€";
    total.textContent   = totalValor.toFixed(2) + "€";
}

// ── EVENTOS: BOTONES DE PORCENTAJE ────────────────────────────────────────────
// Cada botón llama a la función calcular() pasándole su porcentaje concreto
// Así reutilizamos la misma función en lugar de repetir el código
btn10.addEventListener("click", function () {
    calcular(10); // propina del 10%
});

btn15.addEventListener("click", function () {
    calcular(15); // propina del 15%
});

btn20.addEventListener("click", function () {
    calcular(20); // propina del 20%
});

// ── EVENTO: LIMPIAR ───────────────────────────────────────────────────────────
// Resetea todos los campos al estado inicial
btnClear.addEventListener("click", function () {
    importe.value        = "";   // vacía el input del importe
    errorMsg.textContent = "";   // limpia el mensaje de error
    propina.textContent  = "—";  // vuelve al valor inicial "—" (sin dato)
    total.textContent    = "—";  // vuelve al valor inicial "—" (sin dato)
    importe.focus();             // devuelve el cursor al input del importe
});
