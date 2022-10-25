let nombre = "";
let apellido = "";
let dni = "";
let pregunta = true;
let prestamo = 0;
let cuotas = 0;
let tasaAnual = 0;
let cliente = null || JSON.parse(localStorage.getItem("persona"));
let cuotaMensual;

const prestamoP = document.createElement("p");

const divPrestamos = document.getElementById("divPrestamos");

const inputNombre = document.getElementById("inputNombre");

const inputApellido = document.getElementById("inputApellido");

const inputDni = document.getElementById("inputDni");

const inputMontoPrestamo = document.getElementById("inputMontoPrestamo");

const inputCuotas = document.getElementById("inputCuotas");

const inputTasa = document.getElementById("inputTasa");

const buttonSubmit = document.getElementById("buttonSubmit");

const buttonPrestamos = document.getElementById("buttonPrestamos");

const buttonLimpieza = document.getElementById("buttonLimpieza");

divPrestamos.appendChild(prestamoP);

inputNombre.addEventListener("input", () => (nombre = inputNombre.value));

inputApellido.addEventListener("input", () => (apellido = inputApellido.value));

inputDni.addEventListener("input", () => (dni = inputDni.value));

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
function Persona(nombre, apellido, dni) {
  (this.nombre = nombre),
    (this.apellido = apellido),
    (this.dni = dni),
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
  cliente === null ? (cliente = new Persona(nombre, apellido, dni)) : cliente;
  cuotaMensual = creacionPrestamo();
  localStorage.setItem("persona", JSON.stringify(cliente));
  prestamoP.innerHTML = `Su nombre: ${cliente.nombre} ${cliente.apellido} <br>
  Dni: ${cliente.dni} <br> Cuota mensual: ${cuotaMensual.toFixed(2)}`;
}

function mostrarPrestamos(e) {
  e.preventDefault();
  prestamoP.innerHTML = `Su nombre: ${cliente.nombre} ${cliente.apellido} <br>
  Dni: ${cliente.dni} <br> <br> ${prestamosEnArray(cliente.prestamos)}`;
}

function limpiarLocal(e) {
  e.preventDefault();
  cliente = null;
  localStorage.removeItem("persona");
  prestamoP.innerHTML = "";
}

function prestamosEnArray(array) {
  let valores = "";
  for (let i = 0; i < array.length; i++) {
    let cuotaValor = array[i].valorCuota;
    valores += `Prestamo N°${i + 1} <br> Monto préstamo: ${
      array[i].prestamo
    } <br> Cantidad de cuotas: ${
      array[i].cuotas
    } <br> Valor de cada cuota: $${cuotaValor.toFixed(2)}<br><br>`;
  }
  return valores;
}

function creacionPrestamo() {
  let valorCuota = calculoCuota(prestamo, tasaAnual / 12, cuotas);
  let prestamoIndividual = new Prestamo(prestamo, cuotas, valorCuota);

  cliente.prestamos.push(prestamoIndividual);
  return valorCuota;
}

function cantidadCuotas(numCuotas) {
  if (numCuotas < 12 || numCuotas > 60) {
    prestamoP.innerHTML = "Las cuotas son entre 12 y 60";
  } else {
    prestamoP.innerHTML = "";
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
