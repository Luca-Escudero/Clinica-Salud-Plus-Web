import { register } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const user = register(username, email, password);
            if (user) {
                window.location.href = '/pages/register-login/login.html';
            } else {
                alert('Error al registrar el usuario');
            }
        });
    }
});
