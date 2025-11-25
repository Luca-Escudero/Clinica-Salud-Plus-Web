// Manejo del formulario de registro
console.log('[register.js] módulo cargado');
import { registerUser } from "../services/usersService.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (!form) {
        console.warn('No se encontró el formulario #registerForm');
        return;
    }

    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const submitBtn = document.getElementById('register-button') || form.querySelector('button[type="submit"]');

    const setInvalid = (input, msg) => {
        if (!input) return;
        input.classList.add('is-invalid');
        let fb = input.parentNode.querySelector('.invalid-feedback');
        if (!fb) {
            fb = document.createElement('div');
            fb.className = 'invalid-feedback';
            input.parentNode.appendChild(fb);
        }
        fb.textContent = msg;
    };

    const clearInvalid = (input) => {
        if (!input) return;
        input.classList.remove('is-invalid');
        const fb = input.parentNode.querySelector('.invalid-feedback');
        if (fb) fb.remove();
    };

    const showAlert = (msg, type = 'danger') => {
        const existing = form.querySelector('.js-form-alert');
        if (existing) existing.remove();
        const div = document.createElement('div');
        div.className = `alert alert-${type} js-form-alert`;
        div.role = 'alert';
        div.textContent = msg;
        form.prepend(div);
        setTimeout(() => div.remove(), 6000);
    };

    const validate = () => {
        let ok = true;
        clearInvalid(fullname);
        clearInvalid(email);
        clearInvalid(password);

        if (!fullname?.value.trim()) {
            setInvalid(fullname, 'Ingresa tu nombre completo.');
            ok = false;
        }

        const emailVal = email?.value.trim() || '';
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            setInvalid(email, 'Ingresa un email.');
            ok = false;
        } else if (!emailRe.test(emailVal)) {
            setInvalid(email, 'Email inválido.');
            ok = false;
        }

        const pwd = password?.value || '';
        if (!pwd) {
            setInvalid(password, 'Ingresa una contraseña.');
            ok = false;
        } else if (pwd.length < 8) {
            setInvalid(password, 'La contraseña debe tener al menos 8 caracteres.');
            ok = false;
        }

        return ok;
    };

    const setLoading = (loading) => {
        if (!submitBtn) return;
        submitBtn.disabled = loading;
        if (loading) {
            submitBtn.dataset.origText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registrando...';
        } else {
            submitBtn.innerHTML = submitBtn.dataset.origText || submitBtn.innerHTML;
            submitBtn.disabled = false;
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prevAlert = form.querySelector('.js-form-alert');
        if (prevAlert) prevAlert.remove();

        if (!validate()) return;

        setLoading(true);
        try {
            const userData = {
              fullname: fullname.value.trim(),
              email: email.value.trim(),
              password: password.value,
            };

            // Usa la función del módulo usersService.js
            await registerUser(userData);

            showAlert('Registro exitoso. Redirigiendo al login...', 'success');
            // Mantengo redirección al login.html como antes
            setTimeout(() => window.location.href = 'login.html', 1200);
        } catch (err) {
            console.error('Error en registro:', err);
            showAlert(err?.message || 'Error al registrarse. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    });

    [fullname, email, password].forEach(inp => {
        if (!inp) return;
        inp.addEventListener('input', () => clearInvalid(inp));
    });
});