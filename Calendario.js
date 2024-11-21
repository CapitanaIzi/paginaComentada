class Calendario {
    /**
     * Crea una nueva instancia de Calendario.
     * 
     * @param {string} idBoton - El ID del botón para abrir o cerrar el calendario.
     * @param {string} idContenedor - El ID del contenedor donde se mostrará el calendario.
     */
    constructor(idBoton, idContenedor) {
        // Asigna las referencias de los elementos DOM
        this.boton = document.getElementById(idBoton);
        this.contenedor = document.getElementById(idContenedor);
        this.botonCerrar = document.getElementById('cerrar-calendario'); // Botón de cerrar
        this.estaInicializado = false; // Estado que indica si el calendario ha sido inicializado
        this.init(); // Inicializa los eventos y configuraciones
    }

    /**
     * Inicializa los eventos y configuraciones necesarios para el calendario.
     * 
     * Se encargará de agregar los escuchadores de eventos para los botones de abrir/cerrar,
     * manejar los clics fuera del calendario y configurar el cambio de tema.
     */
    init() {
        // Agrega el evento al botón para abrir/cerrar el calendario
        this.boton.addEventListener('click', this.toggleCalendario.bind(this));
        // Agrega el evento al botón de cerrar calendario
        this.botonCerrar.addEventListener('click', this.ocultarCalendario.bind(this));
        // Agrega un evento global para detectar clics fuera del calendario
        document.addEventListener('click', this.manejarClicFuera.bind(this));

        // Configura la detección de cambio de tema (oscuro/claro)
        this.configurarCambioTema();
        
        // Configura el cambio de tema al detectar cambios en la preferencia de color del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.configurarCambioTema.bind(this));
    }

    /**
     * Muestra u oculta el calendario al hacer clic en el botón de calendario.
     * Si el calendario está visible y no ha sido inicializado, se inicializa.
     */
    toggleCalendario() {
        // Alterna la visibilidad del calendario
        this.contenedor.style.display = (this.contenedor.style.display === 'none' || this.contenedor.style.display === '') ? 'block' : 'none';

        // Si el calendario se muestra y aún no está inicializado, inicializa el calendario
        if (this.contenedor.style.display === 'block' && !this.estaInicializado) {
            this.inicializarCalendario();
        }
    }

    /**
     * Oculta el calendario cuando se hace clic en el botón de cerrar.
     */
    ocultarCalendario() {
        this.contenedor.style.display = 'none'; // Cambia el estilo para ocultar el calendario
    }

    /**
     * Maneja los clics fuera del calendario. Si el clic es fuera del calendario y del botón,
     * se oculta el calendario.
     * 
     * @param {Event} evento - El evento del clic.
     */
    manejarClicFuera(evento) {
        // Si el clic es fuera del contenedor y el botón de calendario, se oculta el calendario
        if (!this.contenedor.contains(evento.target) && evento.target !== this.boton) {
            this.ocultarCalendario(); // Oculta el calendario
        }
    }

    /**
     * Inicializa el calendario usando FullCalendar y configura el tema claro.
     * 
     * El calendario se configura con idioma español y con una cabecera básica de navegación.
     */
    inicializarCalendario() {
        // Inicializa el calendario con FullCalendar
        $(this.contenedor).fullCalendar({
            locale: 'es',
            header: {
                left: 'prev,next today', // Botones de navegación
                center: 'title', // Título del calendario
                right: '' // Sin botones a la derecha
            },
            events: [] // Lista de eventos vacía por defecto
        });

        // Marca el calendario como inicializado
        this.estaInicializado = true;

        // Fuerza el tema claro al inicializar el calendario
        this.contenedor.classList.add('light-theme');
        this.contenedor.classList.remove('dark-theme');

        // Configura la respuesta al cambio de preferencia de tema del sistema
        this.configurarCambioTema();
    }

    /**
     * Configura la respuesta al cambio de tema (oscuro/claro) basado en la preferencia del sistema.
     * Este método se ejecuta cada vez que el sistema cambia de tema (oscuro a claro o viceversa).
     */
    configurarCambioTema() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)'); // Detecta la preferencia del sistema

        // Agrega un escucha de eventos para detectar el cambio de tema
        mediaQuery.addEventListener('change', (event) => {
            if (event.matches) {
                // Si el tema es oscuro, aplica la clase 'dark-theme'
                this.contenedor.classList.add('dark-theme');
                this.contenedor.classList.remove('light-theme');
            } else {
                // Si el tema es claro, aplica la clase 'light-theme'
                this.contenedor.classList.add('light-theme');
                this.contenedor.classList.remove('dark-theme');
            }
        });
    }
}

// Inicializa la instancia de Calendario con los IDs de los elementos en el HTML
const calendario = new Calendario('btn-calendario', 'calendar-container');
