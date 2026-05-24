function CambiarTexto(params) {//funcion que cambia el texto de un div
    let texto=document.getElementById("idTexto").value //value recupera el texto
    //se pone el ID de la etiqueta
    //console.log(texto)//imprimir por consola
    //document.getElementById("idDivTexto").innerHTML=texto //cambiando el texto de un div
    let parrafo=document.createElement("p")
    parrafo.innerHTML=texto
    document.getElementById("idDivTexto").appendChild(parrafo)//ir agregando un parrafo
}
//FUNCION QUE CAMBIA EL COLOR DE FONDO
function CambiarColorFondo() {
    let colorFondo=document.getElementById("idColorFondo").value
    //console.log(colorFondo)
    document.querySelector("#idDivTexto").style.backgroundColor=colorFondo
}
function CambiarColorBorde( ){
    document.querySelector("idColorBorde").style.borderColor=document.getElementById("idColorBorde")
    getElementById("idColorBorde").value
}

let boton=document.getElementById("prueba")
document.writeln(boton)
boton.addEventListener("click",function(){
    let colorTexto=document.get

})