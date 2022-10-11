alert(
  "Bienvenido para simular un préstamo te vamos a hacer una serie de preguntas a continuación"
);

const nombreYApellido = prompt("¿Cual es tu nombre y apellido?");
const dni = prompt("¿Cual es tu dni?");
const cliente = new Persona(nombreYApellido, dni);
let pregunta = true;
let prestamo = 0;
let cuotas = 0;
let tasaAnual = 83;
preguntaPrestamo();
cantidadCuotas(cuotas);
alert(`La tasa anual para tu préstamo es de ${tasaAnual}%`);
let tasaMensual = tasaAnual / 12;
let cuotaMensual = creacionPrestamo();
alert(`La cuota mensual será de $${cuotaMensual.toFixed(2)}`);
pregunta = confirm("¿Queres simular otro préstamo?");
preguntarPorPrestamo(pregunta);

// Funciones constructoras
function Persona(nombre, dni) {
  (this.nombre = nombre), (this.dni = dni), (this.prestamos = []);
}

function Prestamo(prestamo, cuotas, valorCuota) {
  (this.prestamo = prestamo),
    (this.cuotas = cuotas),
    (this.valorCuota = valorCuota);
}

//Funciones a utilizar
function preguntarPorPrestamo(bool) {
  if (bool) {
    preguntaPrestamo();
    cantidadCuotas(cuotas);
    let valor = creacionPrestamo();
    alert(`La cuota mensual será de $${valor.toFixed(2)}`);
    pregunta = confirm("¿Querés simular otro préstamo?");
    preguntarPorPrestamo(pregunta);
  } else {
    alert("Te muestro todos los prestamos simulados");
    alert(`Nombre de la persona que pide el préstamo: ${
      cliente.nombre
    }.\n\nEstos son los prestamos simulados:\n${prestamosEnArray(
      cliente.prestamos
    )}
    `);
  }
}

function prestamosEnArray(array) {
  let valores = "";
  for (let i = 0; i < array.length; i++) {
    let cuotaValor = array[i].valorCuota;
    valores += `Prestamo N°${i + 1}\nMonto préstamo: ${
      array[i].prestamo
    }\nCantidad de cuotas: ${
      array[i].cuotas
    }\nValor de cada cuota: $${cuotaValor.toFixed(2)}\n\n`;
  }
  return valores;
}

function creacionPrestamo() {
  let valorCuota = calculoCuota(prestamo, tasaMensual, cuotas);

  let prestamoIndividual = new Prestamo(prestamo, cuotas, valorCuota);

  cliente.prestamos.push(prestamoIndividual);
  return valorCuota;
}

function preguntaPrestamo() {
  prestamo = Number(prompt("¿Cual es el monto que querés pedir de prestamo?"));
  cuotas = Number(
    prompt("¿en cuantas cuotas querés pagar?(mínimo 12 cuotas y máximo 60)")
  );
}

function cantidadCuotas(numCuotas) {
  if (numCuotas < 12 || numCuotas > 60) {
    cuotas = Number(prompt("El mínimo de cuotas son 12 y el máximo 60 cuotas"));
    cantidadCuotas(cuotas);
  } else {
    alert(`Perfecto elegiste ${cuotas} cuotas`);
  }
}

function calculoCuota(prestamoOtorgado, tasaMensual, cuotas) {
  return (
    prestamoOtorgado *
    ((Math.pow(1 + tasaMensual / 100, cuotas) * (tasaMensual / 100)) /
      (Math.pow(1 + tasaMensual / 100, cuotas) - 1))
  );
}
