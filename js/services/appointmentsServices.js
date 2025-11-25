import api from "./apiConfig.js";

const APPOINTMENTS_PATH = "/appointments"; //ver esto

export async function getAllAppointments() {
  return api.get(APPOINTMENTS_PATH);
}

export async function getAppointmentById(id) {
  return api.get(`${APPOINTMENTS_PATH}/${id}`);
}

export async function createAppointment({ patientId, doctorId, fecha, hora, estado }) {
  return api.post(APPOINTMENTS_PATH, { patientId, doctorId, fecha, hora, estado });
}

export async function updateAppointment(id, { patientId, doctorId, fecha, hora, estado }) {
  return api.put(`${APPOINTMENTS_PATH}/${id}`, { patientId, doctorId, fecha, hora, estado });
}

export async function deleteAppointment(id) {
  return api.delete(`${APPOINTMENTS_PATH}/${id}`);
}
