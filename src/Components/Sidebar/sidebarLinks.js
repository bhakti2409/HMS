import {
  IconLayoutGrid,
  IconStethoscope,
  IconMoodHeart,
  IconCalendarCheck,
  IconVaccine,
  IconShoppingCart,
  IconCalendarPlus,
} from '@tabler/icons-react';

// Sidebar links for every role. Each role sees only its own list.
export const adminLinks = [
  { name: 'Dashboard', url: '/admin/dashboard', icon: IconLayoutGrid },
  { name: 'Doctors', url: '/admin/doctors', icon: IconStethoscope },
  { name: 'Patients', url: '/admin/patients', icon: IconMoodHeart },
  { name: 'Appointments', url: '/admin/appointments', icon: IconCalendarCheck },
  { name: 'Pharmacy', url: '/admin/pharmacy', icon: IconVaccine },
];

export const doctorLinks = [
  { name: 'Dashboard', url: '/doctor/dashboard', icon: IconLayoutGrid },
  { name: 'My Appointments', url: '/doctor/appointments', icon: IconCalendarCheck },
  { name: 'My Patients', url: '/doctor/patients', icon: IconMoodHeart },
];

export const patientLinks = [
  { name: 'Dashboard', url: '/patient/dashboard', icon: IconLayoutGrid },
  { name: 'Find Doctors', url: '/patient/doctors', icon: IconStethoscope },
  { name: 'My Appointments', url: '/patient/appointments', icon: IconCalendarPlus },
  { name: 'Pharmacy', url: '/patient/pharmacy', icon: IconVaccine },
  { name: 'Cart', url: '/patient/cart', icon: IconShoppingCart },
];
