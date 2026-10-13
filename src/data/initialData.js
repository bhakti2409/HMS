// Starting (dummy) data for the whole application.
// Once the app runs, changes are saved in localStorage so they survive a page refresh.

export const initialDoctors = [
  { id: 1, name: 'Dr. Anita Desai', specialization: 'Cardiologist', experience: 12, fee: 800, phone: '9820011111', email: 'doctor@gmail.com', available: true, about: 'Senior cardiologist focusing on preventive heart care and non-invasive diagnostics.' },
  { id: 2, name: 'Dr. Rohan Mehta', specialization: 'Neurologist', experience: 9, fee: 900, phone: '9820022222', email: 'rohan.mehta@pulse.com', available: true, about: 'Treats migraines, epilepsy and nerve-related disorders.' },
  { id: 3, name: 'Dr. Sneha Kulkarni', specialization: 'Pediatrician', experience: 7, fee: 500, phone: '9820033333', email: 'sneha.k@pulse.com', available: true, about: 'Child health specialist, vaccinations and growth monitoring.' },
  { id: 4, name: 'Dr. Imran Khan', specialization: 'Orthopedic', experience: 15, fee: 1000, phone: '9820044444', email: 'imran.khan@pulse.com', available: false, about: 'Joint replacement and sports injury expert.' },
  { id: 5, name: 'Dr. Priya Nair', specialization: 'Dermatologist', experience: 6, fee: 600, phone: '9820055555', email: 'priya.nair@pulse.com', available: true, about: 'Skin, hair and cosmetic dermatology.' },
  { id: 6, name: 'Dr. Vikram Joshi', specialization: 'General Physician', experience: 10, fee: 400, phone: '9820066666', email: 'vikram.j@pulse.com', available: true, about: 'Family physician for everyday illnesses and health check-ups.' },
];

export const initialPatients = [
  { id: 1, name: 'Rahul Sharma', age: 29, gender: 'Male', bloodGroup: 'B+', phone: '9876500001', email: 'rahul@gmail.com', address: 'Andheri, Mumbai' },
  { id: 2, name: 'Neha Patil', age: 34, gender: 'Female', bloodGroup: 'O+', phone: '9876500002', email: 'neha.patil@gmail.com', address: 'Thane, Mumbai' },
  { id: 3, name: 'Amit Verma', age: 45, gender: 'Male', bloodGroup: 'A+', phone: '9876500003', email: 'amit.verma@gmail.com', address: 'Dadar, Mumbai' },
  { id: 4, name: 'Pooja Singh', age: 22, gender: 'Female', bloodGroup: 'AB+', phone: '9876500004', email: 'pooja.singh@gmail.com', address: 'Borivali, Mumbai' },
  { id: 5, name: 'Suresh Rao', age: 58, gender: 'Male', bloodGroup: 'O-', phone: '9876500005', email: 'suresh.rao@gmail.com', address: 'Navi Mumbai' },
];

// status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
export const initialAppointments = [
  { id: 1, patientId: 1, doctorId: 1, date: '2026-10-08', time: '10:30', reason: 'Chest discomfort check-up', status: 'Confirmed' },
  { id: 2, patientId: 2, doctorId: 3, date: '2026-10-09', time: '11:00', reason: 'Child vaccination', status: 'Pending' },
  { id: 3, patientId: 3, doctorId: 2, date: '2026-10-06', time: '09:30', reason: 'Recurring headaches', status: 'Pending' },
  { id: 4, patientId: 4, doctorId: 5, date: '2026-10-02', time: '16:00', reason: 'Skin allergy', status: 'Completed' },
  { id: 5, patientId: 5, doctorId: 1, date: '2026-10-10', time: '12:15', reason: 'Blood pressure review', status: 'Confirmed' },
  { id: 6, patientId: 1, doctorId: 6, date: '2026-09-28', time: '17:00', reason: 'Seasonal fever', status: 'Completed' },
  { id: 7, patientId: 3, doctorId: 4, date: '2026-10-12', time: '15:30', reason: 'Knee pain', status: 'Cancelled' },
];

export const initialMedicines = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 30, stock: 120, expiry: '2027-08-01' },
  { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', price: 85, stock: 60, expiry: '2027-03-15' },
  { id: 3, name: 'Cetirizine 10mg', category: 'Allergy', price: 40, stock: 90, expiry: '2027-11-30' },
  { id: 4, name: 'Pantoprazole 40mg', category: 'Digestive', price: 95, stock: 8, expiry: '2026-12-20' },
  { id: 5, name: 'Metformin 500mg', category: 'Diabetes', price: 55, stock: 75, expiry: '2027-06-10' },
  { id: 6, name: 'Atorvastatin 10mg', category: 'Heart', price: 120, stock: 5, expiry: '2027-01-05' },
  { id: 7, name: 'Vitamin D3 60K', category: 'Supplement', price: 150, stock: 45, expiry: '2028-02-28' },
  { id: 8, name: 'Cough Syrup 100ml', category: 'Cold & Cough', price: 110, stock: 30, expiry: '2026-11-15' },
];
