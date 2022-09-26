# Pagina de prestamos personales
Proyecto de JavaScript para el curso de Codehouse

Para la primera pre-entrega se tenia que vincular un archivo JS con el index.html, ademas tenia que incluir todo lo visto en las primeras 4 clases. Este primer archivo contiene 2 funciones con if, else, un for y el resultado se muestra por consola.

- El  monto otorgado por ahora es aleatorio y un valor no mayor a $100000

- El promp que pregunta en cuantas cuotas quiere pagar el prestamo por ahora no resuelve el tema de si se ingresa algo que no sea numero, mas adelante lo agregaré

- La funcion cuotasPrestamo tiene dentro un for que consologuea las cuotas con el valor de cada una

- La funcion confirmarCuotas verifica que las cuotas que ingresa la persona sean hasta 12, tiene un condicional que constata el valor ingresado y lo compara, si es mayor le manda un prompt sugiriendo otro valor menor a 12 y vuelve a llamarse a si misma la funcion, hasta que el valor es 12 o menos y entra al else y llama a la funcion cuotasPrestamo.