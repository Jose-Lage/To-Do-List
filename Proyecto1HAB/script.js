// Cargar tareas guardadas en el almacenamiento local

function cargarTareasGuardadas() {
  const tareasGuardadas = localStorage.getItem("listaTareas");
  if (tareasGuardadas) {
    listaTareas.innerHTML = tareasGuardadas;

    // Bucle que recorre los elementos de la listaTareas comprobando si tienen line-through.
    // En caso afirmativo, activa el check.
    for (
      let contador = 3;
      contador < listaTareas.childNodes.length;
      contador++
    ) {
      if (
        listaTareas.childNodes[contador].style.textDecoration === "line-through"
      ) {
        listaTareas.childNodes[contador].firstElementChild.checked = true;
      }
    }
  }
}

window.addEventListener("load", cargarTareasGuardadas);

// Obtener elementos del DOM

const form = document.querySelector("form");
const tareaInput = document.getElementById("tarea");
const prioridadInput = document.getElementById("prioridad");
const listaTareas = document.getElementById("listaTareas");
const limpiarTareasBtn = document.getElementById("limpiarTareasHechas");
const limpiarTodasTareas = document.getElementById("limpiarTareas");

// Agregar evento al formulario

function agregarNuevaTarea(texto, prioridad) {
  const fecha = new Date().toLocaleDateString();
  const nuevaTarea = document.createElement("li");
  nuevaTarea.innerHTML = `
    <input type="checkbox">
    ${texto}
    / Fecha: ${fecha}
    <hr>
  `;
  if (prioridad === "importante") {
    nuevaTarea.style.fontWeight = "bold";
    nuevaTarea.style.fontStyle = "italic";
  }
  listaTareas.appendChild(nuevaTarea);
}
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tareaTexto = tareaInput.value;

  if (tareaTexto.trim() === "") {
    alert("Introduce algún valor");
    return;
  }

  const prioridad = prioridadInput.value;
  agregarNuevaTarea(tareaTexto, prioridad);

  tareaInput.value = "";
  prioridadInput.value = "normal";
});

// Tachado a la lista de tareas

listaTareas.addEventListener("change", (evento) => {
  const tareaCheckbox = evento.target.parentElement;
  if (tareaCheckbox.firstElementChild.checked) {
    tareaCheckbox.style.textDecoration = "line-through";
  } else {
    tareaCheckbox.style.textDecoration = "none";
  }
});

// Limpiar tareas hechas

limpiarTareasBtn.addEventListener("click", () => {
  const tareasHechas = listaTareas.querySelectorAll("input:checked");
  tareasHechas.forEach((tareaHecha) => {
    tareaHecha.parentElement.remove();
  });
});

// Limpiar todas las tareas

limpiarTodasTareas.addEventListener("click", (e) => {
  const elementosLi = listaTareas.getElementsByTagName("li");
  const elementosLiLength = elementosLi.length;
  if (elementosLiLength > 0) {
    const confirmacion = confirm(
      "¿Está seguro que desea borrar todas las tareas"
    );
    if (confirmacion) {
      for (let i = elementosLiLength - 1; i >= 0; i--) {
        listaTareas.removeChild(elementosLi[i]);
      }
    }
  }
});
document.getElementById("modoBtn").addEventListener("click", function () {
  document.body.classList.toggle("modo-oscuro");
});

// Guardar tareas en el almacenamiento local

window.addEventListener("unload", () => {
  localStorage.setItem("listaTareas", listaTareas.innerHTML);
});
