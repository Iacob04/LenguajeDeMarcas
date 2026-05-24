function capturarValores() {
    var texto    = document.getElementById("cajaTexto").value;
    var numero   = document.getElementById("cajaNumero").value;
    var password = document.getElementById("cajaPassword").value;
    var fecha    = document.getElementById("cajaFecha").value;
    var hora     = document.getElementById("cajaHora").value;
    var radio    = document.getElementById("cajaRadio").checked;
    var check    = document.getElementById("cajaCheck").checked;
    var select   = document.getElementById("cajaSelect").value;

    var mensaje =
        "TEXTO: "     + texto    + "\n" +
        "NUMERO: "    + numero   + "\n" +
        "PASSSWORD: " + password + "\n" +
        "FECHA: "     + fecha    + "\n" +
        "HORA: "      + hora     + "\n" +
        "RADIO: "     + radio    + "\n" +
        "CHECKBOX: "  + check    + "\n" +
        "SELECT: "    + select;

    alert(mensaje);
}
