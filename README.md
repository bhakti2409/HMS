# Pulse - Hospital Management System (Frontend)

React (JavaScript) + **Vite** frontend with three roles: **Admin**, **Doctor** and **Patient**.
No backend yet - data is dummy data kept in React Context and saved in `localStorage`.

## Run

```
npm install
npm run dev      # (npm start also works)
```

The app opens at http://localhost:3000. Build for production with `npm run build` (output in `dist/`).

## Demo logins

| Role    | Email             | Password   |
|---------|-------------------|------------|
| Admin   | admin@gmail.com   | Admin@123  |
| Doctor  | doctor@gmail.com  | Doctor@123 |
| Patient | rahul@gmail.com   | Rahul@123  |

New users can register from the Register page (stored in localStorage).
To reset all data: open DevTools -> Application -> Local Storage -> Clear.

## Concepts used

Components, Props, useState, useEffect, useNavigate, useParams, Context API + useReducer,
React Router (nested routes, `Outlet`, layouts), `ProtectedRoute` (role based),
localStorage, React Hook Form (validation), conditional rendering, `map()`, `filter()`, `find()`, `reduce()`.

## Folder structure

```
index.html                     Vite entry page (loads src/main.jsx)
vite.config.js                 Vite settings (React plugin, port 3000)
src/
  main.jsx                     React entry point
  App.jsx                      Theme + providers + routes
  context/HospitalContext.jsx   Context + useReducer (doctors, patients, appointments, medicines, cart, orders)
  data/                        users.js (login accounts) + initialData.js (dummy data)
  utils/                       auth.js (localStorage login helpers), helpers.js
  Routes/                      AppRoutes.jsx, ProtectedRoute.jsx
  Layout/                      AdminLayout, DoctorLayout, PatientLayout, DashboardLayout
  Components/                  Header, Sidebar, Common (PageHeader, StatCard, StatusBadge, AppointmentTable...)
  Pages/                       LoginPage, RegisterPage, Unauthorized, NotFound
    Admin/                     Dashboard, ManageDoctors, ManagePatients, ManageAppointments, ManagePharmacy
    Doctor/                    Dashboard, DoctorAppointments, DoctorPatients
    Patient/                   Dashboard, BrowseDoctors, DoctorDetails, MyAppointments, PharmacyPage, CartPage
```

## Flow

```
Login -> find user in users array -> save in localStorage -> check role
  ADMIN   -> /admin/dashboard   (AdminLayout)
  DOCTOR  -> /doctor/dashboard  (DoctorLayout)
  PATIENT -> /patient/dashboard (PatientLayout)
```
