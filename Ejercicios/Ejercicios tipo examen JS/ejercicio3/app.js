const form        = document.getElementById("register-form");
const nameInput   = document.getElementById("name");
const emailInput  = document.getElementById("email");
const passInput   = document.getElementById("password");
const nameError   = document.getElementById("name-error");
const emailError  = document.getElementById("email-error");
const passError   = document.getElementById("pass-error");
const summary     = document.getElementById("summary");
const summaryName = document.getElementById("summary-name");
const summaryEmail= document.getElementById("summary-email");
const backBtn     = document.getElementById("back-btn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name  = nameInput.value.trim();
    const email = emailInput.value.trim();
    const pass  = passInput.value;
    let hayError = false;

    // Limpiar errores anteriores
    nameError.textContent  = "";
    emailError.textContent = "";
    passError.textContent  = "";

    // Validar nombre
    if (name === "") {
        nameError.textContent = "El nombre no puede estar vacío.";
        hayError = true;
    } else if (name.length < 3) {
        nameError.textContent = "El nombre debe tener al menos 3 caracteres.";
        hayError = true;
    }

    // Validar email
    if (email === "") {
        emailError.textContent = "El email no puede estar vacío.";
        hayError = true;
    } else if (!email.includes("@") || !email.includes(".")) {
        emailError.textContent = "Introduce un email válido (debe contener @ y .)";
        hayError = true;
    }

    // Validar contraseña
    if (pass.length < 6) {
        passError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        hayError = true;
    }

    if (hayError) {
        return;
    }

    // Todo válido: mostrar resumen
    summaryName.textContent  = "Nombre: " + name;
    summaryEmail.textContent = "Email: " + email;

    form.style.display    = "none";
    summary.style.display = "block";
});

backBtn.addEventListener("click", function () {
    // Limpiar formulario
    nameInput.value  = "";
    emailInput.value = "";
    passInput.value  = "";
    nameError.textContent  = "";
    emailError.textContent = "";
    passError.textContent  = "";

    summary.style.display = "none";
    form.style.display    = "block";
});
