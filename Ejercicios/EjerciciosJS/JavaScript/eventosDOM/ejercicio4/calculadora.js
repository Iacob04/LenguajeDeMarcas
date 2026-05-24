let inputNumero1 = document.querySelector("#idNum1")
let inputNumero2 = document.querySelector("#idNum2")
function Sumar() {
    /*
    let numero1=parseInt(document.getElementById("idNum1").value)
    let numero2=parseInt(document.getElementById("idNum2").value)
    let resultado=numero1+numero2
    document.getElementById("idNumResultado").value=resultado
    */

    let resultado = parseInt(inputNumero1.value) + parseInt(inputNumero2.value)
    document.getElementById("idNumResultado").value = resultado

}
function Restar() {
    let resultado=parseInt(inputNumero1.value) - parseInt(inputNumero2.value)
    document.getElementById("idNumResultado").value=resultado
}

function Producto() {
    let resultado = parseInt(inputNumero1.value) * parseInt(inputNumero2.value)
    document.getElementById("idNumResultado").value = resultado
}

function Dividir() {
    try {
        let resultado = parseInt(inputNumero1.value) / parseInt(inputNumero2.value)
        customElements.getElementById("idNumResultado").value = resultado
    } catch (error) {
        let resultado = error
    } finally {
        document.getElementById("idNumResultado").value = resultado
    }

}
function Limpiar() {
    document.querySelector("#idNum1").value = ""
    document.querySelector("#idNum2").value = ""
}
