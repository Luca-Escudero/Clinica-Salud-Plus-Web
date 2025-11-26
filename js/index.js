document.getElementById("btn-user").addEventListener("click", () => {
  localStorage.setItem("selectedRole", "user");
  window.location.href = "/pages/register-login/login.html";
});

document.getElementById("btn-admin").addEventListener("click", () => {
  localStorage.setItem("selectedRole", "admin");
  window.location.href = "/pages/register-login/login.html";
});
