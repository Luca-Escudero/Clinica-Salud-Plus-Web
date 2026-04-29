🏥 Clínica Salud+ - Sistema de Gestión de Turnos
📝 Descripción
Clínica Salud+ es una plataforma web integral diseñada para optimizar la reserva y administración de turnos médicos. El sistema permite una interacción fluida entre pacientes y personal administrativo a través de una interfaz moderna y funcional.

🚀 Funcionalidades Clave
Gestión de Usuarios y Autenticación: Sistema de registro y login con validación de credenciales dinámicas.

Reserva de Turnos: Interfaz interactiva para la selección de especialidades, profesionales y franjas horarias.

Panel Administrativo: Control total sobre la agenda médica, permitiendo gestionar médicos, usuarios y citas.

Diseño Responsive: Experiencia optimizada para dispositivos móviles, tablets y escritorio mediante el uso de Bootstrap 5.

🛠️ Tecnologías Utilizadas
Frontend: HTML5, CSS3 y JavaScript (ES6+).

Framework CSS: Bootstrap 5 para el sistema de grillas y componentes.

Persistencia y Backend: MockAPI. Se utilizaron dos servicios REST independientes para simular un entorno de producción:

url_UD: Gestión de Usuarios y Doctores.

url_AP: Gestión de Citas (Appointments).

Lógica de Negocio: Arquitectura modular basada en servicios asíncronos (fetch) para el manejo de peticiones HTTP.

📊 Entidades del Sistema
El proyecto administra tres entidades principales mediante operaciones CRUD:

Usuarios: Manejo de perfiles, roles y seguridad básica.

Médicos: Administración de staff, especialidades y disponibilidad.

Turnos: Coordinación de citas médicas con estados de seguimiento.

👥 Integrantes
Luca Escudero

Tomas Grasso

TPI Final de Desarrollo Web - Noviembre 2025
