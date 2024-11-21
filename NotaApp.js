class NotaApp {
  constructor() {
    this.elementoListaNotas = document.getElementById('lista-notas');
    this.elementoTituloNota = document.getElementById('titulo-nota');
    this.elementoContenidoNota = document.getElementById('contenido-nota');
    this.botonGuardarNota = document.getElementById('guardar-nota');
    this.botonAgregarNota = document.getElementById('agregar-nota'); 

    this.cargarNotas(); 
    this.inicializaEventos();
  }

  /**
   * Inicializar eventos
   */
  inicializaEventos() {
    this.botonGuardarNota.addEventListener('click', () => this.guardaNota());
    this.botonAgregarNota.addEventListener('click', () => this.limpiaEntradaNota());
  }

  /**
   * Cargar todas las notas desde el almacenamiento local
   */
  cargarNotas() {
    this.elementoListaNotas.innerHTML = '';
    const notas = JSON.parse(localStorage.getItem('notes')) || [];

    notas.forEach((nota, index) => {
      const itemNota = this.creaNotasEnLista(nota, index);
      this.elementoListaNotas.appendChild(itemNota);
    });
  }

  /**
   * Crear un elemento de lista para cada nota con título y botón de eliminar
   * @param {Object} nota Objeto que contiene la información de la nota
   * @param {Number} posicion Posición de la nota dentro de la lista de notas
   * @returns {HTMLElement} Elemento de lista que contiene el título de la nota y el botón de eliminar.
   */
  creaNotasEnLista(nota, posicion) {
    const articuloNota = document.createElement('li');
    articuloNota.textContent = nota.title || `Nota sin título (${posicion + 1})`;
    articuloNota.onclick = () => this.cargarNota(posicion);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('boton-eliminar');
    botonEliminar.onclick = (event) => {
      event.stopPropagation(); // Evitar que se active `cargarNota`
      this.eliminaNota(posicion);
    };

    articuloNota.appendChild(botonEliminar);
    return articuloNota;
  }

  /**
   * Guardar una nueva nota
   */
  guardaNota() {
    const titulo = this.elementoTituloNota.value;
    const contenido = this.elementoContenidoNota.value;

    if (!contenido) {
      alert('Por favor, escribe algo en la nota antes de guardar.');
      return;
    }

    const notas = JSON.parse(localStorage.getItem('notes')) || [];
    notas.push({ title: titulo, content: contenido });
    localStorage.setItem('notes', JSON.stringify(notas));
    alert('¡Nota guardada con éxito!');

    this.cargarNotas();
  }

  /**
   * Cargar una nota específica en el editor
   * @param {Number} posicion Posición de la nota a cargar
   */
  cargarNota(posicion) {
    const notas = JSON.parse(localStorage.getItem('notes')) || [];
    const nota = notas[posicion];

    if (nota) {
      this.elementoTituloNota.value = nota.title;
      this.elementoContenidoNota.value = nota.content;
    }
  }

  /**
   * Elimina una nota que está guardada en la lista, en la posición indicada
   * @param {Number} posicion Posición de la nota a eliminar
   */
  eliminaNota(posicion) {
    const notas = JSON.parse(localStorage.getItem('notes')) || [];

    if (confirm('¿Seguro que quieres eliminar esta nota?')) {
      notas.splice(posicion, 1);
      localStorage.setItem('notes', JSON.stringify(notas));
      this.cargarNotas();
      alert('Nota eliminada');
    }
  }

  /**
   * Limpia los campos del editor para agregar una nueva nota
   */
  limpiaEntradaNota() {
    this.elementoTituloNota.value = '';
    this.elementoContenidoNota.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NotaApp();
});
