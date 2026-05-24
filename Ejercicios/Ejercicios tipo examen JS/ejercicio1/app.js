const nameInput   = document.getElementById("product-name");
const priceInput  = document.getElementById("product-price");
const addBtn      = document.getElementById("add-btn");
const errorMsg    = document.getElementById("error-msg");
const productList = document.getElementById("product-list");
const totalSpan   = document.getElementById("total");

addBtn.addEventListener("click", function () {
    const name  = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    // Validación nombre
    if (name === "") {
        errorMsg.textContent = "El nombre del producto no puede estar vacío.";
        return;
    }
    if (name.length < 3) {
        errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    }

    // Validación precio
    if (isNaN(price) || price <= 0) {
        errorMsg.textContent = "El precio debe ser un número mayor que 0.";
        return;
    }

    // Sin errores
    errorMsg.textContent = "";

    // Crear li
    const li = document.createElement("li");
    li.dataset.price = price;

    const textoSpan = document.createElement("span");
    textoSpan.textContent = name + " — " + price.toFixed(2) + "€";
    li.appendChild(textoSpan);

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", function () {
        li.remove();
        actualizarTotal();
    });

    li.appendChild(deleteBtn);
    productList.appendChild(li);

    // Limpiar campos
    nameInput.value  = "";
    priceInput.value = "";
    nameInput.focus();

    actualizarTotal();
});

function actualizarTotal() {
    const items = document.querySelectorAll("#product-list li");
    let total = 0;
    items.forEach(function (li) {
        total += parseFloat(li.dataset.price);
    });
    totalSpan.textContent = total.toFixed(2);
}
