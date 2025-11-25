import { getAllUsers  } from "./services/usersService.js";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const errorBox = document.getElementById("error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    if (!email || !password) {
        showError("Completa todos los campos.");
        return;
    }

    try {
        const users = await getAllUsers ();

        // Buscar usuario en MockAPI
        const userFound = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!userFound) {
            showError("Email o contraseña incorrectos.");
            return;
        }

        // Guardar sesión
        localStorage.setItem("user", JSON.stringify(userFound));

        // Redirigir
        if (userFound.role === "admin") {
            window.location.href = "./home-admin.html";
        } else {
            window.location.href = "./home-user.html";
        }

    } catch (error) {
        console.error(error);
        showError("Hubo un error al iniciar sesión. Intentá de nuevo.");
    }
});

function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
}
