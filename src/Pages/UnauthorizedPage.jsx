import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { getLoggedInUser, getHomePath } from '../utils/auth';

// shown by ProtectedRoute when the role does not match
const UnauthorizedPage = () => {
  const user = getLoggedInUser();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 text-center">
      <h1 className="font-heading text-6xl font-bold text-red-400">403</h1>
      <h2 className="font-heading text-2xl">Access denied</h2>
      <p className="text-neutral-500">You do not have permission to open this page.</p>
      <Link to={user ? getHomePath(user.role) : '/login'}>
        <Button>{user ? 'Go to my dashboard' : 'Go to login'}</Button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
