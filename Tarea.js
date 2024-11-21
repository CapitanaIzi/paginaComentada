let menuAbierto = null;
class Tarea {
    constructor(nombre = "Tarea") {
        this.nombre = nombre;
        this.completada = false;
    }


    /**
     * Crea un checkbox para la tarea, el cual permite marcarla como completada.
     * Al marcar el checkbox, la tarea se tachará si se completa.
     * 
     * @param {HTMLTextAreaElement} textArea - El `textarea` que representa el nombre de la tarea.
     * @returns {HTMLInputElement} El checkbox para la tarea.
     */
    crearCheckbox(textArea) {
        const label = document.createElement('label');
        label.classList.add('custom-checkbox');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const span = document.createElement('span');

        // Agregar evento para marcar completada y tachar el texto
        checkbox.addEventListener('change', () => {
            this.completada = checkbox.checked;
            if (textArea) {
                textArea.classList.toggle('tachado', this.completada);
            }
        });

        // Estructura del checkbox personalizado
        label.appendChild(checkbox);
        label.appendChild(span);

        return label;
    }

    /**
     * Crea el área de texto que permite editar el nombre de la tarea.
     * 
     * @returns {HTMLTextAreaElement} El área de texto para el nombre de la tarea.
     */
    crearTextArea() {
        const textArea = document.createElement('textarea');
        textArea.placeholder = this.nombre;
        textArea.addEventListener('input', (e) => {
            this.nombre = e.target.value;
        });
        return textArea;
    }
    /**
    * Crea el `div` que representa visualmente la tarea. 
    * Este `div` contiene un área de texto para editar el nombre de la tarea, un checkbox para marcarla como completada,
    * y un botón con un menú de opciones que permite realizar varias acciones sobre la tarea (eliminar, destacar, duplicar).
    * 
    * @param {HTMLDivElement} listaDiv - El contenedor `div` que representa la lista de tareas a la cual se va a agregar la tarea.
    * @returns {HTMLDivElement} El `div` que representa la tarea con todos sus elementos hijos.
    */
    crearTarea(listaDiv) {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea');
        tareaDiv.draggable = true;
        tareaDiv.id = `tarea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Crear contenedor para checkbox, textarea y botón de opciones
        const contenidoDiv = document.createElement('div');
        contenidoDiv.classList.add('contenido-tarea'); // Clase para manejar estilos

        const textArea = this.crearTextArea();
        const checkbox = this.crearCheckbox(textArea);
        const { opcionesBtn, menuTarea } = this.crearBotonOpciones(tareaDiv, listaDiv);

        // Añadir checkbox, textarea y botón de opciones al contenedor
        contenidoDiv.append(checkbox, textArea, opcionesBtn);

        // Agregar contenedor de menú desplegable aparte (si es necesario)
        tareaDiv.append(contenidoDiv, menuTarea);

        return tareaDiv;
    }

    /**
     * Crea el botón de opciones (⋮) de la tarea, que permite mostrar un menú con acciones como eliminar,
     * destacar y duplicar la tarea.
     * 
     * @param {HTMLDivElement} tareaDiv - El elemento `div` que representa la tarea.
     * @param {HTMLDivElement} listaDiv - El contenedor `div` que representa la lista de la tarea.
     * @returns {Object} Un objeto con las propiedades `opcionesBtn` (el botón de opciones) y `menuTarea` (el menú de opciones).
     */
    crearBotonOpciones(tareaDiv, listaDiv) {
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮';
        const menuTarea = this.crearMenuOpciones(tareaDiv, listaDiv);

        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(menuTarea); // Centraliza la lógica en `toggleMenu`
        });

        // Lógica para cerrar el menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!tareaDiv.contains(e.target)) {
                menuTarea.style.display = 'none';
                if (menuAbierto === menuTarea) {
                    menuAbierto = null; // Limpiar la referencia si se cerró el menú
                }
            }
        });

        return { opcionesBtn, menuTarea };
    }




    /**
    * Crea un menú de opciones para una tarea específica.
    * @param {HTMLDivElement} tareaDiv - El elemento del DOM que representa la tarea.
    * @param {HTMLDivElement} listaDiv - El contenedor de la lista donde se encuentra la tarea.
    * @returns {HTMLDivElement} El menú de opciones creado.
    */
    crearMenuOpciones(tareaDiv, listaDiv) {
        const menuTarea = this.crearMenuBase();

        const eliminarOpcion = this.crearOpcionEliminar(tareaDiv);
        const destacarOpcion = this.crearOpcionDestacar(tareaDiv);
        const duplicarOpcion = this.crearOpcionDuplicar(listaDiv);

        menuTarea.append(eliminarOpcion, destacarOpcion, duplicarOpcion);

        return menuTarea;
    }

    /**
     * Crea el contenedor base del menú de opciones.
     * @returns {HTMLDivElement} El contenedor del menú de opciones.
     */
    crearMenuBase() {
        const menu = document.createElement('div');
        menu.classList.add('menuTarea');
        menu.style.display = 'none';
        return menu;
    }

    /**
     * Crea la opción para eliminar una tarea.
     * @param {HTMLDivElement} tareaDiv - El elemento del DOM que representa la tarea.
     * @returns {HTMLDivElement} El elemento del menú para eliminar la tarea.
     */
    crearOpcionEliminar(tareaDiv) {
        const eliminarOpcion = document.createElement('div');
        eliminarOpcion.textContent = 'Eliminar';
        eliminarOpcion.addEventListener('click', () => this.eliminarTarea(tareaDiv));
        return eliminarOpcion;
    }

    /**
     * Crea la opción para destacar una tarea.
     * @param {HTMLDivElement} tareaDiv - El elemento del DOM que representa la tarea.
     * @returns {HTMLDivElement} El elemento del menú para destacar la tarea.
     */
    crearOpcionDestacar(tareaDiv) {
        const destacarOpcion = document.createElement('div');
        destacarOpcion.textContent = 'Destacar';
        destacarOpcion.addEventListener('click', () => tareaDiv.classList.toggle('destacada'));
        return destacarOpcion;
    }

    /**
     * Crea la opción para duplicar una tarea.
     * @param {HTMLDivElement} listaDiv - El contenedor de la lista donde se encuentra la tarea.
     * @returns {HTMLDivElement} El elemento del menú para duplicar la tarea.
     */
    crearOpcionDuplicar(listaDiv) {
        const duplicarOpcion = document.createElement('div');
        duplicarOpcion.textContent = 'Duplicar';
        duplicarOpcion.addEventListener('click', () => this.duplicarTarea(listaDiv));
        return duplicarOpcion;
    }


    /**
     * Duplicar la tarea actual. Crea una nueva instancia de la tarea con el mismo nombre
     * y la agrega a la lista.
     * 
     * @param {HTMLDivElement} listaDiv - El contenedor `div` que representa la lista de tareas.
     */
    duplicarTarea(listaDiv) {
        // Crear una nueva tarea con el mismo nombre
        const nuevaTarea = new Tarea(this.nombre);

        // Crear el elemento visual para la nueva tarea
        const nuevaTareaDiv = nuevaTarea.crearTarea(listaDiv);

        // Establecer el texto de la tarea duplicada (no como placeholder)
        const textArea = nuevaTareaDiv.querySelector('textarea');
        if (textArea) {
            textArea.value = this.nombre; // Copiar el texto real de la tarea original
        }

        // Asegurarse de que la tarea duplicada tenga su propio ID
        nuevaTarea.id = `tarea-${Date.now()}-${Math.random()}`; // Generar un ID único

        // Añadir la nueva tarea al contenedor visual y a la lista de tareas
        listaDiv.appendChild(nuevaTareaDiv);
    }


    /**
     * Elimina la tarea del DOM.
     * 
     * @param {HTMLDivElement} tareaDiv - El elemento `div` que representa la tarea a eliminar.
     */
    eliminarTarea(tareaDiv) {
        tareaDiv.remove();
    }

    /**
     * Establece la visibilidad de la tarea (mostrar u ocultar).
     * 
     * @param {boolean} visible - Si es `true`, la tarea será visible. Si es `false`, la tarea estará oculta.
     */
    setVisible(visible) {
        const tareaDiv = document.getElementById(this.id);
        if (tareaDiv) {
            tareaDiv.style.display = visible ? 'block' : 'none';
        }
    }
}
/**
 * Alterna la visibilidad del menú. Si el menú está visible (display !== 'none'), lo oculta; 
 * si está oculto (display === 'none'), lo muestra.
 * 
 * @param {HTMLElement} menu - El menú que se quiere mostrar u ocultar. Este debe ser un elemento HTML con una propiedad `style.display`.
 */
function toggleMenu(menu) {
    // Si ya hay un menú abierto y no es el actual, ciérralo
    if (menuAbierto && menuAbierto !== menu) {
        menuAbierto.style.display = 'none'; // Cerrar el menú previamente abierto
    }

    // Alternar el estado del menú actual
    const isMenuVisible = menu.style.display === 'block';
    menu.style.display = isMenuVisible ? 'none' : 'block';

    // Actualizar el menú abierto: si se cerró el actual, resetear a null
    menuAbierto = isMenuVisible ? null : menu;
}


/**
 * Obtiene la instancia de la clase `Tarea` correspondiente al ID de un elemento del DOM.
 * Utiliza una propiedad `tarea` que debe haberse agregado previamente a la tarea al crearla,
 * para referenciar la instancia de la tarea.
 * 
 * @param {string} id - El ID del `div` que representa la tarea. Este debe ser el ID de un elemento `tarea` en el DOM.
 * @returns {Tarea|null} La instancia de la clase `Tarea` asociada al elemento del DOM, o `null` si no se encuentra el elemento.
 */
function getTareaById(id) {
    const tareaDiv = document.getElementById(id);
    if (tareaDiv) {
        return tareaDiv.__tarea__ || null;
    }
    return null;
}
