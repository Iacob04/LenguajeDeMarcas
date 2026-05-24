// ── REFERENCIAS AL DOM ────────────────────────────────────────────────────────
// Guardamos referencias a todos los elementos que vamos a usar
const form        = document.getElementById("register-form"); // el <form> completo
const nameInput   = document.getElementById("name");          // input nombre
const emailInput  = document.getElementById("email");         // input email
const passInput   = document.getElementById("password");      // input contraseña
const nameError   = document.getElementById("name-error");    // <span> error del nombre
const emailError  = document.getElementById("email-error");   // <span> error del email
const passError   = document.getElementById("pass-error");    // <span> error de la contraseña
const summary     = document.getElementById("summary");       // bloque "resumen" (oculto al inicio)
const summaryName = document.getElementById("summary-name");  // <p> donde mostramos el nombre
const summaryEmail= document.getElementById("summary-email"); // <p> donde mostramos el email
const backBtn     = document.getElementById("back-btn");      // botón "Volver al formulario"

// ── EVENTO: ENVÍO DEL FORMULARIO ──────────────────────────────────────────────
// Usamos "submit" en el <form> en lugar de "click" en un botón
// porque así también funciona al pulsar Enter en un campo
form.addEventListener("submit", function (e) {

    // e.preventDefault() CANCELA el comportamiento por defecto del formulario
    // Sin esto, al hacer submit la página se recargaría y perderíamos los datos
    e.preventDefault();

    // .trim() elimina espacios al principio y al final
    const name  = nameInput.value.trim();
    const email = emailInput.value.trim();
    const pass  = passInput.value; // la contraseña NO se hace trim (podría tener espacios intencionados)

    // Variable bandera: empezamos asumiendo que no hay errores
    // Se pondrá a true si encontramos algún problema
    let hayError = false;

    // ── LIMPIAR ERRORES ANTERIORES ────────────────────────────────────────────
    // Borramos los mensajes de error de la validación anterior
    // para que no se mezclen con los de esta nueva validación
    nameError.textContent  = "";
    emailError.textContent = "";
    passError.textContent  = "";

    // ── VALIDAR NOMBRE ────────────────────────────────────────────────────────
    // Con "hayError = true" marcamos el error pero NO hacemos return todavía
    // Así podemos mostrar TODOS los errores a la vez, no solo el primero
    if (name === "") {
        nameError.textContent = "El nombre no puede estar vacío.";
        hayError = true; // marcamos error pero seguimos comprobando los demás campos
    } else if (name.length < 3) {
        // else if → solo se comprueba si la condición anterior era false
        // Si el nombre está vacío no tiene sentido comprobar la longitud también
        nameError.textContent = "El nombre debe tener al menos 3 caracteres.";
        hayError = true;
    }

    // ── VALIDAR EMAIL ─────────────────────────────────────────────────────────
    if (email === "") {
        emailError.textContent = "El email no puede estar vacío.";
        hayError = true;
    } else if (!email.includes("@") || !email.includes(".")) {
        // .includes("@") devuelve true si el string contiene "@"
        // El "!" delante lo niega → true si NO contiene "@"
        // || significa "o" → entra en el if si falta "@" O si falta "."
        emailError.textContent = "Introduce un email válido (debe contener @ y .)";
        hayError = true;
    }

    // ── VALIDAR CONTRASEÑA ────────────────────────────────────────────────────
    // .length devuelve el número de caracteres del string
    if (pass.length < 6) {
        passError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        hayError = true;
    }

    // ── COMPROBAR SI HAY ALGÚN ERROR ──────────────────────────────────────────
    // Solo ahora, después de comprobar todo, cortamos si hay errores
    if (hayError) {
        return; // sale de la función — el formulario no se procesa
    }

    // ── TODO VÁLIDO: MOSTRAR RESUMEN ──────────────────────────────────────────
    // Si llegamos aquí es porque todas las validaciones pasaron
    summaryName.textContent  = "Nombre: " + name;
    summaryEmail.textContent = "Email: " + email;

    // Ocultamos el formulario y mostramos el resumen
    // style.display = "none" → oculta el elemento (como si no existiera)
    // style.display = "block" → muestra el elemento como bloque
    form.style.display    = "none";
    summary.style.display = "block";
});

// ── EVENTO: VOLVER AL FORMULARIO ──────────────────────────────────────────────
backBtn.addEventListener("click", function () {

    // Limpiamos todos los campos del formulario
    nameInput.value  = "";
    emailInput.value = "";
    passInput.value  = "";

    // Limpiamos también los mensajes de error por si los había
    nameError.textContent  = "";
    emailError.textContent = "";
    passError.textContent  = "";

    // Ocultamos el resumen y volvemos a mostrar el formulario
    summary.style.display = "none";
    form.style.display    = "block";
});
