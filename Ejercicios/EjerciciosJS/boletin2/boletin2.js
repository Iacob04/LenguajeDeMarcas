// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 1
// Crear array de 10 múltiplos de 5 aleatorios entre 0 y 100
// · primer elemento >= 50
// · último elemento  <= 50
// ─────────────────────────────────────────────────────────────────────────

// Devuelve un múltiplo aleatorio de 5 entre 0 y 100
// Hay 21 múltiplos (0,5,10…100) → índice 0-20, multiplicado por 5
function multiploRandom5() {
    return Math.floor(Math.random() * 21) * 5;
}

function ejercicio1() {
    // Paso 1: rellenar array con 10 múltiplos aleatorios
    var array = [];
    for (var i = 0; i < 10; i++) {
        array.push(multiploRandom5());
    }

    // Paso 2: si el primer elemento es < 50, sustituirlo hasta que sea >= 50
    // shift() elimina el primero, unshift() inserta al inicio
    while (array[0] < 50) {
        array.shift();
        array.unshift(multiploRandom5());
    }

    // Paso 3: si el último elemento es > 50, sustituirlo hasta que sea <= 50
    // pop() elimina el último, push() inserta al final
    while (array[array.length - 1] > 50) {
        array.pop();
        array.push(multiploRandom5());
    }

    document.getElementById("ej1").innerText =
        "Array:   [" + array.join(", ") + "]\n" +
        "Primero (>=50): " + array[0] + "\n" +
        "Último  (<=50): " + array[array.length - 1];
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 2
// Función que comprueba si dos arrays contienen los mismos elementos
// (sin importar el orden)
// ─────────────────────────────────────────────────────────────────────────
function mismosElementos(a, b) {
    if (a.length !== b.length) return false;

    // Ordenamos copias para comparar elemento a elemento
    // slice() hace copia independiente para no modificar los originales
    var copiaA = a.slice().sort();
    var copiaB = b.slice().sort();

    for (var i = 0; i < copiaA.length; i++) {
        if (copiaA[i] !== copiaB[i]) return false;
    }
    return true;
}

function ejercicio2() {
    // split(",") divide por comas, map+trim elimina espacios extra
    var a = document.getElementById("arr2a").value.split(",").map(function(s) { return s.trim(); });
    var b = document.getElementById("arr2b").value.split(",").map(function(s) { return s.trim(); });

    var igual = mismosElementos(a, b);
    document.getElementById("ej2").innerText =
        "Array 1: [" + a + "]\n" +
        "Array 2: [" + b + "]\n" +
        (igual ? "Los arrays contienen los MISMOS elementos" : "Los arrays son DISTINTOS");
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 3
// Detectar cuántos elementos repetidos hay y en qué posiciones están
// ─────────────────────────────────────────────────────────────────────────
function detectarRepetidos(arr) {
    var conteo = {};    // { valor: veces }
    var posiciones = {}; // { valor: [pos1, pos2, ...] }

    for (var i = 0; i < arr.length; i++) {
        var elem = arr[i];
        if (conteo[elem] === undefined) {
            conteo[elem] = 0;
            posiciones[elem] = [];
        }
        conteo[elem]++;
        posiciones[elem].push(i);
    }

    // Devolvemos solo los que aparecen más de una vez
    var resultado = [];
    for (var clave in conteo) {
        if (conteo[clave] > 1) {
            resultado.push({
                valor: clave,
                veces: conteo[clave],
                indices: posiciones[clave]
            });
        }
    }
    return resultado;
}

function ejercicio3() {
    var arr = document.getElementById("arr3").value.split(",").map(function(s) { return s.trim(); });
    var repetidos = detectarRepetidos(arr);

    if (repetidos.length === 0) {
        document.getElementById("ej3").innerText = "No hay elementos repetidos.";
        return;
    }

    var salida = "Elementos repetidos:\n";
    for (var i = 0; i < repetidos.length; i++) {
        salida += "  '" + repetidos[i].valor + "' → " +
                  repetidos[i].veces + " veces, posiciones: [" +
                  repetidos[i].indices.join(", ") + "]\n";
    }
    document.getElementById("ej4").innerHTML = salida;
    document.getElementById("ej3").innerText = salida;
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 4
// Crear array de números aleatorios, ordenarlos y mostrarlos en <ul>
// ─────────────────────────────────────────────────────────────────────────
function ejercicio4() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }

    // sort() sin argumento ordena como texto → hay que pasarle función numérica
    arr.sort(function(a, b) { return a - b; });

    var html = "<p>Array ordenado: [" + arr.join(", ") + "]</p><ul>";
    for (var i = 0; i < arr.length; i++) {
        html += "<li>" + arr[i] + "</li>";
    }
    html += "</ul>";
    document.getElementById("ej4").innerHTML = html;
}

// ─────────────────────────────────────────────────────────────────────────
// Ejercicio 5
// Función que devuelve el último elemento de un array
// ─────────────────────────────────────────────────────────────────────────
function ultimoElemento(arr) {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1]; // índice último = length - 1
}

function ejercicio5() {
    var arr = document.getElementById("arr5").value.split(",").map(function(s) { return s.trim(); });

    if (arr[0] === "") {
        document.getElementById("ej5").innerText = "Introduce al menos un elemento.";
        return;
    }

    document.getElementById("ej5").innerText =
        "Array: [" + arr.join(", ") + "]\nÚltimo elemento: " + ultimoElemento(arr);
}
