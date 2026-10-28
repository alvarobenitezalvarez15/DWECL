function diasHasta(fecha) {
  const ahora = new Date();
  const diferencia = fecha - ahora;               // milisegundos
  const dias = Math.ceil(diferencia / 86400000);  // 86400000 ms = 1 día
  return dias;
}

const cumple = new Date(2027, 4, 15);
console.log("Faltan " + diasHasta(cumple) + " días");