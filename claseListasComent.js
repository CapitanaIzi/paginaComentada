class Lista {
    constructor(titulo = "Título") {
        this.titulo = titulo;
        this.tareas = [new Tarea(), new Tarea(), new Tarea()];
        this.listaDiv = this.crearListaElement();
        this.expandida = true; // Estado de expansión de la lista
        // Crear línea guía
        this.lineaGuia = document.createElement('div');
        this.lineaGuia.classList.add('linea-guia');
        this.listaDiv.appendChild(this.lineaGuia);

        this.agregarComportamientoDeArrastre(); // Llamada al método para agregar comportamiento
    }
    /**
     * Configura el comportamiento de arrastre y soltado en la lista.
     * Permite mover tareas dentro de la lista y muestra una línea guía cuando se arrastra una tarea.
     */
    agregarComportamientoDeArrastre() {
        this.configurarArrastreSobreLista();
        this.configurarSueltaEnLista();
        this.configurarArrastreFueraDeLista();
    }

    /**
     * Configura el evento dragover para permitir el arrastre dentro de la lista.
     * Muestra la línea guía en la posición de la tarea objetivo.
     */
    configurarArrastreSobreLista() {
        this.listaDiv.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permitir el evento de soltado
            const tarea = e.target.closest('.tarea'); // Obtener la tarea objetivo
            if (tarea) {
                this.mostrarLineaGuia(tarea);
            } else {
                this.ocultarLineaGuia();
            }
        });
    }

    /**
     * Configura el evento dragleave para ocultar la línea guía cuando se sale de la lista.
     */
    configurarArrastreFueraDeLista() {
        this.listaDiv.addEventListener('dragleave', () => {
            this.ocultarLineaGuia(); // Ocultar la línea guía cuando el arrastre sale de la lista
        });
    }

    /**
     * Configura el evento drop para mover la tarea dentro de la lista.
     */
    configurarSueltaEnLista() {
        this.listaDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const tareaId = e.dataTransfer.getData('text/plain');
            const tarea = document.getElementById(tareaId);
            if (tarea) {
                this.moverTarea(tarea);
            }
            this.ocultarLineaGuia(); // Ocultar la línea guía después de soltar
        });
    }

    /**
     * Muestra la línea guía en la posición de la tarea objetivo.
     * @param {Element} tarea - La tarea objetivo en la que se debe mostrar la línea guía.
     */
    mostrarLineaGuia(tarea) {
        this.lineaGuia.style.display = 'block';
        this.lineaGuia.style.top = tarea.offsetTop + 'px'; // Posicionar la línea en la parte superior de la tarea
    }

    /**
     * Oculta la línea guía.
     */
    ocultarLineaGuia() {
        this.lineaGuia.style.display = 'none';
    }

    /**
     * Mueve la tarea dentro de la lista.
     * @param {Element} tarea - La tarea a mover.
     */
    moverTarea(tarea) {
        this.listaDiv.appendChild(tarea); // Mueve la tarea a esta lista
    }
   /**
 * Crea el elemento visual de la lista, que incluye el contenedor de la lista, el título,
 * y las tareas asociadas a la lista. Este método organiza los elementos en el DOM y los
 * prepara para ser mostrados.
 * 
 * @returns {HTMLDivElement} El contenedor principal de la lista, que incluye el título
 *                           y las tareas en su interior.
 */
