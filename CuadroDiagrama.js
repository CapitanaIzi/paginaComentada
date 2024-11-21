class CuadroDiagrama {
    constructor(content = '', left = '50%', top = '50%', backgroundColor = 'white') {
        this.type = 'cuadro';
        this.content = content;
        this.left = left;
        this.top = top;
        this.backgroundColor = backgroundColor;
        this.element = this.crearElemento();
        this.habilitarArrastre();
    }

    /**
     * Crea el elemento div para el cuadro y lo agrega al DOM.
     */
    crearElemento() {
        const cuadro = document.createElement('div');
        cuadro.classList.add('cuadro');
        cuadro.setAttribute('contenteditable', 'true');
        cuadro.innerText = this.content;
        cuadro.style.left = this.left;
        cuadro.style.top = this.top;
        cuadro.style.backgroundColor = this.backgroundColor;

        document.getElementById('mapa-conceptual').appendChild(cuadro);
        return cuadro;
    }


    /**
     * Habilita la funcionalidad de arrastre en un elemento, en este caso el cuadro.
     */
    habilitarArrastre() {
        const estadoArrastre = this.inicializarEstadoArrastre(); // Inicializa el estado de arrastre

        // Event listeners para manejar el arrastre
        this.element.addEventListener('mousedown', (e) => this.iniciarArrastre(e, estadoArrastre));
        document.addEventListener('mousemove', (e) => this.moverElemento(e, estadoArrastre));
        document.addEventListener('mouseup', () => this.terminarArrastre(estadoArrastre));
    }

    /**
     * Inicializa el estado para el arrastre.
     * @returns {Object} - Objeto que contiene las propiedades iniciales de arrastre.
     */
    inicializarEstadoArrastre() {
        return {
            isDragging: false,
            offsetX: 0,
            offsetY: 0,
        };
    }

    /**
     * Inicia el proceso de arrastre.
     * @param {MouseEvent} e - El evento del ratón.
     * @param {Object} estadoArrastre - El estado actual del arrastre.
     */
    iniciarArrastre(e, estadoArrastre) {
        estadoArrastre.isDragging = true;
        estadoArrastre.offsetX = e.offsetX;
        estadoArrastre.offsetY = e.offsetY;

        this.element.style.cursor = 'grabbing';
        this.element.style.position = 'absolute'; // Asegurarse de que el elemento sea arrastrable
    }

    /**
     * Mueve el elemento según la posición del ratón.
     * @param {MouseEvent} e - El evento del ratón.
     * @param {Object} estadoArrastre - El estado actual del arrastre.
     */
    moverElemento(e, estadoArrastre) {
        if (!estadoArrastre.isDragging) return;

        // Ajustar la posición del elemento
        this.element.style.left = `${e.pageX - estadoArrastre.offsetX}px`;
        this.element.style.top = `${e.pageY - estadoArrastre.offsetY}px`;
    }

    /**
     * Termina el proceso de arrastre.
     * @param {Object} estadoArrastre - El estado actual del arrastre.
     */
    terminarArrastre(estadoArrastre) {
        estadoArrastre.isDragging = false;
        this.element.style.cursor = 'grab';
    }


    /**
     * Obtiene los datos del cuadro como un objeto.
     * @returns {Object} Objeto que contiene los datos del cuadro.
     */
    obtenerDatos() {
        return {
            type: this.type,
            content: this.content,
            left: this.left,
            top: this.top,
            backgroundColor: this.backgroundColor,
        };
    }
}
