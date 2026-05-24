let edad = document.getElementById("edad");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let check = document.getElementById("acepto");
let error = document.getElementById("error");

function validarContraseña() {
    let contraseña = document.getElementById("contrasena")
    let repeContrasena = document.getElementById("repeContrasena")
    if (contraseña.value === repeContrasena.value && contraseña.value.length >= 8) {
        return true;
    } else {
        return false;
    }
}

function validar() {
    let bandera = true;
    if (!nombre.value || !apellido.value || !edad.value) { //si estan vacios
        bandera = false;
        //creo que los siguientes else if se pueden meter todos en uno pero no me funciona
    } else if (parseInt(edad.value) < 18) {
        bandera = false;
    } else if (nombre.value.length < 2) {
        bandera = false;
    } else if (apellido.value.length < 10) {
        bandera = false;
    } else if (!check.checked) {
        bandera = false
    } else if (!validarContraseña()) {
        bandera = false;
    }
    // Mostrar u ocultar el span según la bandera
    if (!bandera) {
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }
    return bandera;
}

