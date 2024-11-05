class App {
    constructor() {
        // Referencias a los contenedores de las listas
        this.listaSemanalContainer = document.getElementById('lista-semanal');
        this.listaPersonalContainer = document.getElementById('listas-personales');
        this.listaMesContainer = document.getElementById('listas-mes');

        // Instancia de la lista semanal
        this.listaSemanal = new ListaSemanal(this.listaSemanalContainer);

        // Inicializa los eventos de la aplicación
        this.init();
    }

    /**
     * Inicializa los eventos de la aplicación.
     * Esto incluye la configuración del menú y las acciones de los botones.
     */
    init() {
        this.setupMenuToggle();  // Configura el botón del menú para alternar visibilidad
        this.setupDocumentClick();  // Cierra el menú si se hace clic fuera de él
        this.setupListaSemanal();  // Configura el evento para crear una nueva lista semanal
        this.setupListaPersonal();  // Configura el evento para crear una nueva lista personal
        this.setupListaMensual();  // Configura el evento para crear una nueva lista mensual

        // Llama a la creación de una lista semanal inicial al cargar la página (opcional)
        this.listaSemanal.crearListaSemanal();
    }

    /**
     * Configura el botón del menú para alternar la visibilidad del menú principal.
     */
    setupMenuToggle() {
        const menuBtn = document.querySelector('.menu-btn');
        const menuPrincipal = document.querySelector('.menuPrincipal');

        // Agrega un evento al botón para alternar el menú
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();  // Evita que el evento se propague al documento
            menuPrincipal.classList.toggle('active');  // Alterna la clase 'active' en el menú
        });
    }

    /**
     * Configura el evento para cerrar el menú si el clic se realiza fuera del menú o del botón.
     */
    setupDocumentClick() {
        const menuBtn = document.querySelector('.menu-btn');
        const menuPrincipal = document.querySelector('.menuPrincipal');

        // Agrega un evento al documento para cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            // Verifica si el clic fue fuera del botón y del menú
            if (!menuBtn.contains(e.target) && !menuPrincipal.contains(e.target)) {
                menuPrincipal.classList.remove('active');  // Cierra el menú
            }
        });
    }

    /**
     * Configura el evento para crear una nueva lista semanal al hacer clic en el botón correspondiente.
     */
    setupListaSemanal() {
        document.getElementById('btn-semanal').addEventListener('click', () => {
            this.listaSemanal.crearListaSemanal();
        });
    }

    /**
     * Configura el evento para crear una nueva lista personal al hacer clic en el botón correspondiente.
     */
    setupListaPersonal() {
        document.getElementById('btn-personal').addEventListener('click', () => {
            // Crea una nueva instancia de Lista con un título predeterminado
            const nuevaLista = new Lista('Agregue Titulo');
            // Agrega la nueva lista al contenedor de listas personales
            this.listaPersonalContainer.appendChild(nuevaLista.crearListaElement());
        });
    }

    /**
     * Configura el evento para crear una nueva lista mensual al hacer clic en el botón correspondiente.
     */
    setupListaMensual() {
        document.getElementById('btn-mensual').addEventListener('click', () => {
            // Crea una nueva instancia de Lista con el título 'Agosto'
            const nuevaLista = new Lista('Agosto');
            // Agrega la nueva lista al contenedor de listas mensuales
            this.listaMesContainer.appendChild(nuevaLista.crearListaElement());
        });
    }
}

// Inicializa la aplicación
const app = new App();
