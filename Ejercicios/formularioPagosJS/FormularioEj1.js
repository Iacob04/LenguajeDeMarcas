function validar(){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var contraseña = document.getElementById("contraseña").value;
    var contraseña2 = document.getElementById("contraseña2").value;

    var direccion = document.getElementById("direccion").value;
    var edad = document.getElementById("edad").value;
    var estudios = document.getElementById("estudios").value;
    var checkbox = document.getElementById("acepto").checked;
    // se pone checked porque no devuelve texto sino que true o false de si esta marcada, value devuelve texto o algo

    var hayError = false;

    if(nombre.trim() === "" || apellido.trim() === "" || direccion.trim() === "" || edad.trim() === ""){
        hayError = true;
    }
    
    if(contraseña.trim() === "" || contraseña2.trim() === ""){
        hayError = true;
    }
    if(estudios === ""){
        hayError=true; // para un campo de select ver si esta vacio
    }
    if(nombre.trim().length <2){ // para ver la longitud si la cumplen
        hayError = true;
    }
     if(apellido.trim().length <10){
        hayError = true;
    }

    if(!validarContraseña()){
        hayError = true;    // con esto lo que hacemos es llamar a la función de validar
    }
     // validarContraseña();


    var edadNUM = Number(edad);

    if(edadNUM <18){
        hayError = true;
    }

    if(checkbox === false){ // esta bieen es lo mismo !checkbox , esto es mas corto
        hayError=true;
    }

   if(hayError){
    document.getElementById("error").style.display = "block"; // muestra error
    return false; // NO envía el formulario
    }else{
    document.getElementById("error").style.display = "none"; // oculta error
    return true; // SÍ envía el formulario
    }

    //

    //
    

}

function validarContraseña(){
    var contraseña = document.getElementById("contraseña").value;
    var contraseña2 = document.getElementById("contraseña2").value;

    var errorC = false;


    if(contraseña !== contraseña2){
        errorC = true;
    }

    if(errorC){
    document.getElementById("errorP").style.display = "block"; // muestra error
    return false; // NO envía el formulario
    }else{
    document.getElementById("errorP").style.display = "none"; // oculta error
    return true; // SÍ envía el formulario
    }

}