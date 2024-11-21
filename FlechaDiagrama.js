class FlechaDiagrama {
    constructor(width = '100px', left = '50%', top = '50%', rotation = 'rotate(0deg)') {
        this.type = 'flecha';
        this.width = width;
        this.left = left;
        this.top = top;
        this.rotation = rotation;

        // Crear el elemento y añadirlo al DOM
        this.element = this.crearElemento();
        this.habilitarArrastre();
        this.habilitarRotacion();
        this.habilitarTamano();
    }

    /**
     * Crea el elemento de la flecha y lo agrega al DOM.
     * @returns {HTMLElement} El elemento div que representa la flecha.
     */
    crearElemento() {
        const flecha = document.createElement('div');
        flecha.classList.add('flecha');
        flecha.style.width = this.width;
        flecha.style.left = this.left;
        flecha.style.top = this.top;
        flecha.style.transform = this.rotation;

        // Agregar al DOM
        document.getElementById('mapa-conceptual').appendChild(flecha);
        return flecha;
    }

    /**
     * Habilita el arrastre de la flecha.
     */
    habilitarArrastre() {
        this.element.addEventListener('mousedown', (e) => this.iniciarArrastre(e));
        document.addEventListener('mousemove', (e) => this.moverElemento(e));
        document.addEventListener('mouseup', () => this.terminarArrastre());
    }

    /**
     * Inicia el proceso de arrastre de la flecha.
     * @param {MouseEvent} e - Evento de mouse.
     */
    iniciarArrastre(e) {
        this.isDragging = true;
        this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
        this.element.style.cursor = 'grabbing';
    }

    /**
     * Mueve el elemento mientras se arrastra.
     * @param {MouseEvent} e - Evento de movimiento del mouse.
     */
    moverElemento(e) {
        if (this.isDragging) {
            this.element.style.left = (e.pageX - this.offsetX) + 'px';
            this.element.style.top = (e.pageY - this.offsetY) + 'px';
        }
    }

    /**
     * Termina el proceso de arrastre de la flecha.
     */
    terminarArrastre() {
        this.isDragging = false;
        this.element.style.cursor = 'grab';
    }


    /**
   * Habilita la funcionalidad de rotación de Flecha
   */
    habilitarRotacion() {
        const controlRotacion = this.crearControlRotacion(); // Crear el control visual para rotar
        this.element.appendChild(controlRotacion);

        const estadoRotacion = this.inicializarEstadoRotacion(); // Estado inicial para la rotación

        // Event listeners
        controlRotacion.addEventListener('mousedown', (e) => this.iniciarRotacion(e, estadoRotacion));
        document.addEventListener('mousemove', (e) => this.rotarElemento(e, estadoRotacion));
        document.addEventListener('mouseup', () => this.terminarRotacion(estadoRotacion));
    }

    /**
     * Crea y retorna el control visual para rotación.
     * @returns {HTMLElement} - El control de rotación.
     */
    crearControlRotacion() {
        const controlRotacion = document.createElement('div');
        controlRotacion.classList.add('control-rotacion');
        return controlRotacion;
    }

    /**
     * Inicializa el estado para la rotación.
     * @returns {Object} - Objeto que contiene las propiedades iniciales de rotación.
     */
    inicializarEstadoRotacion() {
        return {
            isRotating: false,
            lastAngle: 0,
        };
    }

    /**
     * Inicia el proceso de rotación.
     * @param {MouseEvent} e - El evento del ratón.
     * @param {Object} estadoRotacion - El estado actual de la rotación.
     */
    iniciarRotacion(e, estadoRotacion) {
        estadoRotacion.isRotating = true;
        e.stopPropagation(); // Evitar propagación del evento al mover el elemento
    }

    /**
     * Rota el elemento según la posición del ratón.
     * @param {MouseEvent} e - El evento del ratón.
     * @param {Object} estadoRotacion - El estado actual de la rotación.
     */
    rotarElemento(e, estadoRotacion) {
        if (!estadoRotacion.isRotating) return;

        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calcular el ángulo de rotación en grados
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        this.element.style.transform = `rotate(${angle}deg)`;
        estadoRotacion.lastAngle = angle;
    }

    /**
     * Termina el proceso de rotación.
     * @param {Object} estadoRotacion - El estado actual de la rotación.
     */
    terminarRotacion(estadoRotacion) {
        estadoRotacion.isRotating = false;
    }



    /**
     * Habilita la funcionalidad de redimensionar un elemento con control visual.
     */
    habilitarTamano() {
        const controlTamano = this.crearControlTamano(); // Crear el control visual
        this.element.appendChild(controlTamano);

        let estadoRedimension = this.inicializarEstadoRedimension(); // Estado inicial para el redimensionamiento

        // Event listeners
        controlTamano.addEventListener('mousedown', (e) => this.iniciarRedimension(e, estadoRedimension));
        document.addEventListener('mousemove', (e) => this.redimensionarElemento(e, estadoRedimension));
        document.addEventListener('mouseup', () => this.terminarRedimension(estadoRedimension));
    }

    /**
     * Crea y retorna el control visual para redimensionar.
     * @returns {HTMLElement} - El control de tamaño.
     */
    crearControlTamano() {
        const controlTamano = document.createElement('div');
        controlTamano.classList.add('control-tamano');
        return controlTamano;
    }

    /**
     * Inicializa el estado para el redimensionamiento.
     * @returns {Object} - Objeto que contiene las propiedades iniciales.
     */
    inicializarEstadoRedimension() {
        return {
            isResizing: false,
            initialMouseX: 0,
            initialMouseY: 0,
            initialWidth: 0,
            initialHeight: 0,
            rotationAngle: 0,
        };
    }

    /**
     * Inicia el proceso de redimensionar.
     * @param {MouseEvent} e - El evento del ratón.
     * @param {Object} estadoRedimension - El estado actual del redimensionamiento.
     */
    iniciarRedimension(e, estadoRedimension) {
        estadoRedimension.isResizing = true;
        e.stopPropagation();

        const rect = this.element.getBoundingClientRect();
        estadoRedimension.initialMouseX = e.clientX;
        estadoRedimension.initialMouseY = e.clientY;
        estadoRedimension.initialWidth = rect.width;
        estadoRedimension.initialHeight = rect.height;

        // Obtener ángulo de rotación si existe
        const transform = window.getComputedStyle(this.element).transform;
        if (transform !== 'none') {
            const values = transform.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            estadoRedimension.rotationAngle = Math.atan2(b, a); // Ángulo en radianes
        } else {
            estadoRedimension.rotationAngle = 0;
        }
    }

    /**
     * Redimensiona el elemento según el movimiento del ratón.
     * @param {MouseEvent} e - El evento del ratón.
     * @param {Object} estadoRedimension - El estado actual del redimensionamiento.
     */
    redimensionarElemento(e, estadoRedimension) {
        if (!estadoRedimension.isResizing) return;

        const { initialMouseX, initialMouseY, initialWidth, rotationAngle } = estadoRedimension;
        const mouseDiffX = e.clientX - initialMouseX;
        const mouseDiffY = e.clientY - initialMouseY;

        // Calcular desplazamiento ajustado según el ángulo de rotación
        const deltaX = Math.cos(rotationAngle) * mouseDiffX + Math.sin(rotationAngle) * mouseDiffY;

        // Calcular el nuevo ancho asegurando un valor mínimo
        const newWidth = initialWidth + deltaX;
        if (newWidth > 20) {
            this.element.style.width = `${Math.abs(newWidth)}px`;
        }
    }

    /**
     * Termina el proceso de redimensionamiento.
     * @param {Object} estadoRedimension - El estado actual del redimensionamiento.
     */
    terminarRedimension(estadoRedimension) {
        estadoRedimension.isResizing = false;
    }


    /**
     * Obtiene los datos de la flecha como un objeto.
     * @returns {Object} Datos de la flecha.
     */
    obtenerDatos() {
        return {
            type: this.type,
            width: this.width,
            left: this.left,
            top: this.top,
            rotation: this.rotation,
        };
    }
}
