class InteraccionesPagina {
    constructor() {
      this.configurarCambioTema();
      this.aplicarTemaGuardado();
      this.ConfigurarDocumentoClick();
    }
  
    /**
      * Verifica si el clic fue fuera del menú y del checkbox (el icono) si es asi cierra el menú
      */
    ConfigurarDocumentoClick() {
      const menuPrincipal = document.querySelector('.menuPrincipal');
      const menuCheckbox = document.getElementById('check');
  
      document.addEventListener('click', (e) => {
        if (!menuCheckbox.contains(e.target) && !menuPrincipal.contains(e.target)) {
          menuCheckbox.checked = false;
        }
      });
    }
  
    /**
    * Configura el cambio de tema al hacer clic en el enlace de apariencia.
    */
    configurarCambioTema() {
      const enlaceApariencia = document.getElementById('toggleAppearance');
      const logo = document.getElementById('logo');
      const menuIcon = document.getElementById('menu-icon');
      const calendarContainer = document.getElementById('calendar-container');
  
      enlaceApariencia.addEventListener('click', (evento) => {
        evento.preventDefault();
        const esTemaOscuro = this.toggleTema(); // Alternar tema
        this.actualizarTextoTema(enlaceApariencia, esTemaOscuro); // Actualizar texto del enlace
        this.actualizarLogo(logo, esTemaOscuro); // Actualizar logo
        this.actualizarIconoMenu(menuIcon, esTemaOscuro); // Actualizar color del ícono del menú
        this.actualizarCalendarioTema(calendarContainer, esTemaOscuro); // Actualizar tema del calendario
        this.guardarTemaEnLocalStorage(esTemaOscuro); // Guardar preferencia en localStorage
      });
    }
  
    /**
    * Alterna el tema entre claro y oscuro en el `body`.
    * @returns {boolean} - `true` si el tema es oscuro después del cambio, `false` si es claro.
    */
    toggleTema() {
      document.body.classList.toggle('dark-theme');
      return document.body.classList.contains('dark-theme');
    }
  
    /**
    * Actualiza el texto del enlace de apariencia según el tema actual.
    * @param {HTMLElement} enlaceApariencia - El elemento del enlace de apariencia.
    * @param {boolean} esTemaOscuro - Indica si el tema es oscuro.
    */
    actualizarTextoTema(enlaceApariencia, esTemaOscuro) {
      enlaceApariencia.textContent = esTemaOscuro ? 'Tema Claro' : 'Tema Oscuro';
    }
  
    /**
    * Actualiza la fuente del logo según el tema actual.
    * @param {HTMLImageElement} logo - El elemento del logo.
    * @param {boolean} esTemaOscuro - Indica si el tema es oscuro.
    */
    actualizarLogo(logo, esTemaOscuro) {
      logo.src = esTemaOscuro ? 'imagenes/logo Oscuro.png' : 'imagenes/logo terminado.png';
    }
  
    /**
    * Actualiza el color del ícono del menú según el tema actual.
    * @param {SVGElement} menuIcon - El elemento del ícono del menú.
    * @param {boolean} esTemaOscuro - Indica si el tema es oscuro.
    */
    actualizarIconoMenu(menuIcon, esTemaOscuro) {
      menuIcon.setAttribute('fill', esTemaOscuro ? 'white' : 'black');
    }
  
    /**
    * Actualiza el tema del calendario si está inicializado.
    * @param {HTMLElement|null} calendarContainer - El contenedor del calendario.
    * @param {boolean} esTemaOscuro - Indica si el tema es oscuro.
    */
    actualizarCalendarioTema(calendarContainer, esTemaOscuro) {
      if (calendarContainer && calendarContainer.classList.contains('initialized')) {
        this.aplicarTemaCalendario(esTemaOscuro, calendarContainer);
      }
    }
  
    /**
    * Guarda la preferencia de tema en `localStorage`.
    * @param {boolean} esTemaOscuro - Indica si el tema es oscuro.
    */
    guardarTemaEnLocalStorage(esTemaOscuro) {
      localStorage.setItem('theme', esTemaOscuro ? 'dark' : 'light');
    }
  
    /**
    * Aplica el tema guardado desde `localStorage` al cargar la página.
    */
    aplicarTemaGuardado() {
      const temaGuardado = localStorage.getItem('theme') === 'dark';
      const enlaceApariencia = document.getElementById('toggleAppearance');
      const logo = document.getElementById('logo');
      const menuIcon = document.getElementById('menu-icon');
      const calendarContainer = document.getElementById('calendar-container');
  
      // Aplicar tema al body y actualizar elementos relacionados
      document.body.classList.toggle('dark-theme', temaGuardado);
      this.actualizarTextoTema(enlaceApariencia, temaGuardado);
      this.actualizarLogo(logo, temaGuardado);
      this.actualizarIconoMenu(menuIcon, temaGuardado);
      this.actualizarCalendarioTema(calendarContainer, temaGuardado);
    }
  
    /**
    * Aplica el tema al calendario
    * @param {boolean} esTemaOscuro - Si el tema es oscuro o no
    * @param {HTMLElement} calendarContainer - El contenedor del calendario
    */
    aplicarTemaCalendario(esTemaOscuro, calendarContainer) {
      if (esTemaOscuro) {
        calendarContainer.classList.add('dark-theme');
        calendarContainer.classList.remove('light-theme');
      } else {
        calendarContainer.classList.add('light-theme');
        calendarContainer.classList.remove('dark-theme');
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new InteraccionesPagina();
  });
  