const inventario = [
  { nombre: "Teclado", precio: 20, stock: 10 },
  { nombre: "Ratón", precio: 12, stock: 3 },
  { nombre: "Monitor", precio: 150, stock: 4 },
  { nombre: "Cable HDMI", precio: 5, stock: 25 }
]; 

console.log("Productos con menos de 5 unidades:");
for (let i = 0; i < inventario.length; i++) {
  if (inventario[i].stock < 5) {
    console.log(inventario[i].nombre + " (" + inventario[i].stock + " uds)");
  }
}

let total = 0;
for (let i = 0; i < inventario.length; i++) {
  total = total + inventario[i].precio * inventario[i].stock;
}
console.log("Valor total del inventario: " + total + " €");