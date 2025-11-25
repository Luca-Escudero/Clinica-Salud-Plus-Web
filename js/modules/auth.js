import { createUser, getAllUsers } from "../services/userServices.js"; 

const USUARIO_ROLE = "user";
const ADMIN_ROLE = "admin";
const SESSION_KEY = "userSession";

const ADMIN_DASHBOARD_PATH = "/pages/admin/home-admin.html";
const USER_DASHBOARD_PATH = "/pages/user/home-user.html";
const LOGIN_PATH = "/pages/register-login/login.html";

// Función para guardar el usuario en el navegador
function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

// Función para obtener la sesión actual
export function getSession() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

// Función para cerrar sesión
export function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = LOGIN_PATH;
}

/**
 * Registra un nuevo usuario con rol "user".
 * @param {string} nombre 
 * @param {string} email 
 * @param {string} password 
 * @returns {object} El objeto de usuario creado.
 */
export async function registerUser(nombre, email, password) {
    if (!nombre || !email || !password) {
        throw new Error("Nombre, email y contraseña son requeridos.");
    }

    try {
        // Crea el nuevo usuario en MockAPI con rol de paciente
        const newUser = await createUser({
            nombre,
            email,
            password,
            role: USUARIO_ROLE 
        });
        
        // Guarda la sesión y devuelve el usuario
        saveSession(newUser);
        return newUser;
        
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw new Error("No se pudo registrar el usuario. Intenta de nuevo.");
    }
}

/**
 * Intenta iniciar sesión con el email y la contraseña.
 * @param {string} email 
 * @param {string} password 
 * @returns {object} El objeto de usuario autenticado.
 */
export async function loginUser(email, password) {
    if (!email || !password) {
        throw new Error("Email y contraseña son requeridos.");
    }

    // Intento preferente: endpoint de autenticación (POST)
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            const user = await res.json();
            saveSession(user);
            return user;
        }

        // Si el servidor responde 405, haremos fallback abajo
        if (res.status !== 405) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || `Login falló (${res.status})`);
        }

        console.warn('/api/login devolvió 405, intentando fallback a getAllUsers()');
    } catch (err) {
        // Si hubo error de red distinto a 405 dejamos que el fallback lo maneje o re-lanzamos si necesario
        console.warn('Error al usar /api/login, intentaremos fallback:', err);
    }

    // Fallback: obtener todos los usuarios y comparar (temporario, solo para desarrollo)
    let users;
    try {
        users = await getAllUsers();
    } catch (err) {
        console.error("Error obteniendo usuarios en fallback:", err);
        throw new Error("Error al obtener usuarios. Intenta nuevamente.");
    }

    const userList = Array.isArray(users) ? users : [];
    const user = userList.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error("Credenciales inválidas.");
    }

    saveSession(user);
    return user;
}

/**
 * Redirige al usuario al dashboard correcto según su rol.
 * @param {object} user 
 */
export function redirectToDashboard(user) {
    if (user?.role === ADMIN_ROLE) {
        window.location.href = ADMIN_DASHBOARD_PATH;
    } else if (user?.role === USUARIO_ROLE) {
        window.location.href = USER_DASHBOARD_PATH;
    } else {
        window.location.href = LOGIN_PATH; 
    }
}