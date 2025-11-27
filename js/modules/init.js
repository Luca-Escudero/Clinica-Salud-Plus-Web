import { getSession, logout } from "./auth.js";
import { redirectToDashboard } from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const user = getSession(); 
    
    // Si no hay sesión, redirige al login
    if (!user) {
        // Redireccionar al login si no hay usuario logeado
        // Necesitas tener la ruta del login definida o importarla de auth.js
        redirectToDashboard(null); 
        return;
    }

    // 1. Mostrar el nombre del usuario
    const userNameElement = document.getElementById('navbar-user-name');
    const dropdownNameElement = document.getElementById('dropdown-user-name');
    
    if (user.nombre) {
        if (userNameElement) {
            userNameElement.textContent = user.nombre;
        }
        if (dropdownNameElement) {
            dropdownNameElement.textContent = user.nombre;
        }
    }

    // 2. Configurar el botón de Cerrar Sesión
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            logout(); // Llama a la función logout de auth.js
        });
    }
});