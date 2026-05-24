const opciones = document.querySelectorAll(".option");
const botones  = document.querySelectorAll(".vote-btn");
const winner   = document.getElementById("winner");

botones.forEach(function (btn) {
    btn.addEventListener("click", function () {
        // Incrementar el contador de esta opción
        const option     = btn.parentElement;
        const countSpan  = option.querySelector(".vote-count");
        countSpan.textContent = parseInt(countSpan.textContent) + 1;

        // Deshabilitar todos los botones (un solo voto)
        botones.forEach(function (b) {
            b.disabled = true;
        });

        actualizarPorcentajes();
        mostrarGanador();
    });
});

function actualizarPorcentajes() {
    let total = 0;
    opciones.forEach(function (opt) {
        total += parseInt(opt.querySelector(".vote-count").textContent);
    });

    opciones.forEach(function (opt) {
        const votos = parseInt(opt.querySelector(".vote-count").textContent);
        const pct   = total > 0 ? Math.round((votos / total) * 100) : 0;
        opt.querySelector(".percentage").textContent = pct + "%";
    });
}

function mostrarGanador() {
    let maxVotos  = -1;
    let nombreGanador = "";

    opciones.forEach(function (opt) {
        const votos = parseInt(opt.querySelector(".vote-count").textContent);
        if (votos > maxVotos) {
            maxVotos      = votos;
            nombreGanador = opt.querySelector(".option-name").textContent;
        }
    });

    winner.textContent = "Ganador: " + nombreGanador + " con " + maxVotos + " voto/s";
}
