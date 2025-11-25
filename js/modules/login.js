// Archivo: js/login.js
console.log('[login.js] módulo cargado'); // <-- agrega esto para confirmar carga del módulo
import { loginUser, redirectToDashboard } from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if (!form) {
        console.warn('No se encontró el formulario #login-form');
        return;
    }

    const emailInput = document.getElementById('log-email');
    const passwordInput = document.getElementById('log-password');
    const button = document.getElementById('log-button') || form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!emailInput || !passwordInput) {
            alert('Formulario incompleto. Faltan campos.');
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            alert('Completa email y contraseña.');
            return;
        }

        const origText = button ? button.textContent : null;
        if (button) {
            button.disabled = true;
            button.textContent = 'Verificando...';
        }

        try {
            const user = await loginUser(email, password);
            redirectToDashboard(user);
        } catch (error) {
            alert(error?.message || 'Error al iniciar sesión.');
            console.error('Fallo de inicio de sesión:', error);
        } finally {
            if (button) {
                button.disabled = false;
                if (origText !== null) button.textContent = origText;
            }
        }
    });
});