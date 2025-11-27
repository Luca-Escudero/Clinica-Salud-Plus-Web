import { getAllUsers, deleteUser } from '../services/usersService.js';

document.addEventListener('DOMContentLoaded', () => {
    const usersTableBody = document.getElementById('usersTableBody');

    async function renderUsers() {
        try {
            const users = await getAllUsers();
            usersTableBody.innerHTML = '';
            users
                .filter(user => user.role !== 'admin')
                .forEach(user => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${user.nombre}</td>
                        <td>${user.email}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Eliminar</button>
                        </td>
                    `;
                    usersTableBody.appendChild(tr);
                });
        } catch (error) {
            console.error("Error al renderizar usuarios:", error);
        }
    }

    usersTableBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-user')) {
            const userId = e.target.getAttribute('data-id');
            try {
                await deleteUser(userId);
                await renderUsers();
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
            }
        }
    });

    renderUsers();
});
