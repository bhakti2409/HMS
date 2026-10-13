import { TextInput, PasswordInput, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAllUsers, saveLoggedInUser, getLoggedInUser, getHomePath } from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();

  // React Hook Form handles the form values and validation
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  // already logged in -> go straight to the dashboard
  const loggedIn = getLoggedInUser();
  if (loggedIn) return <Navigate to={getHomePath(loggedIn.role)} replace />;

  const onSubmit = (data) => {
    // find() checks the users array for a matching email + password
    const user = getAllUsers().find((u) => u.email === data.email && u.password === data.password);

    if (!user) {
      setError('password', { message: 'Invalid email or password' });
      return;
    }

    saveLoggedInUser(user); // localStorage
    notifications.show({ title: 'Login successful', message: `Welcome, ${user.name}`, color: 'teal' });

    // role decides which dashboard opens
    navigate(getHomePath(user.role));
  };

  return (
    <div
      style={{ background: 'url("/LoginImg.jpg")' }}
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div className="text-pink-400 flex gap-1 items-center">
        <IconHeartbeat size={40} stroke={2.5} />
        <span className="font-heading font-semibold text-4xl">Pulse</span>
      </div>

      {/* Login Card */}
      <div className="w-[450px] backdrop-blur-md p-10 py-8 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-white [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_svg]:text-white [&_input]:!text-white"
        >
          <div className="self-center font-medium font-heading text-white text-xl">Login</div>

          <TextInput
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
            })}
            error={errors.email?.message}
            placeholder="Email"
            variant="unstyled"
            radius="md"
            size="md"
          />

          <PasswordInput
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
            placeholder="Password"
            variant="unstyled"
            radius="md"
            size="md"
          />

          <Button type="submit" color="pink">
            Login
          </Button>

          <div className="text-neutral-100 self-center">
            Don't have an account?{' '}
            <Link to="/register" className="underline font-medium">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
