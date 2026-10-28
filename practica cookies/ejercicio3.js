function anadirTarea(texto) {
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  if (tareas === null) {
    tareas = [];
  }
  tareas.push(texto);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  verTareas();
}

function verTareas() {
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  let lista = document.getElementById("lista");
  lista.innerHTML = "";
  if (tareas !== null) {
    for (let i = 0; i < tareas.length; i++) {
      lista.innerHTML += "<li>" + tareas[i] + "</li>";
    }
  }
}

verTareas();