crearListaElement() {
    // Crea el contenedor principal de la lista
    this.listaDiv = document.createElement('div');
    this.listaDiv.classList.add('lista-basica');  // Agrega la clase CSS para estilizar la lista

    // Crea el contenedor del título y las opciones (como editar o eliminar la lista)
    const tituloContainer = this.crearTituloContainer();
    this.listaDiv.appendChild(tituloContainer);  // Agrega el contenedor del título al contenedor principal

    // Itera sobre las tareas y las crea visualmente, agregándolas a la lista
    this.tareas.forEach((tarea) => {
        const tareaElement = tarea.crearTarea(this.listaDiv);  // Crea el elemento visual de la tarea
        tarea.element = tareaElement;  // Asocia el elemento DOM con la tarea
        this.listaDiv.appendChild(tareaElement);  // Agrega el elemento de la tarea al contenedor de la lista
    });

    // Devuelve el contenedor principal de la lista con el título y las tareas
    return this.listaDiv;
}

    /**
 * Crea un contenedor para el título de la lista y el botón de opciones.
 * Este contenedor incluye un campo de entrada para modificar el título y un botón que
 * despliega un menú de opciones.
 * 
 * @returns {HTMLDivElement} El contenedor del título con las opciones asociadas.
 */
    crearTituloContainer() {
        const tituloContainer = document.createElement('div');
        tituloContainer.classList.add('titulo-container');

        const tituloInput = document.createElement('input');
        tituloInput.type = 'text';
        tituloInput.placeholder = this.titulo;
        // Evento para actualizar el título cuando el input cambie
        tituloInput.addEventListener('input', (e) => {
            this.titulo = e.target.value;  // Actualiza el título cuando se modifica el valor del input
        });

        const opcionesBtn = this.crearBotonOpciones(); // Crea el botón para las opciones
        tituloContainer.appendChild(tituloInput);
        tituloContainer.appendChild(opcionesBtn);

        return tituloContainer;  // Devuelve el contenedor con el título y el botón de opciones
    }

    /**
     * Crea el botón de opciones, que abre un menú al hacer clic.
     * El botón tendrá un ícono de tres puntos ('⋮') y al hacer clic en él, 
     * se despliega un menú con varias opciones.
     * 
     * @returns {HTMLButtonElement} El botón de opciones.
     */
    crearBotonOpciones() {
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮';  // El texto del botón será el ícono '⋮'
        const menuLista = this.crearMenuOpciones();  // Crea el menú de opciones

        // Maneja el evento de clic en el botón de opciones
        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();  // Evita que el evento se propague al documento
            // Alterna la visibilidad del menú de opciones
            menuLista.style.display = menuLista.style.display === 'none' ? 'block' : 'none';
        });

        // Configura el evento para cerrar el menú si se hace clic fuera del menú
        document.addEventListener('click', () => {
            menuLista.style.display = 'none';
        });

        opcionesBtn.appendChild(menuLista);  // Añade el menú de opciones al botón
        return opcionesBtn;  // Devuelve el botón con el menú adjunto
    }

    /**
     * Crea el menú de opciones que se desplegará al hacer clic en el botón de opciones.
     * Este menú tiene varias acciones, como agregar, eliminar y expandir/contraer la lista.
     * 
     * @returns {HTMLDivElement} El contenedor del menú de opciones.
     */
    crearMenuOpciones() {
        const menuLista = document.createElement('div');
        menuLista.classList.add('menu-lista');
        menuLista.style.display = 'none';  // Inicialmente el menú está oculto

        // Añade las opciones del menú
        const opcionAgregar = this.crearOpcionAgregar(menuLista);
        const opcionEliminar = this.crearOpcionEliminar(menuLista);
        const opcionExpandirContraer = this.crearOpcionExpandirContraer(menuLista);

        menuLista.append(opcionAgregar, opcionEliminar, opcionExpandirContraer);  // Agrega las opciones al menú
        return menuLista;  // Devuelve el menú con las opciones
    }

    /**
     * Añade una nueva tarea a la lista de tareas.
     * 
     * @param {Tarea} tarea - La tarea que se va a añadir.
     */
    agregarTarea(tarea) {
        this.tareas.push(tarea);  // Agrega la nueva tarea al array de tareas
    }

    /**
     * Crea la opción "Agregar" dentro del menú de opciones. Al hacer clic en esta opción, 
     * se añadirá una nueva tarea a la lista.
     * 
     * @param {HTMLDivElement} menuLista - El contenedor donde se añadirá la opción "Agregar".
     * @returns {HTMLDivElement} La opción "Agregar" del menú.
     */
    crearOpcionAgregar(menuLista) {
        const opcionAgregar = document.createElement('div');
        opcionAgregar.textContent = 'Agregar';  // El texto de la opción es "Agregar"

        // Maneja el evento de clic para agregar una nueva tarea
        opcionAgregar.addEventListener('click', () => {
            const nuevaTarea = new Tarea();  // Crea una nueva instancia de tarea
            this.agregarTarea(nuevaTarea);  // Añade la nueva tarea al array de tareas
            const nuevaTareaElement = nuevaTarea.crearTarea();  // Crea el elemento visual de la tarea
            nuevaTarea.element = nuevaTareaElement;  // Asocia el elemento visual con la tarea

            // Asegura que la tarea se expanda o contraiga según el estado de la lista
            nuevaTareaElement.style.display = this.expandida ? 'block' : 'none';  // Cambia la visibilidad de la tarea
            this.listaDiv.appendChild(nuevaTareaElement);  // Añade la nueva tarea al contenedor de tareas
            menuLista.style.display = 'none';  // Oculta el menú de opciones después de agregar la tarea
        });

        return opcionAgregar;  // Devuelve la opción "Agregar"
    }

    /**
     * Crea la opción "Eliminar" dentro del menú de opciones. Al hacer clic en esta opción, 
     * se eliminará la lista completa.
     * 
     * @returns {HTMLDivElement} La opción "Eliminar" del menú.
     */
    crearOpcionEliminar() {
        const opcionEliminar = document.createElement('div');
        opcionEliminar.textContent = 'Eliminar';  // El texto de la opción es "Eliminar"

        // Maneja el evento de clic para eliminar la lista
        opcionEliminar.addEventListener('click', () => {
            this.listaDiv.remove();  // Elimina el contenedor de la lista del DOM
        });

        return opcionEliminar;  // Devuelve la opción "Eliminar"
    }

    /**
     * Crea la opción "Expandir/Contraer" dentro del menú de opciones. Al hacer clic en esta opción,
     * se cambiará el estado de expansión de la lista (expandir o contraer todas las tareas).
     * 
     * @param {HTMLDivElement} menuLista - El contenedor donde se añadirá la opción "Expandir/Contraer".
     * @returns {HTMLDivElement} La opción "Expandir/Contraer" del menú.
     */
    crearOpcionExpandirContraer(menuLista) {
        const opcionExpandirContraer = document.createElement('div');
        opcionExpandirContraer.textContent = 'Contraer';  // El texto de la opción es "Contraer"

        // Maneja el evento de clic para expandir o contraer la lista
        opcionExpandirContraer.addEventListener('click', () => {
            this.expandida = !this.expandida;  // Cambia el estado de expansión (expandida o no)
            opcionExpandirContraer.textContent = this.expandida ? 'Contraer' : 'Expandir';  // Actualiza el texto de la opción

            // Cambia la visibilidad de todas las tareas según el estado expandida
            this.tareas.forEach((tarea) => {
                if (tarea.element) {
                    tarea.element.style.display = this.expandida ? 'block' : 'none';
                }
            });

            menuLista.style.display = 'none';  // Oculta el menú de opciones después de hacer la acción
        });

        return opcionExpandirContraer;  // Devuelve la opción "Expandir/Contraer"
    }

}