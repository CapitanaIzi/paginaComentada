class RegistroApp {
    constructor() {
        
        this.formularioRegistro = document.getElementById('registroForm');
        this.mensajeExitoso = document.getElementById('registroExitoso');
        this.inputNombre = document.getElementById('nombre');
        this.inputEmail = document.getElementById('email');
        this.inputContrasena = document.getElementById('password');
        this.inputContenido = document.getElementById('contenido');

        this.verificarRegistroUsuario();
        this.formularioRegistro.addEventListener('submit', (evento) => this.manejarRegistro(evento));
    }

    /**
     * Maneja el registro del usuario cuando el formulario es enviado.
     * Evita que se recargue la página y guarda los datos del usuario.
     * 
     * @param {Event} evento - El evento de submit del formulario.
     */
    manejarRegistro(evento) {
        evento.preventDefault(); // Evita que se recargue la página al enviar el formulario

        // Obtiene los valores de los campos del formulario
        const nombre = this.inputNombre.value;
        const email = this.inputEmail.value;
        const contrasena = this.inputContrasena.value;

        // Verifica si todos los campos están completos
        if (nombre && email && contrasena) {
            
            this.guardarUsuario({ nombre, email, contrasena });

            // Oculta el formulario y muestra el mensaje de éxito
            this.formularioRegistro.style.display = 'none';
            this.mensajeExitoso.style.display = 'block';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    /**
     * Guarda los datos del usuario en localStorage.
     * 
     * @param {Object} usuario - Objeto con los datos del usuario (nombre, email, contrasena).
     */
    guardarUsuario(usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario)); // Guarda el usuario como una cadena JSON
    }

    /**
     * Verifica si el usuario ya está registrado al cargar la página.
     * Si el usuario está registrado, muestra un mensaje de bienvenida y oculta el formulario.
     */
    verificarRegistroUsuario() {
        const usuarioGuardado = localStorage.getItem('usuario'); // Intenta obtener los datos del usuario guardados

        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado); // Convierte la cadena JSON a un objeto
            alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`); // Muestra un mensaje de bienvenida

            // Oculta el formulario de registro y muestra el mensaje de éxito
            this.formularioRegistro.style.display = 'none';
            this.mensajeExitoso.style.display = 'block';
        }
    }

    /**
     * Guarda el contenido ingresado en el área de texto en localStorage.
     * Muestra un mensaje de confirmación o error.
     */
    guardarContenido() {
        const contenido = this.inputContenido.value; // Obtiene el valor del contenido del área de texto

        if (contenido) {
            localStorage.setItem('contenidoModificado', contenido); // Guarda el contenido en localStorage
            alert('Contenido guardado correctamente.'); // Muestra un mensaje de éxito
        } else {
            alert('Por favor, escribe algo antes de guardar.'); // Muestra un mensaje de error si no hay contenido
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
 new RegistroApp(); // Crea una nueva instancia de la aplicación de registro
});
