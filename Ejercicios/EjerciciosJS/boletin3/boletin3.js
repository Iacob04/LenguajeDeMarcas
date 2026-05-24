// ─────────────────────────────────────────────────────────────────────────
// EJERCICIO 1 – Modificar texto, fondo, borde y color de texto de un DIV
// ─────────────────────────────────────────────────────────────────────────

function cambiarTexto() {
    var div = document.getElementById("divEj1");
    var texto = document.getElementById("txtEj1").value;
    div.innerHTML = texto; // innerHTML reemplaza el contenido del div
}

function cambiarFondo() {
    var div = document.getElementById("divEj1");
    var color = document.getElementById("colFondo").value;
    div.style.background = color;
}

function cambiarBorde() {
    var div = document.getElementById("divEj1");
    var color = document.getElementById("colBorde").value;
    div.style.border = "3px solid " + color;
}

function cambiarColorTexto() {
    var div = document.getElementById("divEj1");
    var color = document.getElementById("colTexto").value;
    div.style.color = color;
}

// ─────────────────────────────────────────────────────────────────────────
// EJERCICIO 2 – Limpiar y copiar entre dos cajas de texto
// .value lee o escribe el contenido de un input
// ─────────────────────────────────────────────────────────────────────────

function limpiar1() {
    document.getElementById("texto1").value = "";
}

function copiar1a2() {
    document.getElementById("texto2").value = document.getElementById("texto1").value;
}

function limpiar2() {
    document.getElementById("texto2").value = "";
}

function copiar2a1() {
    document.getElementById("texto1").value = document.getElementById("texto2").value;
}

// ─────────────────────────────────────────────────────────────────────────
// EJERCICIO 3 – Capturar valores de múltiples tipos de control
// text/number/password/date/time → .value
// radio/checkbox                 → .checked  (devuelve true o false)
// select                         → .value
// ─────────────────────────────────────────────────────────────────────────

function capturarValores() {
    var texto  = document.getElementById("c-texto").value;
    var numero = document.getElementById("c-num").value;
    var pass   = document.getElementById("c-pass").value;
    var fecha  = document.getElementById("c-fecha").value;
    var hora   = document.getElementById("c-hora").value;
    var radio  = document.getElementById("c-radio").checked;
    var check  = document.getElementById("c-check").checked;
    var select = document.getElementById("c-select").value;

    alert(
        "TEXTO: "     + texto  + "\n" +
        "NUMERO: "    + numero + "\n" +
        "PASSSWORD: " + pass   + "\n" +
        "FECHA: "     + fecha  + "\n" +
        "HORA: "      + hora   + "\n" +
        "RADIO: "     + radio  + "\n" +
        "CHECKBOX: "  + check  + "\n" +
        "SELECT: "    + select
    );
}

// ─────────────────────────────────────────────────────────────────────────
// EJERCICIO 4 – Calculadora con los cuatro operadores
// parseFloat convierte el string del input a número decimal
// ─────────────────────────────────────────────────────────────────────────

function operar(op) {
    var n1 = parseFloat(document.getElementById("n1").value);
    var n2 = parseFloat(document.getElementById("n2").value);

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").value = "Error: introduce números";
        return;
    }

    var res;
    switch (op) {
        case "+": res = n1 + n2; break;
        case "-": res = n1 - n2; break;
        case "*": res = n1 * n2; break;
        case "/":
            if (n2 === 0) {
                document.getElementById("resultado").value = "Error: división por cero";
                return;
            }
            res = n1 / n2;
            break;
    }

    document.getElementById("resultado").value = res;
}

function limpiarCalc() {
    document.getElementById("n1").value = "";
    document.getElementById("n2").value = "";
    document.getElementById("resultado").value = "";
}

// ─────────────────────────────────────────────────────────────────────────
// EJERCICIO 5 – Menú seleccionable con flechas arriba/abajo
// ─────────────────────────────────────────────────────────────────────────

var opcionActual = 0;
var totalOpciones = 4;

