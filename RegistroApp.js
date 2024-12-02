class RegistroApp {
    constructor() {
        this.seccionBienvenida = document.getElementById("seccionBienvenida");
        this.bienvenidaDefault = document.getElementById("bienvenidaDefault");
        this.spanNombreUsuario = document.getElementById("nombreUsuario");
        this.formularioRegistro = document.getElementById("formularioRegistro");
        this.formularioInicioSesion = document.getElementById("formularioInicioSesion");
        this.verificarEstadoInicioSesion();

        if (this.formularioRegistro) {
            this.formularioRegistro.addEventListener("submit", (event) => this.procesarRegistro(event));
        }
        if (this.formularioInicioSesion) {
            this.formularioInicioSesion.addEventListener("submit", (event) => this.procesarInicioSesion(event));
        }
    }

    async procesarRegistro(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correoRegistro").value;
        const contrasena = document.getElementById("contrasenaRegistro").value;

        try {
            const response = await fetch('http://localhost:3000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, correo, contrasena })
            });
            // Verifica si la respuesta fue exitosa (status 2xx)
            if (response.ok) {
                const data = await response.json();
                alert(data.mensaje || 'Usuario registrado con éxito');
                this.mostrarEstadoUsuario(nombre); // Llamar para actualizar la interfaz
                localStorage.setItem("usuarioLogueado", JSON.stringify({ nombre })); // Guardar en localStorage
                window.location.href = "index.html"; // Redirigir si es necesario
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Error al registrar usuario');
            }
        } catch (err) {
            console.error('Error al registrar usuario:', err);
            alert('Hubo un error. Intenta nuevamente.');
        }
    }

    async procesarInicioSesion(event) {
        event.preventDefault();
        const correo = document.getElementById("correoInicioSesion").value;
        const contrasena = document.getElementById("contrasenaInicioSesion").value;

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, contrasena })
            });


            const data = await response.json();  // Intentando parsear la respuesta como JSON
            console.log("Respuesta del servidor:", data);
            
            if (response.ok) {
                alert('Inicio de sesión exitoso');
                this.mostrarEstadoUsuario(data.nombre); // Actualizar la interfaz con el nombre del usuario
                localStorage.setItem("usuarioLogueado", JSON.stringify({ nombre: data.nombre })); // Guardar en localStorage
                window.location.href = "index.html"; // Redirigir si es necesario
            }
            else {
                alert(data.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    mostrarEstadoUsuario(nombre) {
        console.log("Mostrando nombre de usuario:", nombre); 
        if (this.bienvenidaDefault) {
            this.bienvenidaDefault.style.display = "none";
        }
        if (this.seccionBienvenida) {
            this.seccionBienvenida.style.display = "block";
        }
        if (this.spanNombreUsuario) {
            this.spanNombreUsuario.textContent = nombre;
        }
    }

    verificarEstadoInicioSesion() {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if (usuario) {
            this.mostrarEstadoUsuario(usuario.nombre);
            const botonCerrarSesion = document.querySelector("button[onclick='cerrarSesion()']");
            if (botonCerrarSesion) {
                botonCerrarSesion.style.display = "block"; // Mostrar botón de cerrar sesión
            }
        } else {
            if (this.seccionBienvenida) {
                this.seccionBienvenida.style.display = "none";  // Ocultar sección de bienvenida
            }
            if (this.bienvenidaDefault) {
                this.bienvenidaDefault.style.display = "block"; // Mostrar mensaje predeterminado
            }
        }
    }
    
    
    cerrarSesion() {
        localStorage.removeItem("usuarioLogueado");
        if (this.seccionBienvenida) {
            this.seccionBienvenida.style.display = "none";
        }
        if (this.bienvenidaDefault) {
            this.bienvenidaDefault.style.display = "block";
        }
        window.location.href = "registro.html";  // Redirige al registro después de cerrar sesión
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new RegistroApp();
    const botonCerrarSesion = document.getElementById("cerrarSesion");
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener("click", () => app.cerrarSesion());
    }
});

