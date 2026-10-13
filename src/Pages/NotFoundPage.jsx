import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="h-screen flex flex-col items-center justify-center gap-3 text-center">
    <h1 className="font-heading text-6xl font-bold text-primary-600">404</h1>
    <h2 className="font-heading text-2xl">Page not found</h2>
    <p className="text-neutral-500">The page you are looking for does not exist.</p>
    <Link to="/">
      <Button>Back to home</Button>
    </Link>
  </div>
);

export default NotFoundPage;
