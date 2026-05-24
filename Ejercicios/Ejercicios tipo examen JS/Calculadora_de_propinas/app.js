const importe  = document.getElementById("importe");
const errorMsg = document.getElementById("error-msg");
const propina  = document.getElementById("propina");
const total    = document.getElementById("total");
const btn10    = document.getElementById("btn-10");
const btn15    = document.getElementById("btn-15");
const btn20    = document.getElementById("btn-20");
const btnClear = document.getElementById("btn-clear");

// Función reutilizable que recibe el porcentaje como parámetro
// Así evitamos repetir el mismo código tres veces
function calcular(porcentaje) {
    const cuenta = parseFloat(importe.value);

    // Validación: campo vacío
    if (importe.value === "") {
        errorMsg.textContent = "El importe no puede estar vacío.";
        return;
    }

    // Validación: debe ser mayor que 0
    if (isNaN(cuenta) || cuenta <= 0) {
        errorMsg.textContent = "El importe debe ser un número mayor que 0.";
        return;
    }

    // Sin errores
    errorMsg.textContent = "";

    // Cálculo de la propina y el total
    const propinaValor = cuenta * (porcentaje / 100);
    const totalValor   = cuenta + propinaValor;

    // .toFixed(2) redondea a 2 decimales y devuelve un string
    propina.textContent = propinaValor.toFixed(2) + "€";
    total.textContent   = totalValor.toFixed(2) + "€";
}

// Cada botón llama a calcular() pasando su porcentaje
btn10.addEventListener("click", function () {
    calcular(10);
});

btn15.addEventListener("click", function () {
    calcular(15);
});

btn20.addEventListener("click", function () {
    calcular(20);
});

// Botón limpiar: vacía el input y resetea los resultados
btnClear.addEventListener("click", function () {
    importe.value         = "";
    errorMsg.textContent  = "";
    propina.textContent   = "—";
    total.textContent     = "—";
    importe.focus();
});


