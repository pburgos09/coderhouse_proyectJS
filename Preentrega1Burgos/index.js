const prestamoOtorgado = Math.floor(Math.random() * 100000);

let preguntaCuotas = prompt("Queres un prestamo de cuantas cuotas?");

confirmarCuotas(preguntaCuotas);

function cuotasPretamo(prestamo) {
  for (let i = 0; i < Number(prestamo); i++) {
    let cuota = prestamoOtorgado / Number(prestamo);
    console.log(`La cuota ${i + 1} sera de $ ${cuota.toFixed(2)}`);
  }
}

function confirmarCuotas(numDeCuotas) {
  if (numDeCuotas > 12) {
    preguntaCuotas = prompt(
      "Lo siento solo hasta 12 cuotas son los prestamos, Ingresa un nuevo numero"
    );
    confirmarCuotas(preguntaCuotas);
  } else {
    cuotasPretamo(preguntaCuotas);
  }
}
