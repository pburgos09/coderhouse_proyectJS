let nombre = "";
let apellido = "";
let email = "";
let pregunta = true;
let prestamo = 0;
let cuotas = 0;
let tasaAnual = 0;
let cliente = null || JSON.parse(localStorage.getItem("persona"));
let cuotaMensual;

const divPrestamos = document.getElementById("divPrestamos");

const inputNombre = document.getElementById("inputNombre");

const inputApellido = document.getElementById("inputApellido");

const inputEmail = document.getElementById("inputEmail");

const inputMontoPrestamo = document.getElementById("inputMontoPrestamo");

const inputCuotas = document.getElementById("inputCuotas");

const inputTasa = document.getElementById("inputTasa");

const buttonSubmit = document.getElementById("buttonSubmit");

const buttonPrestamos = document.getElementById("buttonPrestamos");

const buttonLimpieza = document.getElementById("buttonLimpieza");

const divCuotas = document.getElementById("divCuotas");

const tbodySimulado = document.getElementById("tbodySimulado");

const mostrarSimulados = document.getElementById("mostrarSimulados");

const simulado = document.createElement("tr");

const parrafo = document.createElement("p");

inputNombre.addEventListener("input", () => (nombre = inputNombre.value));

inputApellido.addEventListener("input", () => (apellido = inputApellido.value));

inputEmail.addEventListener("input", () => (email = inputEmail.value));

inputMontoPrestamo.addEventListener(
  "input",
  () => (prestamo = inputMontoPrestamo.value)
);

inputCuotas.addEventListener("input", () => cantidadCuotas(inputCuotas.value));

inputTasa.addEventListener("input", () => (tasaAnual = inputTasa.value));

buttonSubmit.addEventListener("click", creacionCliente);

buttonPrestamos.addEventListener("click", mostrarPrestamos);

buttonLimpieza.addEventListener("click", limpiarLocal);

// Funciones constructoras
function Persona(nombre, apellido, email) {
  (this.nombre = nombre),
    (this.apellido = apellido),
    (this.email = email),
    (this.prestamos = []);
}

function Prestamo(prestamo, cuotas, valorCuota) {
  (this.prestamo = prestamo),
    (this.cuotas = cuotas),
    (this.valorCuota = valorCuota);
}

//Funciones a utilizar
function creacionCliente(e) {
  e.preventDefault();
  cliente === null ? (cliente = new Persona(nombre, apellido, email)) : cliente;
  cuotaMensual = creacionPrestamo();
  localStorage.setItem("persona", JSON.stringify(cliente));
  simulado.innerHTML = `<td>$${cuotaMensual.prestamo}</td> <td>${
    cuotaMensual.cuotas
  }</td> <td>$${cuotaMensual.valorCuota.toFixed(2)}</td>`;
  tbodySimulado.appendChild(simulado);
}

function mostrarPrestamos(e) {
  e.preventDefault();
  mostrarSimulados.innerHTML = prestamosEnArray(cliente.prestamos);
}

function limpiarLocal(e) {
  e.preventDefault();
  cliente = null;
  localStorage.removeItem("persona");
  mostrarSimulados.innerHTML = "";
  tbodySimulado.innerHTML = "";
}

function prestamosEnArray(array) {
  let valores = "";
  for (let i = 0; i < array.length; i++) {
    let cuotaValor = array[i].valorCuota;
    valores += `<tr><td>${i + 1}</td><td>$${array[i].prestamo}</td> <td>${
      array[i].cuotas
    }</td> <td>$${cuotaValor.toFixed(2)}</td></tr>`;
  }
  return valores;
}

function creacionPrestamo() {
  let valorCuota = calculoCuota(prestamo, tasaAnual / 12, cuotas);
  let prestamoIndividual = new Prestamo(prestamo, cuotas, valorCuota);

  cliente.prestamos.push(prestamoIndividual);
  return prestamoIndividual;
}

function cantidadCuotas(numCuotas) {
  if (numCuotas < 12 || numCuotas > 60) {
    parrafo.innerHTML = "Las cuotas son entre 12 y 60";
    inputCuotas.classList.add("is-danger");
    parrafo.classList.add("help");
    parrafo.classList.add("is-danger");
    divCuotas.appendChild(parrafo);
  } else {
    inputCuotas.classList.remove("is-danger");
    parrafo.innerHTML = "";
    cuotas = numCuotas;
  }
}

function calculoCuota(prestamoOtorgado, tasaMensual, cuotas) {
  return (
    prestamoOtorgado *
    ((Math.pow(1 + tasaMensual / 100, cuotas) * (tasaMensual / 100)) /
      (Math.pow(1 + tasaMensual / 100, cuotas) - 1))
  );
}
