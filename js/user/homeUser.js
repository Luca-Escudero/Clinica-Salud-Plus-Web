import { getSession } from '../modules/auth.js';
import { getAllAppointments } from '../services/appointmentsService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const user = getSession();

    if (user && user.nombre) {
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `¡Bienvenido, ${user.nombre}!`;
        }
    }

    try {
        const appointments = await getAllAppointments();
        const userAppointments = appointments.filter(appointment => appointment.patientId === Number(user.id));

        const pendingAppointments = userAppointments.filter(appointment => appointment.estado === 'pendiente').length;
        const confirmedAppointments = userAppointments.filter(appointment => appointment.estado === 'confirmado').length;
        const cancelledAppointments = userAppointments.filter(appointment => appointment.estado === 'cancelado').length;

        document.getElementById('metric-pending-appointments').textContent = pendingAppointments;
        document.getElementById('metric-confirmed-appointments').textContent = confirmedAppointments;
        document.getElementById('metric-cancelled-appointments').textContent = cancelledAppointments;

    } catch (error) {
        console.error("Error al cargar las citas del usuario:", error);
    }
});
