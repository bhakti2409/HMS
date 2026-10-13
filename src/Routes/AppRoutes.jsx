import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { getLoggedInUser, getHomePath } from '../utils/auth';

// Layouts
import AdminLayout from '../Layout/AdminLayout';
import DoctorLayout from '../Layout/DoctorLayout';
import PatientLayout from '../Layout/PatientLayout';

// Common pages
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import UnauthorizedPage from '../Pages/UnauthorizedPage';
import NotFoundPage from '../Pages/NotFoundPage';

// Admin pages
import AdminDashboardPage from '../Pages/Admin/AdminDashboardPage';
import ManageDoctors from '../Pages/Admin/ManageDoctors';
import ManagePatients from '../Pages/Admin/ManagePatients';
import ManageAppointments from '../Pages/Admin/ManageAppointments';
import ManagePharmacy from '../Pages/Admin/ManagePharmacy';

// Doctor pages
import DoctorDashboardPage from '../Pages/Doctor/DoctorDashboardPage';
import DoctorAppointments from '../Pages/Doctor/DoctorAppointments';
import DoctorPatients from '../Pages/Doctor/DoctorPatients';

// Patient pages
import PatientDashboardPage from '../Pages/Patient/PatientDashboardPage';
import BrowseDoctors from '../Pages/Patient/BrowseDoctors';
import DoctorDetails from '../Pages/Patient/DoctorDetails';
import MyAppointments from '../Pages/Patient/MyAppointments';
import PharmacyPage from '../Pages/Patient/PharmacyPage';
import CartPage from '../Pages/Patient/CartPage';

// "/" -> send the user to the right place based on role
const HomeRedirect = () => {
  const user = getLoggedInUser();
  return <Navigate to={user ? getHomePath(user.role) : '/login'} replace />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Common routes */}
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Admin routes: AdminLayout shows the admin sidebar, ProtectedRoute allows only role ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="patients" element={<ManagePatients />} />
          <Route path="appointments" element={<ManageAppointments />} />
          <Route path="pharmacy" element={<ManagePharmacy />} />
        </Route>

        {/* Doctor routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboardPage />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<DoctorPatients />} />
        </Route>

        {/* Patient routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="PATIENT">
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboardPage />} />
          <Route path="doctors" element={<BrowseDoctors />} />
          <Route path="doctors/:id" element={<DoctorDetails />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="pharmacy" element={<PharmacyPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* Anything else */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
