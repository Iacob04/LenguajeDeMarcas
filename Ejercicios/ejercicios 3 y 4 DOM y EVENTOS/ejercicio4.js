function calcular(operacion) {
    var n1 = parseFloat(document.getElementById("numero1").value);
    var n2 = parseFloat(document.getElementById("numero2").value);
    var resultado = document.getElementById("resultado");

    if (isNaN(n1) || isNaN(n2)) {
        resultado.value = "Introduce dos números válidos";
        return;
    }

    var res;

    switch (operacion) {
        case '+':
            res = n1 + n2;
            break;
        case '-':
            res = n1 - n2;
            break;
        case '*':
            res = n1 * n2;
            break;
        case '/':
            if (n2 === 0) {
                resultado.value = "Error: división por cero";
                return;
            }
            res = n1 / n2;
            break;
    }

    resultado.value = res;
}

function limpiar() {
    document.getElementById("numero1").value = "";
    document.getElementById("numero2").value = "";
    document.getElementById("resultado").value = "";
}
