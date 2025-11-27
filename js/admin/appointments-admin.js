import { getAllAppointments, updateAppointment } from "../services/appointmentsService.js";
import { getAllUsers } from "../services/usersService.js";
import { getAllDoctors } from "../services/doctorsService.js";

document.addEventListener('DOMContentLoaded', () => {
    const citasTableBody = document.getElementById('citasTableBody');

    Promise.all([getAllAppointments(), getAllUsers(), getAllDoctors()]).then(([appointments, users, doctors]) => {

        appointments.forEach(appointment => {

            const patient = users.find(user => parseInt(user.id) === appointment.patientId);
            const doctor = doctors.find(doc => parseInt(doc.id) === appointment.doctorId);

            // determinar clase de badge según estado (incluye 'cancelado' en rojo)
            const estadoClass = appointment.estado === 'pendiente'
                ? 'bg-warning'
                : appointment.estado === 'confirmado'
                    ? 'bg-success'
                    : appointment.estado === 'cancelado'
                        ? 'bg-danger'
                        : 'bg-secondary';

            const tr = document.createElement('tr');
            tr.setAttribute('data-id', appointment.id);

            tr.innerHTML = `
                <td>${patient ? patient.nombre : 'N/A'}</td>
                <td>${doctor ? doctor.nombre : 'N/A'}</td>
                <td>${appointment.fecha} ${appointment.hora}</td>
                <td><span class="badge ${estadoClass}">${appointment.estado}</span></td>
                <td>
                    ${appointment.estado === 'pendiente' ? `<button class="btn btn-success btn-sm confirm-appointment" data-id="${appointment.id}">Confirmar</button>` : ''}
                </td>
            `;
            citasTableBody.appendChild(tr);
        });

        citasTableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('confirm-appointment')) {
                const appointmentId = event.target.getAttribute('data-id');
                const appointmentRow = document.querySelector(`tr[data-id="${appointmentId}"]`);
                const appointment = appointments.find(a => a.id === appointmentId);

                if (appointment) {
                    const updatedAppointment = { ...appointment, estado: 'confirmado' };

                    updateAppointment(appointmentId, updatedAppointment).then(() => {
                        const statusBadge = appointmentRow.querySelector('.badge');
                        statusBadge.classList.remove('bg-warning');
                        statusBadge.classList.add('bg-success');
                        statusBadge.textContent = 'confirmado';
                        event.target.remove();
                    }).catch(error => {
                        console.error('Error al confirmar la cita:', error);
                        alert('Hubo un error al confirmar la cita.');
                    });
                }
            }
        });

    }).catch(error => {
        console.error('Error al cargar los datos:', error);
        citasTableBody.innerHTML = '<tr><td colspan="5" class="text-center">Error al cargar las citas.</td></tr>';
    });
});
