var datosIniciales = [
  { nombre: "Ana",   notas: [7, 8, 9] },
  { nombre: "Luis",  notas: [4, 5, 6] },
  { nombre: "Marta", notas: [3, 4, 2] },
  { nombre: "Pablo", notas: [9, 10, 9] },
  { nombre: "Sara",  notas: [5, 4, 6] },
  { nombre: "Lamin", notas: [3, 4, 3] }
];

var alumnos = [];

function cargarDatosIniciales() {
  alumnos = [];
  for (var i = 0; i < datosIniciales.length; i++) {
    alumnos.push({
      nombre: datosIniciales[i].nombre,
      notas: datosIniciales[i].notas.slice()
    });
  }
}

function calcularMedia(alumno) {
  var suma = 0;
  for (var i = 0; i < alumno.notas.length; i++) {
    suma = suma + alumno.notas[i];
  }
  return suma / alumno.notas.length;
}

function calcularCalificacion(media) {
  if (media < 5) {
    return "Insuficiente";
  } else if (media < 6) {
    return "Suficiente";
  } else if (media < 7) {
    return "Bien";
  } else if (media < 9) {
    return "Notable";
  } else {
    return "Sobresaliente";
  }
}

function pintarTabla() {
  var cuerpo = document.getElementById("cuerpoTabla");
  cuerpo.innerHTML = "";

  for (var i = 0; i < alumnos.length; i++) {
    var alumno = alumnos[i];
    var media = calcularMedia(alumno);
    var fila = "<tr>";

    fila += "<td>" + alumno.nombre + "</td>";

    for (var j = 0; j < alumno.notas.length; j++) {
      var clase = "suspenso";
      if (alumno.notas[j] >= 5) {
        clase = "aprobado";
      }
      fila += "<td class='" + clase + "'>" + alumno.notas[j] + "</td>";
    }

    fila += "<td class='media'>" + media.toFixed(2) + "</td>";
    fila += "<td>" + calcularCalificacion(media) + "</td>";
    fila += "</tr>";

    cuerpo.innerHTML += fila;
  }
}

function anadirAlumno() {
  var nombre = document.getElementById("nombre").value.trim();
  var n1 = document.getElementById("nota1").value;
  var n2 = document.getElementById("nota2").value;
  var n3 = document.getElementById("nota3").value;
  var mensaje = document.getElementById("mensaje");

  if (nombre === "" || n1 === "" || n2 === "" || n3 === "") {
    mensaje.className = "error";
    mensaje.textContent = "Rellena el nombre y las tres notas.";
    return;
  }

  n1 = Number(n1);
  n2 = Number(n2);
  n3 = Number(n3);

  if (n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || n3 < 0 || n3 > 10) {
    mensaje.className = "error";
    mensaje.textContent = "Las notas deben estar entre 0 y 10.";
    return;
  }

  alumnos.push({ nombre: nombre, notas: [n1, n2, n3] });
  pintarTabla();

  mensaje.className = "";
  mensaje.textContent = "Añadido " + nombre + ". Ahora hay " + alumnos.length + " alumnos.";

  document.getElementById("nombre").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("nota3").value = "";
}

function volverDatosIniciales() {
  cargarDatosIniciales();
  pintarTabla();
  var mensaje = document.getElementById("mensaje");
  mensaje.className = "";
  mensaje.textContent = "Datos iniciales restaurados. Hay " + alumnos.length + " alumnos.";
}

function contarAprobados() {
  var aprobados = 0;
  for (var i = 0; i < alumnos.length; i++) {
    if (calcularMedia(alumnos[i]) >= 5) {
      aprobados++;
    }
  }
  document.getElementById("resAprobados").textContent =
    "Aprueban " + aprobados + " de " + alumnos.length + " alumnos.";
}

function mejorNota() {
  var mejor = -1;
  var quien = "";
  var trimestre = 0;

  for (var i = 0; i < alumnos.length; i++) {
    for (var j = 0; j < alumnos[i].notas.length; j++) {
      if (alumnos[i].notas[j] > mejor) {
        mejor = alumnos[i].notas[j];
        quien = alumnos[i].nombre;
        trimestre = j + 1;
      }
    }
  }

  document.getElementById("resMejor").textContent =
    "La mejor nota es un " + mejor + " (" + quien + ", " + trimestre + "T).";
}

function mediaTrimestre() {
  var t = Number(document.getElementById("trimestre").value);
  var suma = 0;

  for (var i = 0; i < alumnos.length; i++) {
    suma = suma + alumnos[i].notas[t];
  }

  var media = suma / alumnos.length;
  document.getElementById("resMediaTrimestre").textContent =
    "La media del " + (t + 1) + "T es " + media.toFixed(2) + ".";
}

function buscarAlumno() {
  var texto = document.getElementById("buscar").value.trim().toLowerCase();
  var resultado = document.getElementById("resBuscar");

  if (texto === "") {
    resultado.className = "error";
    resultado.textContent = "Escribe el nombre de un alumno.";
    return;
  }

  for (var i = 0; i < alumnos.length; i++) {
    if (alumnos[i].nombre.toLowerCase() === texto) {
      var a = alumnos[i];
      resultado.className = "";
      resultado.textContent =
        a.nombre + " está en la posición " + (i + 1) + " de la tabla. " +
        "Notas: " + a.notas[0] + " (1T), " + a.notas[1] + " (2T), " + a.notas[2] + " (3T). " +
        "Media: " + calcularMedia(a).toFixed(2) + ".";
      return;
    }
  }

  resultado.className = "error";
  resultado.textContent = "No se ha encontrado ningún alumno llamado " + texto + ".";
}

function mostrarNotas() {
  document.getElementById("seccionNotas").classList.remove("oculto");
  document.getElementById("seccionConsultas").classList.add("oculto");
}

function mostrarConsultas() {
  document.getElementById("seccionConsultas").classList.remove("oculto");
  document.getElementById("seccionNotas").classList.add("oculto");
}

document.getElementById("botonAnadir").addEventListener("click", anadirAlumno);
document.getElementById("botonReset").addEventListener("click", volverDatosIniciales);
document.getElementById("botonAprobados").addEventListener("click", contarAprobados);
document.getElementById("botonMejor").addEventListener("click", mejorNota);
document.getElementById("botonMediaTrimestre").addEventListener("click", mediaTrimestre);
document.getElementById("botonBuscar").addEventListener("click", buscarAlumno);

document.getElementById("enlaceNotas").addEventListener("click", function (e) {
  e.preventDefault();
  mostrarNotas();
});
document.getElementById("enlaceConsultas").addEventListener("click", function (e) {
  e.preventDefault();
  mostrarConsultas();
});

cargarDatosIniciales();
pintarTabla();
