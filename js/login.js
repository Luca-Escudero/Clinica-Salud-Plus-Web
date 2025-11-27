import { getAllUsers } from "./services/usersService.js";

const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const selectedRole = localStorage.getItem("selectedRole");  // "user" o "admin"

  if (!email || !password) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  try {
    // Traemos todos los usuarios desde MockAPI
    const users = await getAllUsers();

    // Buscamos coincidencia
    const userFound = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!userFound) {
      alert("Credenciales incorrectas.");
      return;
    }

    if (userFound.role !== selectedRole) {
      alert("Este usuario no pertenece al rol seleccionado en el inicio.");
      return;   
    }

    // Guardamos sesión en localStorage
    localStorage.setItem("userLogged", JSON.stringify(userFound));

    // Redirección según rol 
    if (userFound.role === "admin") {
      window.location.replace("/pages/admin/home-admin.html");
    } else if (userFound.role === "user") {
      window.location.replace("/pages/user/home-user.html");
    } else {
      // Rol desconocido: volver al login o mostrar mensaje
      alert("Rol de usuario no reconocido.");
      localStorage.removeItem("userLogged");
      window.location.replace("./login.html");
    }

  } catch (error) {
    console.error(error);
    alert("Hubo un error al iniciar sesión. Intentá nuevamente.");
  }
});
