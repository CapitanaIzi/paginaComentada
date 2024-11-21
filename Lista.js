let menuListaAbierto = null;

class Lista {
    constructor(titulo = "Título") {
        this.titulo = titulo;
        this.tareas = [new Tarea(), new Tarea(), new Tarea()]; 
        this.listaDiv = this.crearListaElement(); 
        this.expandida = true; 
    }

    /**
     * Crea el contenedor visual de la lista, incluyendo el título y las tareas.
     * 
     * @returns {HTMLDivElement} El contenedor de la lista con título y tareas.
     */
    crearListaElement() {
        this.listaDiv = document.createElement('div');
        this.listaDiv.classList.add('lista-basica');

        const tituloContainer = this.crearTituloContainer();
        this.listaDiv.appendChild(tituloContainer);

        // Crear las tareas y agregarlas al contenedor
        this.tareas.forEach((tarea) => {
            const tareaElement = tarea.crearTarea(this.listaDiv);
            tarea.element = tareaElement;
            tareaElement.style.display = this.expandida ? 'block' : 'none'; // Controlar visibilidad
            this.listaDiv.appendChild(tareaElement);
        });

        return this.listaDiv;
    }

    /**
     * Crea el contenedor del título de la lista y el botón de opciones.
     * 
     * @returns {HTMLDivElement} El contenedor del título con el botón de opciones.
     */
    crearTituloContainer() {
        const tituloContainer = this.crearContenedorTitulo();
        const tituloInput = this.crearTituloInput();
        const iconoExpandir = this.crearIconoExpandir();
        const opcionesBtn = this.crearBotonOpciones();
    
        tituloContainer.appendChild(tituloInput);
        tituloContainer.appendChild(iconoExpandir);
        tituloContainer.appendChild(opcionesBtn);
    
        return tituloContainer;
    }
    
