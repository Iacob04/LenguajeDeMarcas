# Apuntes JavaScript DOM — Examen
> Basados en los 10 proyectos de práctica: Carrito, Buscador, Formulario, Contador de votos, Lista de tareas, Registro de alumnos, Agenda de contactos, Banco de palabras, Calculadora de propinas y Generador de quiniela.

---

## Índice
1. [Selección de elementos del DOM](#1-selección-de-elementos-del-dom)
2. [Eventos y addEventListener](#2-eventos-y-addeventlistener)
3. [Leer y escribir en el DOM](#3-leer-y-escribir-en-el-dom)
4. [Crear y eliminar elementos dinámicamente](#4-crear-y-eliminar-elementos-dinámicamente)
5. [Validación de formularios](#5-validación-de-formularios)
6. [dataset — guardar datos en el HTML](#6-dataset--guardar-datos-en-el-html)
7. [Mostrar y ocultar elementos](#7-mostrar-y-ocultar-elementos)
8. [Clases CSS desde JavaScript](#8-clases-css-desde-javascript)
9. [Recorrer listas de elementos](#9-recorrer-listas-de-elementos)
10. [Números: parseFloat, parseInt, isNaN, toFixed](#10-números-parsefloat-parseint-isnan-tofixed)
11. [Strings: métodos esenciales](#11-strings-métodos-esenciales)
12. [Arrays: métodos usados en los ejercicios](#12-arrays-métodos-usados-en-los-ejercicios)
13. [Math: random, floor, round](#13-math-random-floor-round)
14. [Variables de estado fuera del evento](#14-variables-de-estado-fuera-del-evento)
15. [Closures — por qué funciona el botón Eliminar](#15-closures--por-qué-funciona-el-botón-eliminar)
16. [Prevenir el comportamiento por defecto](#16-prevenir-el-comportamiento-por-defecto)
17. [Patrones completos de los ejercicios](#17-patrones-completos-de-los-ejercicios)
18. [Errores típicos de examen](#18-errores-típicos-de-examen)
19. [Referencia rápida — chuleta de métodos](#19-referencia-rápida--chuleta-de-métodos)

---

## 1. Selección de elementos del DOM

Antes de poder hacer nada con un elemento HTML hay que **obtener una referencia** a él desde JavaScript.

### `getElementById`
Devuelve **un solo elemento** por su `id`. Es la forma más rápida y directa.
```js
const addBtn  = document.getElementById("add-btn");
const errorMsg = document.getElementById("error-msg");
const total   = document.getElementById("total");
```
> Si el `id` no existe en el HTML devuelve `null`. Cuidado con los errores de escritura.

### `querySelector`
Devuelve **el primer elemento** que coincide con un selector CSS. Más flexible que `getElementById`.
```js
const countSpan = option.querySelector(".vote-count");   // clase CSS
const nameSpan  = opt.querySelector(".option-name");     // clase CSS
```

### `querySelectorAll`
Devuelve **todos los elementos** que coinciden en una `NodeList` (parecida a un array pero no exactamente un array).
```js
const items   = document.querySelectorAll("#product-list li");
const botones = document.querySelectorAll(".vote-btn");
const opciones = document.querySelectorAll(".option");
```
> Una `NodeList` se puede recorrer con `forEach` directamente, pero **no tiene** `sort()`, `map()`, `filter()`, etc. Para usarlos hay que convertirla a array.

### Convertir NodeList a Array
```js
// Spread operator — se usa en Banco de palabras para poder llamar a .sort()
const items = [...document.querySelectorAll("#word-list li")];
```

### Cuándo usar cada uno
| Método | Cuándo usarlo |
|---|---|
| `getElementById("id")` | Cuando conoces el `id` exacto — es el más rápido |
| `querySelector(".clase")` | Cuando buscas por clase o selector complejo dentro de un elemento |
| `querySelectorAll("selector")` | Cuando necesitas TODOS los elementos que coincidan |

---

## 2. Eventos y `addEventListener`

Un **evento** es algo que ocurre en la página: un clic, escribir texto, enviar un formulario...

```js
elemento.addEventListener("tipo-de-evento", function () {
    // código que se ejecuta cuando ocurre el evento
});
```

### Eventos usados en los ejercicios

| Evento | Cuándo se dispara | Ejercicio donde aparece |
|---|---|---|
| `"click"` | Al hacer clic en botón, li, etc. | Todos |
| `"input"` | Cada vez que el usuario escribe/borra una letra | Buscador, Agenda |
| `"change"` | Al cambiar el valor y perder el foco (o al marcar checkbox) | Lista de tareas |
| `"submit"` | Al enviar un `<form>` | Formulario de registro |

### Diferencia entre `input` y `change`
- `input` → se dispara **mientras escribes**, letra a letra. Perfecto para búsqueda en tiempo real.
- `change` → se dispara **al terminar** de editar (cuando el elemento pierde el foco). Útil para checkboxes.

```js
// Búsqueda en tiempo real — Buscador de lista y Agenda de contactos
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    // ... filtrar elementos
});

// Checkbox — Lista de tareas
checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
        li.classList.add("completada");
    } else {
        li.classList.remove("completada");
    }
});
```

### Añadir un listener DENTRO de otro (listener anidado)
Esto es muy común: al crear un botón dinámicamente se le añade su propio listener dentro del listener del botón "Añadir".
```js
addBtn.addEventListener("click", function () {
    const li = document.createElement("li");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    // Listener del botón eliminar — creado DENTRO del listener del addBtn
    deleteBtn.addEventListener("click", function () {
        li.remove();            // gracias al closure, sabe cuál es "su" li
        actualizarTotal();
    });

    li.appendChild(deleteBtn);
    productList.appendChild(li);
});
```

---

## 3. Leer y escribir en el DOM

### Leer el valor de un `<input>`
```js
const name  = nameInput.value;         // texto tal cual
const name  = nameInput.value.trim();  // sin espacios al inicio/final
const price = parseFloat(priceInput.value); // convertido a número decimal
```

### Escribir texto en un elemento
```js
errorMsg.textContent = "El nombre no puede estar vacío.";
totalSpan.textContent = total.toFixed(2);
countSpan.textContent = items.length;
```

> **`textContent` vs `innerHTML`**
> - `textContent` escribe **texto plano** — más seguro, no interpreta HTML.
> - `innerHTML` interpreta **etiquetas HTML** — útil para limpiar listas (`lista.innerHTML = ""`), pero peligroso con datos del usuario.

### Limpiar un input después de añadir
```js
nameInput.value  = "";
priceInput.value = "";
nameInput.focus(); // devuelve el cursor al primer campo
```

### Limpiar toda una lista de elementos
```js
quinielaList.innerHTML = ""; // elimina todos los hijos de golpe
```
> Esto se usa en el Generador de quiniela antes de generar la nueva lista.

---

## 4. Crear y eliminar elementos dinámicamente

Este es el patrón central de todos los ejercicios. Hay que sabérselo de memoria.

### Patrón completo: crear un `<li>` con texto y botón Eliminar
```js
// 1. Crear el li
const li = document.createElement("li");

// 2. (Opcional) Guardar datos en dataset
li.dataset.price = price;

// 3. Crear el span de texto
const textoSpan = document.createElement("span");
textoSpan.textContent = name + " — " + price.toFixed(2) + "€";
li.appendChild(textoSpan);   // añadir span DENTRO del li

// 4. Crear el botón Eliminar
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Eliminar";
deleteBtn.addEventListener("click", function () {
    li.remove();             // elimina el li del DOM
    actualizarTotal();       // recalcula después de eliminar
});
li.appendChild(deleteBtn);   // añadir botón DENTRO del li

// 5. Añadir el li a la lista del HTML
productList.appendChild(li);
```

### Orden importante
```
createElement → configurar propiedades → appendChild de hijos → appendChild a la lista
```
Si añades al DOM antes de terminar de montar el elemento, puede dar resultados raros.

### `appendChild` mueve si ya existe
```js
// Si el li YA está en el DOM, appendChild lo MUEVE (no lo duplica)
// Esto se aprovecha en Banco de palabras al ordenar:
items.forEach(function (li) {
    wordList.appendChild(li); // reordena sin duplicar
});
```

### `remove()`
```js
li.remove(); // elimina el elemento del DOM completamente
```

---

## 5. Validación de formularios

La validación siempre sigue el mismo esquema: **comprobar → mostrar error y `return` → continuar si todo es válido**.

### Esquema básico de validación con `return`
```js
addBtn.addEventListener("click", function () {

    // Validación 1: campo vacío
    if (nameInput.value.trim() === "") {
        errorMsg.textContent = "El nombre no puede estar vacío.";
        return;  // ← IMPORTANTE: corta la función aquí, no sigue
    }

    // Validación 2: longitud mínima
    if (nameInput.value.length < 3) {
        errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    }

    // Validación 3: número mayor que 0
    if (isNaN(price) || price <= 0) {
        errorMsg.textContent = "El precio debe ser un número mayor que 0.";
        return;
    }

    // Si llegamos aquí: todo correcto
    errorMsg.textContent = ""; // limpiar error anterior
    // ... hacer la acción
});
```

### Validación con `hayError` (formularios con múltiples campos)
Cuando hay varios campos y quieres mostrar **todos los errores a la vez** (no parar en el primero):
```js
// Patrón del Formulario de registro
let hayError = false;

// Limpiar todos los errores primero
nameError.textContent  = "";
emailError.textContent = "";
passError.textContent  = "";

if (name === "") {
    nameError.textContent = "El nombre no puede estar vacío.";
    hayError = true;          // marca el error pero NO hace return
}
if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Introduce un email válido.";
    hayError = true;
}
if (pass.length < 6) {
    passError.textContent = "La contraseña debe tener al menos 6 caracteres.";
    hayError = true;
}

if (hayError) {
    return;  // solo para al final, después de revisar todo
}
```

### Validaciones más comunes en examen
```js
// Campo vacío (texto)
if (valor === "") { ... }
if (valor.trim() === "") { ... }  // con trim para evitar solo espacios

// Longitud mínima
if (valor.length < 3) { ... }

// Longitud exacta (teléfono 9 dígitos)
if (valor.length !== 9) { ... }

// Número válido y positivo
if (isNaN(numero) || numero <= 0) { ... }

// Rango numérico
if (numero < 0 || numero > 10) { ... }

// Email básico
if (!email.includes("@") || !email.includes(".")) { ... }

// Duplicado en lista
const items = document.querySelectorAll("#word-list li");
let existe = false;
items.forEach(function (li) {
    if (li.dataset.word === valor.toLowerCase()) {
        existe = true;
    }
});
if (existe) {
    errorMsg.textContent = "Esa palabra ya está en la lista.";
    return;
}
```

### Calificaciones por nota (Registro de alumnos)
```js
let notaCalificativa = "";
if (nota >= 0   && nota <= 4.9)  { notaCalificativa = "Suspenso"; }
if (nota >= 5   && nota <= 6.9)  { notaCalificativa = "Aprobado"; }
if (nota >= 7   && nota <= 8.9)  { notaCalificativa = "Notable"; }
if (nota >= 9   && nota <= 10)   { notaCalificativa = "Sobresaliente"; }
```

---

## 6. `dataset` — guardar datos en el HTML

`dataset` permite guardar datos personalizados en un elemento HTML para recuperarlos después desde JS.

### Cómo funciona
```html
<!-- En HTML se escribiría así: -->
<li data-price="12.50" data-nombre="Manzana"></li>
```
```js
// Pero en JS se crea así (camelCase):
li.dataset.price = price;           // genera data-price en el HTML
li.dataset.nombreContacto = nombre; // genera data-nombre-contacto
```

### Por qué se usa en los ejercicios
En el Carrito de la compra, el precio está guardado en `li.dataset.price`. Cuando se elimina un producto, la función `actualizarTotal()` no tiene que parsear el texto visible, simplemente lee el dato numérico guardado:
```js
function actualizarTotal() {
    const items = document.querySelectorAll("#product-list li");
    let total = 0;
    items.forEach(function (li) {
        total += parseFloat(li.dataset.price);  // lee el dato guardado
    });
    totalSpan.textContent = total.toFixed(2);
}
```

### Otros usos de dataset en los ejercicios
```js
// Registro de alumnos
li.dataset.nombreAlumno = nombreAlumno.value;
li.dataset.grade        = notaAlumno.value;

// Media de clase leyendo dataset.grade
items.forEach(function(li) {
    total += parseFloat(li.dataset.grade);
});

// Banco de palabras (para comparar sin distinguir mayúsculas)
li.dataset.word = valor.toLowerCase();

// Agenda de contactos (para buscar sin parsear el texto visible)
li.dataset.nombreContacto = nombreContacto.value;
const nombre = li.dataset.nombreContacto.toLowerCase();
```

---

## 7. Mostrar y ocultar elementos

### Con `style.display`
```js
// Ocultar
li.style.display = "none";

// Mostrar (volver al tipo por defecto del elemento)
li.style.display = "list-item";  // para un <li>
li.style.display = "block";      // para un <div>, <p>, <span>
li.style.display = "flex";       // para un <li> con flexbox (Lista de tareas)

// Mostrar condicionalmente con ternario
li.style.display = coincide ? "list-item" : "none";
```

### Ocultar/mostrar bloques enteros (Formulario de registro)
```js
// Al enviar el formulario correctamente:
form.style.display    = "none";   // ocultar formulario
summary.style.display = "block";  // mostrar resumen

// Al pulsar "Volver":
summary.style.display = "none";
form.style.display    = "block";
```

### Patrón de filtrado (Buscador, Lista de tareas, Agenda)
```js
const items = document.querySelectorAll("#item-list li");
items.forEach(function (li) {
    const coincide = li.textContent.toLowerCase().includes(query);
    li.style.display = coincide ? "list-item" : "none";
});
```

---

## 8. Clases CSS desde JavaScript

Manipular clases es la forma más limpia de cambiar el aspecto de un elemento: defines el estilo en CSS y solo activas/desactivas la clase desde JS.

```js
// Añadir clase
li.classList.add("completada");
resultadoSpan.classList.add("res-1");

// Quitar clase
li.classList.remove("completada");
li.classList.remove("duplicada");

// Comprobar si tiene una clase
const completada = li.classList.contains("completada");
if (completada) { ... }
```

### Patrón de botón activo (Lista de tareas — filtros)
```js
function marcarBotonActivo(btn) {
    // Quitar la clase "activo" de todos
    filterAll.classList.remove("activo");
    filterPend.classList.remove("activo");
    filterDone.classList.remove("activo");
    // Añadirla solo al botón pulsado
    btn.classList.add("activo");
}
```

### Resaltar duplicados (Banco de palabras)
```js
// Primero quitar la clase a todos
items.forEach(function (li) {
    li.classList.remove("duplicada");
});
// Luego marcar los que comparten raíz
items.forEach(function (liA, i) {
    items.forEach(function (liB, j) {
        if (i !== j && liA.dataset.word.substring(0, 4) === liB.dataset.word.substring(0, 4)) {
            liA.classList.add("duplicada");
            liB.classList.add("duplicada");
        }
    });
});
```

---

## 9. Recorrer listas de elementos

### `forEach` sobre NodeList
```js
const items = document.querySelectorAll("#product-list li");
items.forEach(function (li) {
    total += parseFloat(li.dataset.price);
});
```

### `forEach` con índice
```js
// El segundo parámetro es el índice (posición: 0, 1, 2...)
items.forEach(function (li, i) {
    items.forEach(function (liB, j) {
        if (i !== j) {   // i !== j evita comparar un elemento consigo mismo
            // ...
        }
    });
});
```

### `for` clásico — usado en Generador de quiniela
```js
for (let i = 1; i <= 14; i++) {
    // genera partido i
}
```

### Contar visibles
```js
function actualizarContador() {
    const items = document.querySelectorAll("#item-list li");
    let visibles = 0;
    items.forEach(function (li) {
        if (li.style.display !== "none") {
            visibles++;
        }
    });
    countSpan.textContent = visibles;
}
```

---

## 10. Números: `parseFloat`, `parseInt`, `isNaN`, `toFixed`

### `parseFloat` — convierte string a número decimal
```js
const price = parseFloat(priceInput.value);  // "12.50" → 12.5
const nota  = parseFloat(li.dataset.grade);  // "7.5" → 7.5
```

### `parseInt` — convierte string a número entero
```js
const votos = parseInt(countSpan.textContent); // "5" → 5
const indice = Math.floor(Math.random() * 3);  // siempre devuelve entero
```

### `isNaN` — comprueba si NO es un número
```js
if (isNaN(price) || price <= 0) {
    errorMsg.textContent = "El precio debe ser un número mayor que 0.";
    return;
}
```
> `isNaN("hola")` → `true` (no es número)
> `isNaN(12.5)` → `false` (sí es número)
> `isNaN("")` → `false` ⚠️ (cadena vacía se convierte a 0, que sí es número) — por eso se valida el campo vacío **antes** que el `isNaN`.

### `toFixed(n)` — redondear a n decimales (devuelve string)
```js
totalSpan.textContent = total.toFixed(2);    // 12.333... → "12.33"
propina.textContent   = propinaValor.toFixed(2) + "€"; // "1.50€"
```
> Devuelve un **string**, no un número. Si necesitas hacer más operaciones, convierte antes con `parseFloat(valor.toFixed(2))`.

### Tabla de conversiones
| Valor de entrada | `parseFloat` | `parseInt` | `isNaN` |
|---|---|---|---|
| `"12.5"` | `12.5` | `12` | `false` |
| `"12"` | `12` | `12` | `false` |
| `""` | `NaN` | `NaN` | `true` |
| `"hola"` | `NaN` | `NaN` | `true` |
| `"12abc"` | `12` | `12` | `false` |

---

## 11. Strings: métodos esenciales

### `.trim()` — eliminar espacios del principio y el final
```js
const valor = taskInput.value.trim(); // "  hola  " → "hola"
```
> **Siempre usar `.trim()` antes de validar** campos de texto para evitar que solo espacios pasen la validación.

### `.toLowerCase()` — convertir a minúsculas
```js
const query = searchInput.value.toLowerCase();
li.dataset.word = valor.toLowerCase(); // guardar en minúsculas para comparar
```
> Imprescindible para búsquedas case-insensitive: "Manzana" y "manzana" serán iguales.

### `.includes(substring)` — comprobar si contiene un texto
```js
// Búsqueda: ¿el nombre del contacto incluye lo que el usuario escribió?
if (nombre.includes(query)) {
    li.style.display = "list-item";
}

// Validación de email
if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Email inválido.";
}
```

### `.length` — número de caracteres
```js
if (valor.length < 3) { ... }    // mínimo 3 caracteres
if (valor.length !== 9) { ... }  // exactamente 9 (teléfono)
```

### `.substring(inicio, fin)` — extraer parte de un string
```js
// Primeros 4 caracteres para comparar raíces de palabras
const raiz = palabra.substring(0, 4); // "manzana" → "manz"
```
> `substring(0, 4)` devuelve desde el índice 0 (incluido) hasta el 4 (no incluido), es decir, 4 caracteres.

### `.toFixed(n)` — números con decimales fijos
*(ya explicado en la sección de números)*

---

## 12. Arrays: métodos usados en los ejercicios

### Spread operator `[...NodeList]` — NodeList a Array
```js
// Necesario para usar .sort()
const items = [...document.querySelectorAll("#word-list li")];
```

### `.forEach(función)` — recorrer sin devolver nada nuevo
```js
items.forEach(function (li) {
    wordList.appendChild(li); // mueve cada li al nuevo orden
});
```

### `.sort(función comparadora)` — ordenar array
```js
items.sort(function (a, b) {
    if (a.dataset.word < b.dataset.word) { return -1; } // a va antes
    if (a.dataset.word > b.dataset.word) { return 1; }  // b va antes
    return 0;                                            // iguales
});
```
> La función comparadora recibe dos elementos y devuelve:
> - Número **negativo** → `a` va antes que `b`
> - Número **positivo** → `b` va antes que `a`
> - **0** → son iguales, no importa el orden

### Array de opciones — Generador de quiniela
```js
const resultados = ["1", "X", "2"];
const indice     = Math.floor(Math.random() * 3); // 0, 1 o 2
const resultado  = resultados[indice];             // elemento aleatorio
```

---

## 13. Math: `random`, `floor`, `round`

### `Math.random()` — número aleatorio entre 0 (incluido) y 1 (excluido)
```js
Math.random() // → 0.0 a 0.9999...
```

### `Math.floor()` — redondear hacia abajo (número entero)
```js
Math.floor(2.9)  // → 2
Math.floor(2.1)  // → 2
Math.floor(0)    // → 0
```

### Generar entero aleatorio entre 0 y N-1
```js
// Fórmula estándar:
Math.floor(Math.random() * N)

// En la quiniela: 0, 1 o 2 (3 posibilidades)
Math.floor(Math.random() * 3) // → 0, 1 o 2
```

### Generar entero aleatorio entre MIN y MAX (ambos incluidos)
```js
// Fórmula general:
Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
```

### `Math.round()` — redondear al entero más cercano
```js
// En el Contador de votos para calcular porcentaje:
const pct = total > 0 ? Math.round((votos / total) * 100) : 0;
```
> `Math.round(2.4)` → 2 | `Math.round(2.5)` → 3

---

## 14. Variables de estado fuera del evento

Cuando una variable tiene que **persistir** entre varias pulsaciones de un botón, se declara **fuera** del listener.

```js
// Generador de quiniela — cuenta cuántas se han generado en total
let totalQuinielas = 0;  // ← FUERA del listener

btnGenerar.addEventListener("click", function () {
    // ... generar quiniela ...
    totalQuinielas++;  // se incrementa en cada pulsación
    historialSpan.textContent = totalQuinielas;
});
```

```js
// Lista de tareas — recuerda qué filtro está activo
let filtroActivo = "todas";  // ← FUERA del listener

filterAll.addEventListener("click", function () {
    filtroActivo = "todas";
    marcarBotonActivo(filterAll);
    aplicarFiltro();
});
```

> Si `totalQuinielas` estuviera **dentro** del listener, se reiniciaría a 0 en cada clic.

---

## 15. Closures — por qué funciona el botón Eliminar

Un **closure** es cuando una función interna "recuerda" las variables del scope donde fue creada, incluso después de que ese scope haya terminado.

```js
addBtn.addEventListener("click", function () {
    const li = document.createElement("li"); // ← variable local de este click

    const deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", function () {
        li.remove(); // ← esta función "recuerda" su propio li
                     //   aunque el listener del addBtn ya terminó
    });
});
```

> Cada vez que se pulsa "Añadir" se crea un `li` diferente. El listener del botón Eliminar correspondiente siempre recuerda **su** `li` gracias al closure. Por eso cuando pulsas el botón de cualquier producto, elimina exactamente ese y no otro.

---

## 16. Prevenir el comportamiento por defecto

Cuando usas un `<form>`, al pulsar un botón de tipo `submit` el navegador recarga la página por defecto. Para evitarlo:

```js
form.addEventListener("submit", function (e) {
    e.preventDefault(); // ← evita la recarga de la página

    // ... validar y procesar el formulario
});
```

> El parámetro `e` (también llamado `event`) es el objeto del evento. `e.preventDefault()` cancela la acción nativa del navegador.

---

## 17. Patrones completos de los ejercicios

### Patrón: Añadir a lista con total / contador
*(Carrito de la compra, Registro de alumnos)*
```
1. Leer valor del input
2. Validar (return si hay error)
3. Limpiar errorMsg
4. createElement("li")
5. Guardar datos en dataset
6. Crear span de texto con textContent
7. Crear button "Eliminar" con su listener (closure)
8. appendChild(span), appendChild(button) al li
9. appendChild(li) a la lista
10. Limpiar inputs, .focus()
11. Llamar a función actualizarTotal() / actualizarMedia()
```

### Patrón: Búsqueda en tiempo real
*(Buscador de lista, Agenda de contactos)*
```js
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll("#lista li");
    items.forEach(function (li) {
        const texto = li.dataset.nombre.toLowerCase(); // o li.textContent
        li.style.display = texto.includes(query) ? "list-item" : "none";
    });
});
```

### Patrón: Función que recalcula al añadir y al eliminar
*(Carrito, Alumnos, Tareas, Agenda, Banco)*
```js
// Se llama después de CADA cambio en la lista (añadir o eliminar)
function actualizarTotal() {
    const items = document.querySelectorAll("#lista li");
    let acumulador = 0;
    items.forEach(function (li) {
        acumulador += parseFloat(li.dataset.precio);
    });
    spanTotal.textContent = acumulador.toFixed(2);
}
```

### Patrón: Función reutilizable con parámetro
*(Calculadora de propinas)*
```js
// En lugar de repetir el mismo código 3 veces, una función con parámetro
function calcular(porcentaje) {
    const cuenta = parseFloat(importe.value);
    if (isNaN(cuenta) || cuenta <= 0) { ... return; }
    propina.textContent = (cuenta * porcentaje / 100).toFixed(2) + "€";
    total.textContent   = (cuenta + cuenta * porcentaje / 100).toFixed(2) + "€";
}

btn10.addEventListener("click", function () { calcular(10); });
btn15.addEventListener("click", function () { calcular(15); });
btn20.addEventListener("click", function () { calcular(20); });
```

### Patrón: Generar lista aleatoria
*(Generador de quiniela)*
```js
lista.innerHTML = ""; // limpiar antes de generar
const opciones = ["1", "X", "2"];

for (let i = 1; i <= 14; i++) {
    const resultado = opciones[Math.floor(Math.random() * 3)];
    const li = document.createElement("li");
    li.textContent = "Partido " + i + ": " + resultado;
    lista.appendChild(li);
}
```

### Patrón: Ordenar lista existente
*(Banco de palabras)*
```js
// 1. Sacar los li como array
const items = [...document.querySelectorAll("#word-list li")];
// 2. Ordenar el array
items.sort(function (a, b) {
    if (a.dataset.word < b.dataset.word) return -1;
    if (a.dataset.word > b.dataset.word) return 1;
    return 0;
});
// 3. Volver a insertar (appendChild mueve, no duplica)
items.forEach(function (li) { wordList.appendChild(li); });
```

### Patrón: Filtro con estado
*(Lista de tareas)*
```js
let filtroActivo = "todas"; // estado global

function aplicarFiltro() {
    const items = document.querySelectorAll("#task-list li");
    items.forEach(function (li) {
        const completada = li.classList.contains("completada");
        if (filtroActivo === "todas")       { li.style.display = "flex"; }
        else if (filtroActivo === "pendientes") { li.style.display = completada ? "none" : "flex"; }
        else if (filtroActivo === "completadas") { li.style.display = completada ? "flex" : "none"; }
    });
}
```

### Patrón: Deshabilitar botones después de usarlos
*(Contador de votos — un solo voto por sesión)*
```js
botones.forEach(function (btn) {
    btn.addEventListener("click", function () {
        // ... contar voto ...
        botones.forEach(function (b) {
            b.disabled = true; // deshabilita TODOS los botones
        });
    });
});
```

---

## 18. Errores típicos de examen

### 1. Olvidar `.trim()` al validar
```js
// MAL: "   " (solo espacios) pasa la validación
if (valor === "") { ... }

// BIEN: los espacios se eliminan antes de comprobar
if (valor.trim() === "") { ... }
```

### 2. Olvidar el `return` después de mostrar un error
```js
// MAL: muestra el error pero sigue ejecutando el código de abajo
if (valor === "") {
    errorMsg.textContent = "Error.";
    // falta return — el código continúa y añade un elemento vacío
}

// BIEN
if (valor === "") {
    errorMsg.textContent = "Error.";
    return; // corta la función aquí
}
```

### 3. No limpiar el error cuando los datos son correctos
```js
// Si no limpias, el error de la validación anterior sigue visible
errorMsg.textContent = ""; // ← siempre limpiar antes de proceder
```

### 4. Confundir `textContent` con `value`
```js
// .value → solo para elementos de formulario: input, textarea, select
const texto = nameInput.value;

// .textContent → para cualquier otro elemento HTML: p, span, li, h1...
spanTotal.textContent = "12.50€";
```

### 5. `parseFloat` de un campo vacío
```js
const precio = parseFloat(""); // → NaN
// Por eso hay que validar vacío ANTES de parseFloat:
if (priceInput.value === "") { ... return; }
const precio = parseFloat(priceInput.value); // ya sabemos que tiene algo
```

### 6. No convertir NodeList a Array antes de `.sort()`
```js
// MAL: NodeList no tiene .sort()
const items = document.querySelectorAll("li");
items.sort(...); // TypeError: items.sort is not a function

// BIEN: convertir primero con spread
const items = [...document.querySelectorAll("li")];
items.sort(...); // funciona
```

### 7. `appendChild` duplica si no está en el DOM, mueve si ya está
```js
// Esto NO duplica el li — lo mueve (útil para reordenar)
wordList.appendChild(liExistente);
```

### 8. `e.preventDefault()` solo para `submit`
```js
// Solo los <form> con submit necesitan preventDefault
// Los botones normales (type="button") no envían formularios
form.addEventListener("submit", function (e) {
    e.preventDefault(); // necesario
});
```

### 9. `Math.random()` nunca llega a 1
```js
// Genera 0, 1 o 2 — NUNCA 3
Math.floor(Math.random() * 3)
```

### 10. `toFixed()` devuelve un string
```js
const media = (total / items.length).toFixed(2); // → "7.33" (string)
// Si necesitas hacer más cálculos con este valor, conviértelo primero:
const mediaNum = parseFloat(media);
```

---

## 19. Referencia rápida — chuleta de métodos

### Selección
```js
document.getElementById("id")           // un elemento por id
document.querySelector(".clase")        // primer elemento por selector CSS
document.querySelectorAll("ul li")      // todos los elementos → NodeList
elemento.querySelector(".sub")          // buscar dentro de un elemento
[...nodelist]                           // NodeList → Array
```

### Eventos
```js
elemento.addEventListener("click",   fn)  // clic
elemento.addEventListener("input",   fn)  // escribe (tiempo real)
elemento.addEventListener("change",  fn)  // cambia y pierde foco / checkbox
elemento.addEventListener("submit",  fn)  // enviar formulario
e.preventDefault()                        // cancelar recarga del form
```

### Leer / escribir
```js
input.value                // leer texto de un input
input.value = ""           // limpiar input
input.focus()              // mover cursor al input
elemento.textContent       // leer/escribir texto de un elemento
elemento.innerHTML = ""    // vaciar todos los hijos
```

### Crear elementos
```js
document.createElement("li")     // crear elemento
padre.appendChild(hijo)          // añadir hijo al final
elemento.remove()                // eliminar del DOM
```

### Clases
```js
elemento.classList.add("clase")       // añadir clase
elemento.classList.remove("clase")    // quitar clase
elemento.classList.contains("clase")  // comprobar (true/false)
```

### Dataset
```js
li.dataset.precio = 12.5          // guardar (genera data-precio)
parseFloat(li.dataset.precio)     // leer y convertir a número
li.dataset.nombre = "Ana"         // guardar string
```

### Visibilidad
```js
elemento.style.display = "none"       // ocultar
elemento.style.display = "block"      // mostrar (block)
elemento.style.display = "list-item"  // mostrar (li)
elemento.style.display = "flex"       // mostrar (flexbox)
elemento.disabled = true              // deshabilitar botón
elemento.disabled = false             // habilitar botón
```

### Números y strings
```js
parseFloat("12.5")          // → 12.5
parseInt("12")              // → 12
isNaN(valor)                // → true si NO es número
(12.333).toFixed(2)         // → "12.33"
"hola".trim()               // → "hola" (sin espacios)
"HOLA".toLowerCase()        // → "hola"
"manzana".includes("man")   // → true
"manzana".length            // → 7
"manzana".substring(0, 4)   // → "manz"
```

### Matemáticas
```js
Math.random()               // decimal entre 0 y 0.999...
Math.floor(2.9)             // → 2 (redondear abajo)
Math.round(2.5)             // → 3 (redondear normal)
Math.floor(Math.random()*N) // entero aleatorio 0 a N-1
```

### Arrays
```js
array.forEach(function(item, i) { ... })   // recorrer con índice opcional
array.sort(function(a, b) { return a-b; }) // ordenar números asc
array.sort(function(a,b) {                 // ordenar strings
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
})
```

---

*Apuntes generados a partir de los proyectos: Carrito de la compra · Buscador de lista · Formulario de registro · Contador de votos · Lista de tareas · Registro de alumnos · Agenda de contactos · Banco de palabras · Calculadora de propinas · Generador de quiniela*
