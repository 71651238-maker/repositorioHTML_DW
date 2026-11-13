document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".buscadorHeader").forEach((formulario) => {
    const boton = formulario.querySelector("button");
    const campo = formulario.querySelector("input");
    const tarjetas = () => document.querySelectorAll(".tarjetaServicio");
    boton.addEventListener("click", (e) => {
      if (!formulario.classList.contains("abierto")) {
        e.preventDefault();
        formulario.classList.add("abierto");
        campo.focus();
      }
    });

    campo.addEventListener("input", () => {
      if (!campo.value.trim()) tarjetas().forEach((t) => (t.hidden = false));
    });

    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      const termino = campo.value.trim().toLowerCase();
      if (!termino) { formulario.classList.add("abierto"); campo.focus(); return; }
      if (!tarjetas().length) {
        alert("Búsqueda: " + campo.value.trim() + ". Esta página no tiene servicios para filtrar.");
        return;
      }
      let encontrados = 0;
      tarjetas().forEach((t) => {
        const coincide = t.textContent.toLowerCase().includes(termino);
        t.hidden = !coincide;
        if (coincide) encontrados++;
      });
      if (!encontrados) alert("No se encontraron resultados para: " + campo.value.trim());
    });
  });

  const botonMenu = document.querySelector(".botonMenuMovil");
  const menu = document.querySelector(".comportamientoMENU");
  if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => {
      const abierto = menu.classList.toggle("menuAbierto");
      botonMenu.setAttribute("aria-expanded", String(abierto));
    });
  }


  document.querySelectorAll("form[data-exito]").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      f.reset();
      f.querySelector(".mensajeFormulario").textContent = f.dataset.exito;
    });
  });
});
