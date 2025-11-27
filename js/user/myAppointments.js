import { getSession } from "../modules/auth.js";
import { getAllAppointments, updateAppointment } from "../services/appointmentsService.js";
import { getAllDoctors } from "../services/doctorsService.js";
// import { showAlert } from "../modules/utils.js"; 

document.addEventListener('DOMContentLoaded', () => {
    const appointmentsTableBody = document.getElementById('myAppointmentsTableBody');
    const user = getSession();

    // 1. Validar la sesión del usuario
    if (!user || !user.id) {
        appointmentsTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Debe iniciar sesión para ver sus citas.</td></tr>';
        return;
    }

    // Aseguramos que el patientId esté en formato numérico para la comparación
    const currentPatientId = Number(user.id);

    // 2. Cargar todos los datos necesarios concurrentemente
    Promise.all([getAllAppointments(), getAllDoctors()])
        .then(([allAppointments, doctors]) => {

            // Creamos un mapa de doctores para buscar nombres rápidamente
            const doctorMap = new Map(doctors.map(doc => [Number(doc.id), doc]));

            // 3. Filtrar las citas solo para el usuario actual
            const userAppointments = allAppointments.filter(appointment =>
                Number(appointment.patientId) === currentPatientId
            );

            if (userAppointments.length === 0) {
                appointmentsTableBody.innerHTML = '<tr><td colspan="6" class="text-center">No tiene citas programadas.</td></tr>';
                return;
            }

            // 4. Generar las filas de la tabla
            appointmentsTableBody.innerHTML = '';
            userAppointments.forEach(appointment => {
                const doctor = doctorMap.get(Number(appointment.doctorId));

                // Determinar la clase CSS para el estado
                let statusClass = 'bg-secondary';
                if (appointment.estado === 'pendiente') {
                    statusClass = 'bg-warning';
                } else if (appointment.estado === 'confirmado') {
                    statusClass = 'bg-success';
                } else if (appointment.estado === 'cancelado') {
                    statusClass = 'bg-danger';
                }

                const tr = document.createElement('tr');
                tr.setAttribute('data-id', appointment.id);

                const doctorNombre = doctor ? doctor.nombre : 'N/A';
                const doctorEspecialidad = doctor ? doctor.especialidad : 'N/A';

                tr.innerHTML = `
    <td>${doctorNombre}</td> 
    <td>${doctorEspecialidad}</td> 
    <td>${appointment.fecha}</td> 
    <td>${appointment.hora}</td> 
    <td><span class="badge ${statusClass}">${appointment.estado}</span></td>
    <td>
        ${appointment.estado === 'pendiente' ?
                        `<button class="btn btn-sm btn-danger cancel-appointment" data-appointment-id="${appointment.id}">Cancelar</button>`
                        : '—'}
    </td>
`;


                appointmentsTableBody.appendChild(tr);
            });

            // 5. Lógica para el botón 'Cancelar'
            appointmentsTableBody.addEventListener('click', async (event) => {
                if (event.target.classList.contains('cancel-appointment')) {
                    const appointmentId = event.target.getAttribute('data-appointment-id');
                    const appointmentRow = event.target.closest('tr');

                    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
                        const appointmentToCancel = userAppointments.find(a => a.id === appointmentId);

                        if (appointmentToCancel) {
                            try {
                                const updatedAppointment = { ...appointmentToCancel, estado: 'cancelado' };
                                await updateAppointment(appointmentId, updatedAppointment);

                                // Actualizar la UI
                                const statusBadge = appointmentRow.querySelector('.badge');
                                statusBadge.classList.remove('bg-warning', 'bg-success', 'bg-secondary');
                                statusBadge.classList.add('bg-danger');
                                statusBadge.textContent = 'cancelado';
                                event.target.remove();

                                alert('Cita cancelada exitosamente.');
                            } catch (error) {
                                console.error('Error al cancelar la cita:', error);
                                alert('Hubo un error al cancelar la cita. Intenta de nuevo.');
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar las citas:', error);
            appointmentsTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Error al cargar la información.</td></tr>';
        });
});