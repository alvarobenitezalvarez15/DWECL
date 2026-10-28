
document.cookie = `idioma=es; max-age=86400; path=/`;

console.log("Tras crear la cookie:", leerCookie("idioma"));
document.cookie = "idioma=; max-age=0; path=/";

console.log("Tras borrar la cookie:", leerCookie("idioma"));

function leerCookie(nombre) {
  const pares = document.cookie.split("; ");

  for (let i = 0; i < pares.length; i++) {
    const partes = pares[i].split("=");
    if (partes[0] === nombre) return decodeURIComponent(partes[1]);
  }

  return null;
}

