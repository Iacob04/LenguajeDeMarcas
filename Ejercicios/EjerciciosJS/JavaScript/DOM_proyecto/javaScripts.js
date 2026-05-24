let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historial = [];
let celdas = document.getElementsByClassName("tdX");
function jugar() {
    if (intentos >= 10) {
        return;
    }
    let numero = parseInt(document.getElementById("numeroUsuario").value);
    if (isNaN(numero)) {
        return;
    }
    historial.push(numero);
    //celdas[intentos].textContent = numero;
    intentos++;
    if (numero === numeroSecreto) {
        document.getElementById("resultado").textContent = document.getElementById("numeroUsuario").value+"¡CORRECTO!";
        document.getElementById("resultado").style.backgroundColor="green"
        //intentos++;

    } else if (numero > numeroSecreto) {

        document.getElementById("resultado").textContent = document.getElementById("numeroUsuario").value+" ES MAYOR";
        celdas[intentos - 1].style.backgroundColor = "#a349a4";

    } else {

        document.getElementById("resultado").textContent =document.getElementById("numeroUsuario").value+ " ES MENOR";
        celdas[intentos - 1].style.backgroundColor = "#a349a4";
    }
    document.getElementById("intentosTexto").textContent =
        "Intentos realizados: " + historial.join(", ");
    if (intentos === 10 && numero !== numeroSecreto) {
        document.getElementById("resultado").textContent=" HAS PERDIDO ";
        document.getElementById("resultado").style.backgroundColor="#F5F527"
    }
}