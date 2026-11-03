class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  conIVA() {
    return this.precio * 1.21;
  }

  vender(n) {
    if (this.stock >= n) {
      this.stock = this.stock - n;
      return true;
    } else {
      return false;
    }
  }
}

const p = new Producto("Teclado", 20, 10);
console.log(p.conIVA());
console.log(p.vender(3));
console.log(p.stock);
console.log(p.vender(50));
console.log(p.stock);