// Quita el resaltado de todas las opciones y lo pone en la actual
function actualizarMenu() {
    for (var i = 0; i < totalOpciones; i++) {
        document.getElementById("op" + i).classList.remove("seleccionado");
    }
    document.getElementById("op" + opcionActual).classList.add("seleccionado");
}

// Flecha arriba: si no estamos en la primera, subimos
function subirMenu() {
    if (opcionActual > 0) opcionActual--;
    actualizarMenu();
}

// Flecha abajo: si no estamos en la última, bajamos
function bajarMenu() {
    if (opcionActual < totalOpciones - 1) opcionActual++;
    actualizarMenu();
}

function calcularMenu() {
    var val = parseInt(document.getElementById("numMenu").value);

    // Validación: el número debe ser mayor que 0
    if (isNaN(val) || val <= 0) {
        alert("El número debe ser >0");
        return;
    }

    var res = "";

    switch (opcionActual) {
        case 0: // Par
            res = val + (val % 2 === 0 ? " ES PAR" : " NO ES PAR");
            break;

        case 1: // Impar
            res = val + (val % 2 !== 0 ? " ES IMPAR" : " NO ES IMPAR");
            break;

        case 2: // Primo
            var primo = val > 1;
            for (var i = 2; i <= Math.sqrt(val); i++) {
                if (val % i === 0) { primo = false; break; }
            }
            res = val + (primo ? " ES PRIMO" : " NO ES PRIMO");
            break;

        case 3: // Divisores
            var divs = [];
            for (var i = 1; i <= val; i++) {
                if (val % i === 0) divs.push(i);
            }
            res = "Divisores de " + val + ": " + divs.join(", ");
            break;
    }

    document.getElementById("resMenu").value = res;
}

// ─────────────────────────────────────────────────────────────────────────
// EJERCICIO 6 – Adivina el número (1-100, máximo 10 intentos)
// ─────────────────────────────────────────────────────────────────────────

var secreto;
var intentos;
var listaIntentos;
var maxIntentos = 10;
var terminado;

function nuevaPartida() {
    // Número secreto aleatorio entre 1 y 100
    secreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    listaIntentos = [];
    terminado = false;

    document.getElementById("inputNum").value = "";
    document.getElementById("msgJuego").innerText = "";
    document.getElementById("msgJuego").style.color = "";
    document.getElementById("labelIntentos").innerText = "INTENTOS REALIZADOS";

    // Crear las 10 celdas con número de intento y la X debajo
    var cont = document.getElementById("celdasIntentos");
    cont.innerHTML = "";
    for (var i = 1; i <= maxIntentos; i++) {
        var div = document.createElement("div");
        div.style.textAlign = "center";
        div.innerHTML =
            '<div style="background:#9b59b6;color:white;width:36px;height:24px;display:flex;align-items:center;justify-content:center;font-weight:bold">' + i + '</div>' +
            '<div class="celda" id="c' + i + '">X</div>';
        cont.appendChild(div);
    }
}

function jugar() {
    if (terminado) {
        alert("Partida terminada. Pulsa 'Nueva partida'.");
        return;
    }

    var num = parseInt(document.getElementById("inputNum").value);
    var msg = document.getElementById("msgJuego");

    if (isNaN(num) || num < 1 || num > 100) {
        alert("Introduce un número entre 1 y 100");
        return;
    }

    intentos++;
    listaIntentos.push(num);
    document.getElementById("labelIntentos").innerText =
        "INTENTOS REALIZADOS: " + listaIntentos.join(" ");

    // Actualizar celda del intento actual con el número introducido
    document.getElementById("c" + intentos).innerText = num;

    if (num === secreto) {
        msg.innerText = "HAS ACERTADO";
        msg.style.color = "green";
        terminado = true;
    } else if (intentos >= maxIntentos) {
        msg.innerText = "HAS PERDIDO";
        msg.style.color = "orange";
        terminado = true;
    } else if (num > secreto) {
        msg.innerText = num + " ES MAYOR";
        msg.style.color = "red";
    } else {
        msg.innerText = num + " ES MENOR";
        msg.style.color = "red";
    }
}

// Iniciar partida al cargar la página
window.onload = nuevaPartida;
