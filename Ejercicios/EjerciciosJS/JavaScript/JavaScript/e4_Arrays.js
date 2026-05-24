/*4. Crea un array de números aleatorios, 
ordénalos y muéstralos en una lista desordenada*/
let numeros=[] //new Array()
let cantidad=Math.floor((Math.random()*20)+1)
for (let index = 0; index < cantidad; index++) {
    numeros.push(Math.floor(Math.random()*89+10))
      //para ir poniendolos al final es la mas rapida
}
document.writeln(numeros+"<br>")

/*5. Crea una función que devuelva el último elemento de un array*/

//FUNCION
function devolverUltimo(array){
    return array[array.length-1]//ULTIMA POSICION
}
document.writeln(devolverUltimo(numeros))


