const libro = {
  titulo: "Las aventuras de Josue",
  autor: "Ayoub El Hachimi",
  paginas: 666,
  resumen: function () {
    return this.titulo + ", de " + this.autor + " (" + this.paginas + " páginas)";
  }
};

console.log(libro.resumen());


for (const clave in libro) {
  if (typeof libro[clave] === "function") {
    console.log(clave + ": " + libro[clave]());
  } else {
    console.log(clave + ": " + libro[clave]);
  }
}