    /**
     * Función para crear el contenedor principal
     * @returns el contenerdor
     */
    crearContenedorTitulo() {
        const container = document.createElement('div');
        container.classList.add('titulo-container');
        return container;
    }
    /**
     * Función para crear y configurar el input del título
     * @returns el input
     */
    crearTituloInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = this.titulo;
        input.addEventListener('input', (e) => {
            this.titulo = e.target.value; // Actualiza el título de la lista
        });
        return input;
    }
    
     /**
      * Función para crear y configurar el ícono de expandir/contraer
      * @returns icono
      */
    crearIconoExpandir() {
        const icono = document.createElement('span');
        icono.classList.add('icono-expandir', 'fas', 'fa-chevron-down'); // Ícono inicial de expandir
        icono.style.cursor = 'pointer';
    
        icono.addEventListener('click', () => {
            this.expandida = !this.expandida;
            icono.classList.toggle('fa-chevron-down', !this.expandida); // Ícono de expandir
            icono.classList.toggle('fa-chevron-up', this.expandida);   // Ícono de contraer
            this.actualizarVisibilidadTareas(); // Actualiza la visibilidad de las tareas
        });
    
        return icono;
    }
    

    /**
     * Crea el botón de opciones, que despliega un menú al hacer clic.
     * 
     * @returns {HTMLButtonElement} El botón de opciones.
     */
    crearBotonOpciones() {
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮'; // Ícono de tres puntos para las opciones
        const menuLista = this.crearMenuOpciones(); // Menú de opciones
    
        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(menuLista); // Usar la función centralizada de toggleMenu
        });
    
        // Cerrar el menú cuando se haga clic fuera de él
        document.addEventListener('click', (e) => {
            if (!this.listaDiv.contains(e.target)) {
                menuLista.style.display = 'none'; // Ocultar el menú
                if (menuListaAbierto === menuLista) {
                    menuListaAbierto = null; // Limpiar la referencia del menú abierto
                }
            }
        });
    
        opcionesBtn.appendChild(menuLista);
        return opcionesBtn;
    }

    /**
     * Crea un menú con las opciones disponibles: agregar, eliminar y ordenar.
     * 
     * @returns {HTMLDivElement} El menú con las opciones.
     */
    crearMenuOpciones() {
        const menuLista = document.createElement('div');
        menuLista.classList.add('menu-lista');
        menuLista.style.display = 'none'; // El menú está oculto por defecto
    
        // Crear las opciones del menú
        const opcionEliminar = this.crearOpcionEliminar(menuLista);
        const opcionAgregar = this.crearOpcionAgregar(menuLista);
        const opcionOrdenar = this.crearOpcionOrdenar(menuLista);
    
        menuLista.append(opcionEliminar, opcionAgregar, opcionOrdenar);
        return menuLista;
    }
    
    /**
     * Crea la opción para agregar una tarea en el menú.
     * 
     * @param {HTMLDivElement} menuLista - El contenedor del menú.
     * @returns {HTMLDivElement} El ítem de la opción "Agregar".
     */
    crearOpcionAgregar(menuLista) {
        const opcionAgregar = document.createElement('div');
        const iconoAgregar = document.createElement('i');
        iconoAgregar.classList.add('fas', 'fa-plus'); // Ícono de agregar
        opcionAgregar.appendChild(iconoAgregar);
    
        // Acción al hacer clic: agregar una nueva tarea
        opcionAgregar.addEventListener('click', () => {
            const nuevaTarea = new Tarea();
            this.agregarTarea(nuevaTarea);
            menuLista.style.display = 'none'; // Cerrar el menú después de agregar
        });
    
        return opcionAgregar;
    }
    
    /**
     * Crea la opción para eliminar la lista en el menú.
     * 
     * @returns {HTMLDivElement} El ítem de la opción "Eliminar".
     */
    crearOpcionEliminar() {
        const opcionEliminar = document.createElement('div');
        const iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash'); // Ícono de eliminar
        opcionEliminar.appendChild(iconoEliminar);
    
        // Acción al hacer clic: eliminar la lista
        opcionEliminar.addEventListener('click', () => {
            this.listaDiv.remove(); // Eliminar el contenedor de la lista
        });
    
        return opcionEliminar;
    }

    /**
     * Crea la opción para ordenar las tareas en el menú.
     * 
     * @returns {HTMLDivElement} El ítem de la opción "Ordenar".
     */
    crearOpcionOrdenar() {
        const opcionOrdenar = document.createElement('div');
        const iconoOrdenar = document.createElement('i');
        iconoOrdenar.classList.add('fas', 'fa-sort'); // Ícono de ordenar
        opcionOrdenar.appendChild(iconoOrdenar);
    
        // Acción al hacer clic: ordenar las tareas
        opcionOrdenar.addEventListener('click', () => {
            this.ordenarTareas(); // Ordenar tareas
        });
    
        return opcionOrdenar;
    }

    /**
     * Ordena las tareas de la lista por su estado de completado.
     * Las tareas completadas se colocan al final.
     */
    ordenarTareas() {
        this.tareas.sort((a, b) => a.completada - b.completada); // Ordenar por estado de completado
    
        // Limpiar las tareas actuales en el DOM
        this.tareas.forEach((tarea) => {
            if (tarea.element && tarea.element.parentElement === this.listaDiv) {
                this.listaDiv.removeChild(tarea.element);
            }
        });
    
        // Reagregar las tareas en el orden actualizado
        this.tareas.forEach((tarea) => {
            if (tarea.completada) {
                tarea.element.querySelector('textarea').classList.add('tachado'); // Aplicar el estilo de tachado
            }
            this.listaDiv.appendChild(tarea.element);
        });
    }
   
    /**
   * Añade una nueva tarea a la lista visualmente y en el array `this.tareas`.
   * 
   * @param {Tarea} tarea - La tarea que se va a añadir.
   */
    agregarTarea() {
        const nuevaTarea = new Tarea();
        const tareaElement = nuevaTarea.crearTarea();
        tareaElement.style.display = this.expandida ? 'block' : 'none'; // Establecer visibilidad según el estado de expansión
        nuevaTarea.element = tareaElement;
        this.tareas.push(nuevaTarea);
        this.listaDiv.appendChild(tareaElement);

        // Asegurarse de que la visibilidad de todas las tareas se actualice
        this.actualizarVisibilidadTareas();
    }
    /**
     * Actualiza la visibilidad de las tareas dependiendo del estado de expansión de la lista.
     */
    actualizarVisibilidadTareas() {
        this.tareas.forEach((tarea) => {
            if (tarea.element && tarea.element.parentElement === this.listaDiv) {
                tarea.element.style.display = this.expandida ? 'block' : 'none';
            }
        });
    }
}

/**
 * Alterna la visibilidad de un menú, cerrando cualquier otro menú que esté abierto.
 * 
 * @param {HTMLDivElement} menu - El menú que se debe mostrar u ocultar.
 */
function toggleMenu(menu) {
    if (menuListaAbierto && menuListaAbierto !== menu) {
        menuListaAbierto.style.display = 'none'; // Cerrar el menú previamente abierto
    }

    // Alternar visibilidad del menú actual
    const isMenuVisible = menu.style.display === 'block';
    menu.style.display = isMenuVisible ? 'none' : 'block';

    // Actualizar la referencia del menú abierto
    menuListaAbierto = isMenuVisible ? null : menu;
}
