import { apiUD, apiAP } from "./apiConfig.js";

const USERS_PATH = "/users";

/**
 * Obtiene todos los usuarios desde la API.
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  try {
    return await apiAP.get(USERS_PATH);
  } catch (error) {
    console.error("Error en getAllUsers:", error);
    throw error;
  }
}

/**
 * Registra un nuevo usuario en la API.
 * @param {object} userData - Datos del usuario (nombre, email, contraseña).
 * @returns {Promise<object>} - La respuesta de la API.
 */
export async function registerUser(userData) {
  try {
    // MockAPI típicamente crea recursos con POST a /users
    const data = await apiAP.post(USERS_PATH, userData);
    return data;
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
}

/**
 * Intenta iniciar sesión usando endpoint de autenticación si existe,
 * y hace fallback a obtener todos los usuarios y comparar (solo para desarrollo).
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>}
 */
export async function loginUser(credentials) {
  try {
    // Intento preferente: endpoint específico de login (si existe en el backend)
    try {
      const data = await apiAP.post(`${USERS_PATH}/login`, credentials);
      return data;
    } catch (err) {
      // Si el servidor no soporta ese endpoint/método, haremos fallback abajo.
      // Incluimos 400 porque MockAPI puede devolver 400 si no reconoce la ruta/payload.
      const status = err?.status;
      console.warn("Error intentando POST /users/login:", status, err?.data || err);
      if (status !== 400 && status !== 404 && status !== 405) {
        // si es otro error de red/servidor, re-lanzar para que el UI lo maneje
        throw err;
      }
      console.warn("Endpoint /users/login no disponible o no soportado, usando fallback GET /users");
    }

    // Fallback (temporal para desarrollo): obtener todos los usuarios y comparar credenciales
    const users = await getAllUsers();
    const user = Array.isArray(users)
      ? users.find(u => u.email === credentials.email && u.password === credentials.password)
      : null;

    if (!user) {
      const e = new Error("Credenciales inválidas.");
      e.status = 401;
      throw e;
    }

    return user;
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
}
