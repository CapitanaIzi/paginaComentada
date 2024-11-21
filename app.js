class App {
    constructor() {
      this.listaSemanalContenedor = document.getElementById('lista-semanal');
      this.listaPersonalContenedor = document.getElementById('listas-personales');
      this.listaMesContenedor = document.getElementById('listas-mes');
      this.listaSemanal = new ListaSemanal(this.listaSemanalContenedor);
  
      this.init();
    }
  
    /**
     * Inicializa los eventos de la aplicación.
     */
    init() {
      this.configurarListaSemanal();
      this.configurarListaPersonal();
      this.configurarListaMensual();
      this.configurarBotonGuardar();
      this.listaSemanal.crearListaSemanal();
    }
  
    /**
     * Configura el evento para crear una nueva lista semanal.
     */
    configurarListaSemanal() {
      document.getElementById('btn-semanal').addEventListener('click', () => {
        this.listaSemanal.crearListaSemanal();
      });
    }
  
    /**
     * Configura el evento para crear una nueva lista personal.
     */
    configurarListaPersonal() {
      document.getElementById('btn-personal').addEventListener('click', () => {
        const nuevaLista = new Lista('Agregue Titulo');
        this.listaPersonalContenedor.appendChild(nuevaLista.crearListaElement());
      });
    }
  
    /**
     * Configura el evento para crear una nueva lista mensual.
     */
    configurarListaMensual() {
      document.getElementById('btn-mensual').addEventListener('click', () => {
        const nuevaLista = new Lista('Agosto');
        this.listaMesContenedor.appendChild(nuevaLista.crearListaElement());
      });
    }
  
   
    /**
     * Configura el evento para el botón Guardar.
     */
    configurarBotonGuardar() {
      document.getElementById('btn-guardar').addEventListener('click', () => {
        // Aquí puedes agregar la lógica para guardar los datos
        alert('Cambios guardados exitosamente.');
  
        // Ejemplo de lógica adicional (puedes adaptarlo a tu necesidad)
        // Guarda las listas en el localStorage, servidor, etc.
        this.guardarListas();
      });
    }
  
    /**
     * Método de ejemplo para guardar las listas (puedes modificarlo)
     */
    guardarListas() {
      const listas = {
        listaSemanal: this.listaSemanal.obtenerDatos(), // Aquí deberías tener un método en ListaSemanal que devuelva los datos
        // Agregar otros métodos similares para las otras listas
      };
  
      // Ejemplo: guardar en localStorage
      localStorage.setItem('listasPendientes', JSON.stringify(listas));
      console.log('Listas guardadas:', listas);
    }
  }
  
  const app = new App();
  