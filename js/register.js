import { createUser } from "/js/services/usersService.js";

const formRegister = document.getElementById("form-register");

formRegister.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const role = localStorage.getItem("selectedRole");

  if (!nombre || !email || !password) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  const newUser = { nombre, email, password, role };

  try {
  await createUser(newUser);

  alert("Cuenta creada correctamente. Ahora iniciá sesión.");
  window.location.href = "/pages/register-login/login.html";

  } catch (error) {
    console.error("ERROR EN createUser:", error);
    alert("Hubo un error al registrar el usuario. Intentá nuevamente.");
  }
});
