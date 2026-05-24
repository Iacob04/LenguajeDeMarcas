
function crearLista(){
    var valor = document.getElementById("guest-name").value;
     minlength = 3
    // Comprobamos que no esté vacío
    if (valor === "") {
        document.getElementById("error-msg").innerText = "El campo no puede estar vacío";
        return;
    }
    // Comprobamos que no tenga menos de 3 caracteres
    if (valor.length < minlength){
         document.getElementById("error-msg").innerText = "El campo no puede ser menor a 3 caracteres";
        
    }
    else{
        //eliminar aviso de error y crera liosta con boton 

        document.getElementById("error-msg").innerText = "";
        let list = document.createElement("li");
        let texto = document.createTextNode(valor);
        list.appendChild(texto);
        document.body.appendChild(list);
        let button = document.createElement("button");
        let textoboton = document.createTextNode("Eliminar de la lista");
        button.appendChild(textoboton);
        button.id=("boton1")
        document.body.appendChild(button);

        
        }
       /* if(button id="boton1" ononclick="eliminarLista()"){

        }*/
    
    
}
// aqui crearia la funcion de eliminar de la lista 
function eliminarLista(){

//document.getElementById("error-msg")

}