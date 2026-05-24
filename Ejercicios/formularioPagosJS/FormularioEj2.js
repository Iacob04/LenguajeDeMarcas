function mostrarSolicitud(){
    // recogemos el valor de la opción seleccionada en el select
    var asunto = document.getElementById("asunto").value;
    
    // si el usuario ha elegido "Estado de una solicitud" (value="estado")
    if(asunto === "estado"){
        // mostramos el bloque del número de solicitud
        document.getElementById("bloqueSolicitud").style.display = "block";
    } else {
        // si elige cualquier otra opción lo ocultamos
        document.getElementById("bloqueSolicitud").style.display = "none";
    }
}