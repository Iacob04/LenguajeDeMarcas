
/*Seleccionar un elemento por id #*/ 
let parrafo=document.getElementById("p1")
let notoTexto=document.createTextNode("Patata")
parrafo.appendChild(notoTexto)

//parrafo.innerHTML="PATATA" //BORRA TODO EL PARRAFO Y PONE PATATA 

//parrafo.appendChild("Patata")//agregar texto al p1

/*Seleccionar elementos por clase .*/
//Nos da una coleccion de elementos
//para agregar texto a un parafo
let elementos=document.getElementsByClassName("texto")
for (let index = 0; index < elementos.length; index++) {
    elementos[index]="hola"
}

/*Busca los elementos por el atributo name*/
//document.getElementsByName()

/*Busca los elementos de una misma etiqueta*/
let linea=document.getElementsByTagName("p")
document.writeln(linea.length)
for (let index = 0; index < linea.length; index++) {
    document.writeln(linea[index].getHTML)
}
/*Este no lo vamos usar*/
//document.getElementsByTagNameNS()




linea[0].setAttribute("Style","border:5px dashed blue")
linea[1].style.backgroundColor="blue"


//acciones ESPERA DOS ELEMENTOS
parrafo.addEventListener("click",
    function( ){
        linea[1].style.color="red"
    }

)

function cambiarRojo ( ){
    linea.style.color="red"
}