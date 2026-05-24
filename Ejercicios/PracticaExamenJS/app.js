document.getElementById("add-btn").addEventListener("click", crearLista);

function crearLista() {
    const valor = document.getElementById("guest-name").value.trim();
    const minlength = 3;

    if (valor === "") {
        document.getElementById("error-msg").innerText = "El campo no puede estar vacío";
        return;
    }
    if (valor.length < minlength) {
        document.getElementById("error-msg").innerText = "El campo no puede ser menor a 3 caracteres";
        return;
    }

    document.getElementById("error-msg").innerText = "";

    const li = document.createElement("li");
    const texto = document.createTextNode(valor);
    li.appendChild(texto);

    const button = document.createElement("button");
    const textoBoton = document.createTextNode("Eliminar de la lista");
    button.appendChild(textoBoton);
    button.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(button);
    document.getElementById("guest-list").appendChild(li);

    document.getElementById("guest-name").value = "";
}