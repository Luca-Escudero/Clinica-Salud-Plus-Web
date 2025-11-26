import { apiAP } from "./apiConfig.js";

const DOCTORS_PATH = "/doctors";

/**
 * Obtiene todos los doctores desde la API.
 * @returns {Promise<Array>}
 */
export async function getDoctors() {
  try {
    return await apiAP.get(DOCTORS_PATH);
  } catch (error) {
    console.error("Error en getDoctors:", error);
    throw error;
  }
}

/**
 * Agrega un nuevo doctor a la API.
 * @param {object} doctorData - Datos del doctor (nombre, especialidad).
 * @returns {Promise<object>} - La respuesta de la API.
 */
export async function addDoctor(doctorData) {
  try {
    const data = await apiAP.post(DOCTORS_PATH, doctorData);
    return data;
  } catch (error) {
    console.error("Error en addDoctor:", error);
    throw error;
  }
}

/**
 * Elimina un doctor de la API.
 * @param {string} doctorId - ID del doctor a eliminar.
 * @returns {Promise<object>} - La respuesta de la API.
 */
export async function deleteDoctor(doctorId) {
  try {
    const data = await apiAP.delete(`${DOCTORS_PATH}/${doctorId}`);
    return data;
  } catch (error) {
    console.error("Error en deleteDoctor:", error);
    throw error;
  }
}
