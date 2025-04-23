const url = "https://script.google.com/macros/s/AKfycbw6HRxzdEsFWsIxVnBwuPcZVdH1XbgzVBPzVSElYL6n02v4jMbNynOi7Tuo_pTrRfP8xg/exec";

document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const confirmado = document.querySelector('input[name="confirmado"]:checked').value;
  const mensaje = document.getElementById("mensaje").value.trim();

  const res = await fetch(`${url}?nombre=${nombre}&apellido=${apellido}`);
  const data = await res.json();

  const respuesta = document.getElementById("respuesta");

  if (data.encontrado) {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nombre=${encodeURIComponent(nombre)}&apellido=${encodeURIComponent(apellido)}&confirmado=${encodeURIComponent(confirmado)}&mensaje=${encodeURIComponent(mensaje)}`
    });
    respuesta.innerText = "¡Gracias por confirmar tu asistencia!";
  } else {
    respuesta.innerText = "Lo sentimos, no encontramos tu nombre en la lista de invitados.";
  }
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
