// Datos iniciales de la clase
const datosIniciales = [
  { nombre: "Ana",    notas: [7, 8, 9] },
  { nombre: "Luis",   notas: [4, 5, 6] },
  { nombre: "Marta",  notas: [3, 4, 2] },
  { nombre: "Pablo",  notas: [9, 10, 9] },
  { nombre: "Sara",   notas: [5, 4, 6] },
  { nombre: "Lamin",  notas: [3, 4, 3] }
];

// Copia de los datos para poder modificarlos
let alumnos = JSON.parse(JSON.stringify(datosIniciales));

// Elementos del HTML
const tablaNotas = document.getElementById("tablaNotas");
const mensaje = document.getElementById("mensaje");
const seccionNotas = document.getElementById("seccionNotas");
const seccionConsultas = document.getElementById("seccionConsultas");
const listaConsultas = document.getElementById("listaConsultas");

// Calcula la media de un alumno
function calcularMedia(notas) {
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }
  return suma / notas.length;
}

// Devuelve la calificación según la media
function calificacion(media) {
  if (media < 5) return "Insuficiente";
  if (media < 6) return "Suficiente";
  if (media < 7) return "Bien";
  if (media < 9) return "Notable";
  return "Sobresaliente";
}

// Dibuja la tabla
function pintarTabla() {
  tablaNotas.innerHTML = "";

  for (let i = 0; i < alumnos.length; i++) {
    const alumno = alumnos[i];
    const media = calcularMedia(alumno.notas);

    let fila = "<tr><td>" + alumno.nombre + "</td>";
    for (let j = 0; j < alumno.notas.length; j++) {
      const nota = alumno.notas[j];
      const clase = nota >= 5 ? "aprobado" : "suspenso";
      fila += '<td class="' + clase + '">' + nota + "</td>";
    }
    fila += '<td class="media">' + media.toFixed(2) + "</td>";
    fila += "<td>" + calificacion(media) + "</td></tr>";

    tablaNotas.innerHTML += fila;
  }
}

// Dibuja la sección de consultas
function pintarConsultas() {
  let mejor = alumnos[0];
  let peor = alumnos[0];
  let sumaClase = 0;
  let aprobados = 0;

  for (let i = 0; i < alumnos.length; i++) {
    const media = calcularMedia(alumnos[i].notas);
    sumaClase += media;
    if (media >= 5) aprobados++;
    if (media > calcularMedia(mejor.notas)) mejor = alumnos[i];
    if (media < calcularMedia(peor.notas)) peor = alumnos[i];
  }

  const mediaClase = sumaClase / alumnos.length;

  listaConsultas.innerHTML =
    "<li>Número de alumnos: " + alumnos.length + "</li>" +
    "<li>Media de la clase: " + mediaClase.toFixed(2) + "</li>" +
    "<li>Mejor media: " + mejor.nombre + " (" + calcularMedia(mejor.notas).toFixed(2) + ")</li>" +
    "<li>Peor media: " + peor.nombre + " (" + calcularMedia(peor.notas).toFixed(2) + ")</li>" +
    "<li>Aprobados: " + aprobados + "</li>" +
    "<li>Suspensos: " + (alumnos.length - aprobados) + "</li>";
}

// Añadir un alumno nuevo
document.getElementById("btnAnadir").addEventListener("click", function () {
  const nombre = document.getElementById("nombre").value.trim();
  const t1 = parseFloat(document.getElementById("t1").value);
  const t2 = parseFloat(document.getElementById("t2").value);
  const t3 = parseFloat(document.getElementById("t3").value);

  const notas = [t1, t2, t3];
  let notasValidas = true;
  for (let i = 0; i < notas.length; i++) {
    if (isNaN(notas[i]) || notas[i] < 0 || notas[i] > 10) {
      notasValidas = false;
    }
  }

  if (nombre === "" || !notasValidas) {
    mensaje.className = "error";
    mensaje.textContent = "Escribe un nombre y tres notas entre 0 y 10.";
    return;
  }

  alumnos.push({ nombre: nombre, notas: notas });
  pintarTabla();
  pintarConsultas();

  mensaje.className = "";
  mensaje.textContent = "Añadido " + nombre + ". Ahora hay " + alumnos.length + " alumnos.";

  document.getElementById("nombre").value = "";
  document.getElementById("t1").value = "";
  document.getElementById("t2").value = "";
  document.getElementById("t3").value = "";
});

// Volver a los datos iniciales
document.getElementById("btnReset").addEventListener("click", function () {
  alumnos = JSON.parse(JSON.stringify(datosIniciales));
  pintarTabla();
  pintarConsultas();
  mensaje.className = "";
  mensaje.textContent = "Datos iniciales restaurados. Hay " + alumnos.length + " alumnos.";
});

// Navegación entre Notas y Consultas
document.getElementById("linkNotas").addEventListener("click", function (e) {
  e.preventDefault();
  seccionNotas.classList.remove("oculto");
  seccionConsultas.classList.add("oculto");
});

document.getElementById("linkConsultas").addEventListener("click", function (e) {
  e.preventDefault();
  seccionConsultas.classList.remove("oculto");
  seccionNotas.classList.add("oculto");
});

// Al cargar la página
pintarTabla();
pintarConsultas();
