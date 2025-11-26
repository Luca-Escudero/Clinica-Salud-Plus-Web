import { getDoctors } from './services/doctorsService.js';

document.addEventListener('DOMContentLoaded', () => {
    const doctorsTableBody = document.getElementById('doctorsTableBody');

    async function renderDoctors() {
        try {
            const doctors = await getDoctors();
            doctorsTableBody.innerHTML = '';
            doctors.forEach(doctor => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${doctor.name}</td>
                    <td>${doctor.specialty}</td>
                `;
                doctorsTableBody.appendChild(tr);
            });
        } catch (error) {
            console.error("Error al renderizar doctores:", error);
        }
    }

    renderDoctors();
});