const url = "https://script.google.com/macros/s/AKfycbw6HRxzdEsFWsIxVnBwuPcZVdH1XbgzVBPzVSElYL6n02v4jMbNynOi7Tuo_pTrRfP8xg/exec";

document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const mensajeInput = document.getElementById("mensaje");
  const confirmadoInput = document.querySelector('input[name="confirmado"]:checked');

  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const confirmado = confirmadoInput.value;
  const mensaje = mensajeInput.value.trim();

  const respuesta = document.getElementById("respuesta");
  respuesta.classList.remove("fade-out");

  const res = await fetch(`${url}?nombre=${nombre}&apellido=${apellido}`);
  const data = await res.json();

  if (data.encontrado) {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nombre=${encodeURIComponent(nombre)}&apellido=${encodeURIComponent(apellido)}&confirmado=${encodeURIComponent(confirmado)}&mensaje=${encodeURIComponent(mensaje)}`
    });

    // Mostrar el mensaje dependiendo de la opción seleccionada
    if (confirmado === "Sí") {
      respuesta.innerText = "Te esperamos en este día tan especial😎";
    } else {
      respuesta.innerText = "Lamentamos que no puedas acompañarnos ese día 🥺";
    }

  } else {
    respuesta.innerText = "Verifica que hayas escrito bien tu nombre.";
  }

  respuesta.classList.add("mostrar");

  // Desvanecer y limpiar después de unos segundos con animación suave
  setTimeout(() => {
    // Suavemente desvanecer el contenedor del formulario
    const container = document.querySelector(".container");
    container.classList.add("fade-form");

    setTimeout(() => {
      document.getElementById("formulario").reset();
      respuesta.innerText = "";
      respuesta.classList.remove("mostrar");
      container.classList.remove("fade-form");
    }, 800); // tiempo para la animación
  }, 3500); // tiempo para mostrar el mensaje antes del desvanecimiento
});

// Contador regresivo a la boda
const fechaBoda = new Date("2025-11-23T00:00:00").getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaBoda - ahora;

  if (diferencia < 0) {
    document.getElementById("contador").innerText = "¡Hoy es el gran día!";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("contador").innerText =
    `Faltan ${dias} días, ${horas}h ${minutos}m ${segundos}s`;

  setTimeout(actualizarContador, 1000);
}

actualizarContador();
