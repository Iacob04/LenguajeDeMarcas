/*CAPTURAR VALORES*/ 
function capturarValores(){
    let texto =document.querySelector("#idTexto").value
    let numero =document.querySelector("#idNumero").value
    let password =document.querySelector("#idPassword").value
    let fecha =document.querySelector("#idFecha").value
    let hora =document.querySelector("#idHora").value
    let radio =document.querySelector("#idRadio").value
    let checkbox =document.querySelector("#idCheckbox").value
    let select =document.querySelector("#idSelect").value

    //cuando hago esto es checkear los valores
    let visualizar=""
    visualizar+=texto + "texto : \n"
    visualizar+=numero+"\n"
    visualizar+=password+"\n"
    visualizar+=fecha+"\n"
    visualizar+=hora+"\n"
    visualizar+=radio+"\n"
    visualizar+=checkbox+"\n"
    visualizar+=select+"\n"
    alert(visualizar)
}
