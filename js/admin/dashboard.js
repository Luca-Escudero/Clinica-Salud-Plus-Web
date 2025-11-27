import { getAllUsers } from '../services/usersService.js';
import { getAllDoctors } from '../services/doctorsService.js';
import { getAllAppointments } from '../services/appointmentsService.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [users, doctors, appointments] = await Promise.all([
            getAllUsers(),
            getAllDoctors(),
            getAllAppointments()
        ]);

        // Calcular métricas
        const totalPatients = users.filter(user => user.role !== 'admin').length;
        const totalDoctors = doctors.length;
        const pendingAppointments = appointments.filter(apt => apt.estado === 'pendiente').length;
        const confirmedAppointments = appointments.filter(apt => apt.estado === 'confirmado').length;
        const cancelledAppointments = appointments.filter(apt => apt.estado === 'cancelado').length;

        // Actualizar tarjetas de métricas
        document.getElementById('metric-total-patients').textContent = totalPatients;
        document.getElementById('metric-total-doctors').textContent = totalDoctors;
        document.getElementById('metric-pending-appointments').textContent = pendingAppointments;
        document.getElementById('metric-confirmed-appointments').textContent = confirmedAppointments;

        // Actualizar contadores de estado de turnos
        document.getElementById('confirmed-count').textContent = confirmedAppointments;
        document.getElementById('pending-count').textContent = pendingAppointments;
        document.getElementById('cancelled-count').textContent = cancelledAppointments;

        // Configurar y renderizar el gráfico de torta
        const pieChartOptions = {
            series: [confirmedAppointments, pendingAppointments, cancelledAppointments],
            chart: {
                type: 'pie',
                height: 250
            },
            labels: ['Confirmados', 'Pendientes', 'Cancelados'],
            colors: ['#28a745', '#ffc107', '#dc3545'],
            legend: {
                position: 'bottom'
            }
        };

        const pieChart = new ApexCharts(document.querySelector("#status-pie-chart"), pieChartOptions);
        pieChart.render();

    } catch (error) {
        console.error("Error al cargar el dashboard:", error);
    }
});
