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

    document.getElementById("formulario").reset();
  } else {
    respuesta.innerText = "Lo sentimos, no encontramos tu nombre en la lista de invitados.";
  }

  // Desvanecer después de 5 segundos
  setTimeout(() => {
    respuesta.classList.add("fade-out");
    nombreInput.classList.add("fade-out");
    apellidoInput.classList.add("fade-out");
    mensajeInput.classList.add("fade-out");
    document.querySelectorAll('input[name="confirmado"]').forEach(el => {
      el.parentElement.classList.add("fade-out");
    });

    // Limpiar y restaurar visibilidad después de que se desvanecen
    setTimeout(() => {
      document.getElementById("formulario").reset();
      respuesta.innerText = "";

      respuesta.classList.remove("fade-out");
      nombreInput.classList.remove("fade-out");
      apellidoInput.classList.remove("fade-out");
      mensajeInput.classList.remove("fade-out");
      document.querySelectorAll('input[name="confirmado"]').forEach(el => {
        el.parentElement.classList.remove("fade-out");
      });
    }, 1000); // Esperar a que termine el fade
  }, 4000); // 4 segundos
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
