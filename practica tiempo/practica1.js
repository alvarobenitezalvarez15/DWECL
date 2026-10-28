const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const hoy = new Date();

const texto = dias[hoy.getDay()] + ", " + hoy.getDate() + " de " + meses[hoy.getMonth()] + " de " + hoy.getFullYear();

console.log(texto);