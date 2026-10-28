function mostrarTema() {
  let tema = localStorage.getItem("tema");
  if (tema === null) {
    tema = "claro"; 
  }
  document.getElementById("tema").textContent = "Tema: " + tema;
  if (tema === "oscuro") {
    document.body.style.backgroundColor = "#222";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }
}

function cambiarTema() {
  let tema = localStorage.getItem("tema");
  if (tema === "claro" || tema === null) {
    localStorage.setItem("tema", "oscuro");
  } else {
    localStorage.setItem("tema", "claro");
  }
  mostrarTema();
}

mostrarTema();