import { apiUD } from "./apiConfig";

const USERS_PATH = "/users";

export async function getAllUsers() {
  return apiUD.get(USERS_PATH);
}

export async function getUserById(id) {
  return apiUD.get(`${USERS_PATH}/${id}`);
}

export async function createUser({nombre, email, password, role}) {
  return apiUD.post(USERS_PATH, {nombre, email, password, role});
}

export async function updateUser(id, {nombre, email, password, role}) {
  return apiUD.put(`${USERS_PATH}/${id}`, {nombre, email, password, role});
}

export async function deleteUser(id) {
  return apiUD.delete(`${USERS_PATH}/${id}`);
}