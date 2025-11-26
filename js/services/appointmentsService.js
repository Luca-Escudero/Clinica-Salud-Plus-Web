export function getAppointments() {
    return JSON.parse(localStorage.getItem('appointments')) || [];
}

export function addAppointment(appointment) {
    const appointments = getAppointments();
    appointments.push({ id: Date.now().toString(), ...appointment });
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

export function getAppointmentsByUser(userId) {
    const appointments = getAppointments();
    return appointments.filter(a => a.userId === userId);
}
