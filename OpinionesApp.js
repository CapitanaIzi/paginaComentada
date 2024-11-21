class OpinionesApp {
    constructor() {
      this.listaDeOpiniones = document.getElementById('listaDeOpiniones');
      this.formularioOpinion = document.getElementById('formularioOpinion');
      this.campoOpinion = document.getElementById('campoOpinion');
  
      this.cargarOpiniones();
  
      // Configurar el manejo del envío del formulario
      this.formularioOpinion.addEventListener('submit', (evento) => this.manejarEnvioFormulario(evento));
    }
  
   
  /**
   * Maneja el envío del formulario de opiniones.
   * 
   * Esta función se ejecuta cuando el usuario envía el formulario. Previene el
   * comportamiento predeterminado del navegador (recargar la página) y realiza las siguientes acciones:
   * 1. Valida que el campo de opinión no esté vacío.
   * 2. Agrega la opinión al DOM.
   * 3. Guarda la opinión en el almacenamiento local (`localStorage`).
   * 4. Limpia el formulario para futuras entradas.
   * 
   * @param {Event} evento - El evento de envío del formulario (submit).
   *        Se utiliza para prevenir la acción predeterminada del formulario.
   */
  manejarEnvioFormulario(evento) {
    evento.preventDefault(); 
    const textoOpinion = this.campoOpinion.value;
  
    if (textoOpinion) {
      this.agregarOpinion(textoOpinion); 
      this.guardarOpinion(textoOpinion); 
      this.limpiarFormulario();
    }
  }
   /**
   * Agrega una opinión al DOM.
   * Esta función crea un elemento HTML que contiene el texto y lo añade al contenedor de opiniones en la página.
   * @param {string} texto - El texto de la opinión que se va a añadir.
   */
    agregarOpinion(texto) {
      const elementoOpinion = document.createElement('div');
      elementoOpinion.classList.add('opinion');
      elementoOpinion.innerHTML = `<p>${texto}</p>`;
      this.listaDeOpiniones.appendChild(elementoOpinion);
    }
  
    /**
   * Guarda una nueva opinión en el almacenamiento localStorage.
   * Esta función agrega la nueva opinión y vuelve a almacenar la lista
   * actualizada en el `localStorage` para que persista entre recargas de página.
   * @param {string} texto - El texto de la opinión que se va a guardar.
   */
    guardarOpinion(texto) {
      const opinionesGuardadas = JSON.parse(localStorage.getItem('opiniones')) || [];
      opinionesGuardadas.push({ texto });
      localStorage.setItem('opiniones', JSON.stringify(opinionesGuardadas));
    }
    /**
     * Carga las opiniones desde localStorage
     */
    cargarOpiniones() {
      const opinionesGuardadas = JSON.parse(localStorage.getItem('opiniones')) || [];
      opinionesGuardadas.forEach(opinion => {
        this.agregarOpinion(opinion.texto);
      });
    }
    /**
     * Limpia el campo del formulario
     */
    limpiarFormulario() {
      this.campoOpinion.value = '';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const app = new OpinionesApp();
  });
  