import { Navigate } from 'react-router-dom';
import { getLoggedInUser } from '../utils/auth';

// Protects a page.
//   Check 1: is someone logged in?     -> if not, go to /login
//   Check 2: does the role match?      -> if not, go to /unauthorized
function ProtectedRoute({ children, role }) {
  const user = getLoggedInUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
