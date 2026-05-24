const nombreAlumno = document.getElementById('student-name');
const notaAlumno   = document.getElementById('student-grade');
const addBtn       = document.getElementById("add-btn");
const errorMsg     = document.getElementById("error-msg");
const studentList = document.getElementById("student-list");



addBtn.addEventListener("click", function () {
let notaCalificativa = "";
// Validación nombre
    if (nombreAlumno.value === "") {
        errorMsg.textContent = "El nombre del alumno no puede estar vacío.";
        return;
    }
    if (nombreAlumno.value.length < 3 ) {
        errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    }
    
// Validación nota

    if(notaAlumno.value === "" ){
        errorMsg.textContent = "La nota no puede estar vacía";
        return;
    }
    if(notaAlumno.value < 0 || notaAlumno.value >10  ){
        errorMsg.textContent = "La nota no puede ser negativa o mayor a 10";
        return;
    }
    if(notaAlumno.value >= 0 && notaAlumno.value <= 4.9 ){
      notaCalificativa = "Suspenso";

    }
    if(notaAlumno.value >= 5 && notaAlumno.value <= 6.9 ){
      notaCalificativa = "Aprobado";
      
    }
    if(notaAlumno.value >= 7 && notaAlumno.value <= 8.9 ){
      notaCalificativa = "Notable";
      
    }
    if(notaAlumno.value >= 9 && notaAlumno.value <= 10 ){
      notaCalificativa = "Sobresaliente";
      
    }   
    
    // Sin errores
    errorMsg.textContent = "";

     // Crear li
    const li = document.createElement("li");
    li.dataset.nombreAlumno = nombreAlumno.value;
    li.dataset.grade = notaAlumno.value;

    const textoSpan = document.createElement("span");
    textoSpan.textContent = nombreAlumno.value + " — " + notaAlumno.value +" "+ notaCalificativa;
    li.appendChild(textoSpan);

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        actualizarMedia();
    });

    li.appendChild(deleteBtn);
    studentList.appendChild(li);

    // Limpiar campos
    nombreAlumno.value  = "";
    notaAlumno.value = "";
    nombreAlumno.focus();

    actualizarMedia();

});

function actualizarMedia(){
    // Coge todos los li que hay dentro de #student-list
    const items = document.querySelectorAll("#student-list li");
    
    // Si no hay ningún alumno, muestra "—" y sale de la función
    if (items.length === 0) {
        document.getElementById("average").textContent = "—";
        return;
    }
    
    // Variable acumuladora que irá sumando todas las notas
    let total = 0;
    
    // Recorre cada li y suma su nota guardada en dataset.grade
    // parseFloat convierte el string "7.5" al número 7.5
    items.forEach(function(li) {
        total += parseFloat(li.dataset.grade);
    });
    
    // Divide el total entre el número de alumnos y muestra la media
    // .toFixed(2) redondea a 2 decimales → ej: 7.333... → "7.33"
    document.getElementById("average").textContent = (total / items.length).toFixed(2);
}
