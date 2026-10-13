// Demo login accounts. Each user has a role: "ADMIN", "DOCTOR" or "PATIENT".
// profileId links a login to a record in doctors / patients (see data/initialData.js).
const users = [
  { id: 1, name: 'Admin', email: 'admin@gmail.com', password: 'Admin@123', role: 'ADMIN' },
  { id: 2, name: 'Dr. Anita Desai', email: 'doctor@gmail.com', password: 'Doctor@123', role: 'DOCTOR', profileId: 1 },
  { id: 3, name: 'Rahul Sharma', email: 'rahul@gmail.com', password: 'Rahul@123', role: 'PATIENT', profileId: 1 },
  { id: 4, name: 'Varsha Sharma', email: 'varsha@gmail.com', password: 'Varsha@123', role: 'PATIENT', profileId: 1 },
  
];

export default users;
