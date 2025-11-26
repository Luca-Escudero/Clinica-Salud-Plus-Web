export function getDoctors() {
    return JSON.parse(localStorage.getItem('doctors')) || [];
}

export function getDoctorById(doctorId) {
    const doctors = getDoctors();
    return doctors.find(d => d.id === doctorId);
}
