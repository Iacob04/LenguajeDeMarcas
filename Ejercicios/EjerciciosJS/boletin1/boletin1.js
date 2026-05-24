// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 1 – Script externo
// En un proyecto real esto va en un archivo .js separado referenciado con:
// <script src="boletin1.js"></script>
// Usamos window.onload para esperar a que el HTML esté listo antes de
// intentar escribir en el div #ej1
// ─────────────────────────────────────────────────────────────────────────
window.onload = function() {
    document.getElementById("ej1").innerHTML =
        "Hola, ¿qué tal?<br>Soy Alexandru y este es mi primer script";
};

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 2 – Variable saludo + alert
// ─────────────────────────────────────────────────────────────────────────
function ej2() {
    var saludo = "Hola, ¿qué tal? Soy Alexandru y este es mi primer script";
    alert(saludo);
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 3 – Completar condiciones de los if
// ─────────────────────────────────────────────────────────────────────────
function ej3() {
    var numero1 = 7;
    var numero2 = 9;
    var resultado = "";

    // numero1 NO es mayor que numero2 → numero1 <= numero2
    if (numero1 <= numero2) {
        resultado += "numero1 no es mayor que numero2<br>";
    }

    // numero2 es positivo → numero2 > 0
    if (numero2 > 0) {
        resultado += "numero2 es positivo<br>";
    }

    // numero1 es negativo O distinto de cero → numero1 < 0 || numero1 != 0
    if (numero1 < 0 || numero1 != 0) {
        resultado += "numero1 es negativo o distinto de cero<br>";
    }

    // incrementar numero1 en 1 NO lo hace >= numero2 → (numero1+1) < numero2
    if ((numero1 + 1) < numero2) {
        resultado += "Incrementar en 1 numero1 no lo hace mayor o igual que numero2<br>";
    }

    document.getElementById("ej3-out").innerHTML = resultado;
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 4 – Array de días de la semana
// ─────────────────────────────────────────────────────────────────────────
var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// 4.1 Escribir los días en líneas separadas
function diasLineas() {
    var html = "";
    for (var i = 0; i < dias.length; i++) {
        html += dias[i] + "<br>";
    }
    document.getElementById("ej4-out").innerHTML = html;
}

// 4.2 Mostrar los días en lista numerada <ol>
function diasLista() {
    var html = "<ol>";
    for (var i = 0; i < dias.length; i++) {
        html += "<li>" + dias[i] + "</li>";
    }
    html += "</ol>";
    document.getElementById("ej4-out").innerHTML = html;
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 5 – Bucles
// ─────────────────────────────────────────────────────────────────────────

// 5.1 Primeros 10 números
function primeros10() {
    var salida = "";
    for (var i = 1; i <= 10; i++) {
        salida += i + " ";
    }
    document.getElementById("ej5-out").innerText = salida;
}

// 5.2 Primeros 20 números pares
function pares20() {
    var salida = "";
    var num = 2;
    var contador = 0;
    while (contador < 20) {
        salida += num + " ";
        num += 2;
        contador++;
    }
    document.getElementById("ej5-out").innerText = salida;
}

// 5.3 Múltiplos de 7 menores de 500
function multiplos7() {
    var salida = "";
    for (var i = 7; i < 500; i += 7) {
        salida += i + " ";
    }
    document.getElementById("ej5-out").innerText = salida;
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 6 – Par o impar con validación
// ─────────────────────────────────────────────────────────────────────────
function parImpar() {
    var valor = document.getElementById("num-parImpar").value;

    // Comprobamos que no esté vacío
    if (valor === "") {
        document.getElementById("ej6-out").innerText = "Debes introducir un valor";
        return;
    }

    // isNaN() devuelve true si NO es un número
    if (isNaN(valor)) {
        document.getElementById("ej6-out").innerText = "El valor introducido no es un número";
        return;
    }

    var num = parseInt(valor);

    // % es el operador módulo (resto de la división)
    if (num % 2 === 0) {
        document.getElementById("ej6-out").innerText = num + " es PAR";
    } else {
        document.getElementById("ej6-out").innerText = num + " es IMPAR";
    }
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 7 – Lanzar dos dados
// Fórmula: Math.floor(Math.random() * 6) + 1  → número entre 1 y 6
// ─────────────────────────────────────────────────────────────────────────
function tirarDados() {
    var dado1 = Math.floor(Math.random() * 6) + 1;
    var dado2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById("ej7-out").innerText =
        "Dado 1: " + dado1 + "  |  Dado 2: " + dado2 + "  |  Total: " + (dado1 + dado2);
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 8 – Primitiva: 6 números entre 1 y 49 (sin controlar repetidos)
// ─────────────────────────────────────────────────────────────────────────
function primitiva() {
    var numeros = "";
    for (var i = 0; i < 6; i++) {
        numeros += Math.floor(Math.random() * 49) + 1;
        if (i < 5) numeros += " - ";
    }
    document.getElementById("ej8-out").innerText = "Tu combinación: " + numeros;
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 9 – Quiniela
// 14 partidos con valores 1, X, 2 (si sale 3 → X)
// Partido 15 con dos columnas: valores 0, 1, 2, M (si sale 3 → M)
// ─────────────────────────────────────────────────────────────────────────
function quiniela() {
    var resultado = "";

    for (var i = 1; i <= 14; i++) {
        var num = Math.floor(Math.random() * 3) + 1; // 1, 2 o 3
        var marcador = (num === 3) ? "X" : num;
        resultado += "Partido " + i + ": " + marcador + "\n";
    }

    // Partido 15: dos columnas, valores 0-3 (3 → M)
    var c1 = Math.floor(Math.random() * 4); // 0, 1, 2 o 3
    var c2 = Math.floor(Math.random() * 4);
    resultado += "Partido 15: " + (c1 === 3 ? "M" : c1) + " / " + (c2 === 3 ? "M" : c2);

    document.getElementById("ej9-out").innerText = resultado;
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 10 – Generar números aleatorios (1-1000) hasta que salga el 666
// Usamos do...while para ejecutar al menos una vez
// ─────────────────────────────────────────────────────────────────────────
function hasta666() {
    var num;
    var lista = "";
    var intentos = 0;

    do {
        num = Math.floor(Math.random() * 1000) + 1;
        lista += num + " ";
        intentos++;
        if (intentos > 100000) break; // seguridad: no bloquear el navegador
    } while (num !== 666);

    document.getElementById("ej10-out").innerText =
        "Intentos: " + intentos + "\n" + lista;
}
