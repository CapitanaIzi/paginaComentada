class Diagrama {
    constructor() {
        this.cuadroActivo = null;
        this.guardarBtn = document.getElementById('btn-guardar');
        this.eliminarBtn = document.getElementById('btn-eliminar');
        this.btnInsertar = document.getElementById('btn-insertar');
        this.menuInsertar = document.getElementById('menu-insertar');
        this.btnEditar = document.getElementById('btn-editar');
        this.menuEditar = document.getElementById('menu-editar');
        this.btnColor = document.getElementById('btn-color');
        this.menuColor = document.getElementById('menu-color');
        this.titulo = document.getElementById('titulo');
        this.isMouseDown = false;
        this.init();
    }
    /**
     * Obtiene el título del mapa conceptual.
     * @returns {Object} Objeto que representa el título.
     */
    obtenerTitulo() {
        const titulo = this.titulo.innerText || ''; // Obtener el texto del título
        return {
            type: 'titulo',
            content: titulo,
        };
    }

    /**
     * Carga el título en el DOM.
     * @param {string} content - El contenido del título.
     */
    cargarTitulo(content) {
        this.titulo.innerText = content; // Establecer el nuevo texto del título
    }

    init() {
        this.configurarEventos();
        this.configurarMenu();
        this.configurarColor();
        this.seleccionarCuadroActivo();
    }

    /**
     * configura los eventos de click respecto a cuadro, flecha 
     */
    configurarEventos() {
        this.seleccionarCuadroActivo();
        document.getElementById('insertar-cuadro').addEventListener('click', () => this.crearCuadro());
        document.getElementById('insertar-flecha').addEventListener('click', () => this.crearFlecha());
        this.configurarEventoEliminar();
    }

    /**
    * configura el menu de Insertar Editar y Color
    */
    configurarMenu() {
        this.configurarMenuDiagrama(this.btnInsertar, this.menuInsertar);
        this.configurarMenuDiagrama(this.btnEditar, this.menuEditar);
        this.configurarMenuDiagrama(this.btnColor, this.menuColor);
    }

    /**
     * Configura el comportamiento de un menú en el diagrama.
     * Permite mostrar y ocultar el menú al hacer clic sobre un botón, y cerrar el menú si se hace clic fuera de él o del botón que lo activa.
     * @param {HTMLElement} button - El botón que activa la visibilidad del menú.
     * @param {HTMLElement} menu - El menú que se muestra o se oculta.
     */
    configurarMenuDiagrama(button, menu) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();  // Previene que el evento se propague al documento
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.style.display = 'none';
            }
        });
    }

    /**
     * Configura el evento eliminar para cuando el elemento pase sobre el botón de eliminación.
     */
    configurarEventoEliminar() {
        document.addEventListener('mousedown', () => {
            this.isMouseDown = true;
        });

        document.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });

        this.eliminarBtn.addEventListener('mousemove', (e) => {
            if (this.isMouseDown && this.cuadroActivo) {
                const rectEliminarBtn = this.eliminarBtn.getBoundingClientRect();
                const rectCuadroActivo = this.cuadroActivo.getBoundingClientRect();

                if (this.ElementoSobreBotonEliminar(rectCuadroActivo, rectEliminarBtn)) {
                    this.cuadroActivo.remove();
                    this.cuadroActivo = null;
                }
            }
        });
    }

    /**
     * Evalúa si el elemento está sobre el botón de eliminar.
     * @param {Object} rectElemento - Elemento que va a ser eliminado.
     * @param {HTMLButtonElement} rectEliminarBtn - Botón de eliminación.
     * @returns true si está sobre el botón, sino False.
     */
    ElementoSobreBotonEliminar(rectElemento, rectEliminarBtn) {
        return rectElemento.bottom > rectEliminarBtn.top &&
            rectElemento.top < rectEliminarBtn.bottom &&
            rectElemento.right > rectEliminarBtn.left &&
            rectElemento.left < rectEliminarBtn.right;
    }

    /**
     * Crea un cuadro usando la clase Cuadro.
     */
    crearCuadro() {
        const nuevoCuadro = new Cuadro();
        this.cuadroActivo = nuevoCuadro.element;
    }

    /**
     * Crea una flecha usando la clase Flecha.
     */
    crearFlecha() {
        new Flecha();
    }

    /**
     * Configura el color del cuadro seleccionado.
     */
    configurarColor() {
        document.querySelectorAll('.color-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const color = e.target.getAttribute('data-color');
                if (this.cuadroActivo) {
                    this.cuadroActivo.style.backgroundColor = color;
                }
            });
        });
    }

    /**
     * Selecciona el cuadro activo que será modificado en el color.
     */
    seleccionarCuadroActivo() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cuadro')) {
                this.cuadroActivo = e.target;
            }
        });
    }
}

// Inicia el diagrama directamente sin la necesidad de la clase MapaConceptual.
document.addEventListener('DOMContentLoaded', () => {
    new Diagrama();
});
