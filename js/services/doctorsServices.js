import { apiUD } from "./apiConfig.js";

const DOCTORS_PATH = "/doctors"; 

export async function getAllDoctors() {
  return apiUD.get(DOCTORS_PATH);
}

export async function getDoctorById(id) {
  return apiUD.get(`${DOCTORS_PATH}/${id}`);
}

export async function createDoctor({ nombre, especialidad, diasDisponibles }) {
  return apiUD.post(DOCTORS_PATH, { nombre, especialidad, diasDisponibles });
}

export async function updateDoctor(id, { nombre, especialidad, diasDisponibles }) {
  return apiUD.put(`${DOCTORS_PATH}/${id}`, { nombre, especialidad, diasDisponibles });
}

export async function deleteDoctor(id) {
  return apiUD.delete(`${DOCTORS_PATH}/${id}`);
}
