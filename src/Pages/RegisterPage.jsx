import { TextInput, PasswordInput, Button, SegmentedControl } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers, registerUser } from '../utils/auth';
import { useHospital } from '../context/HospitalContext';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useHospital();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { type: 'PATIENT', name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data) => {
    // email must be unique
    const emailTaken = getAllUsers().some((u) => u.email === data.email);
    if (emailTaken) {
      setError('email', { message: 'This email is already registered' });
      return;
    }

    // create a profile record for patients and doctors so they appear in the admin lists
    let profileId;
    if (data.type === 'PATIENT') {
      profileId = state.patients.length ? Math.max(...state.patients.map((p) => p.id)) + 1 : 1;
      dispatch({
        type: 'ADD_PATIENT',
        payload: { name: data.name, email: data.email, age: '-', gender: '-', bloodGroup: '-', phone: '-', address: '-' },
      });
    }
    if (data.type === 'DOCTOR') {
      profileId = state.doctors.length ? Math.max(...state.doctors.map((d) => d.id)) + 1 : 1;
      dispatch({
        type: 'ADD_DOCTOR',
        payload: {
          name: data.name.startsWith('Dr.') ? data.name : `Dr. ${data.name}`,
          email: data.email,
          specialization: 'General Physician',
          experience: 0,
          fee: 500,
          phone: '-',
          available: true,
          about: 'New doctor at Pulse.',
        },
      });
    }

    registerUser({
      id: Date.now(),
      name: data.type === 'DOCTOR' && !data.name.startsWith('Dr.') ? `Dr. ${data.name}` : data.name,
      email: data.email,
      password: data.password,
      role: data.type,
      profileId,
    });

    notifications.show({ title: 'Registered', message: 'Account created. Please login.', color: 'teal' });
    navigate('/login');
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

      {/* Register Card */}
      <div className="w-[450px] backdrop-blur-md p-10 py-8 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-white [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_svg]:text-white [&_input]:!text-white"
        >
          <div className="self-center font-medium font-heading text-white text-xl">Register</div>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <SegmentedControl
                value={field.value}
                onChange={field.onChange}
                fullWidth
                size="md"
                radius="md"
                color="pink"
                data={[
                  { label: 'Patient', value: 'PATIENT' },
                  { label: 'Doctor', value: 'DOCTOR' },
                  { label: 'Admin', value: 'ADMIN' },
                ]}
              />
            )}
          />

          <TextInput
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
            placeholder="Name"
            variant="unstyled"
            radius="md"
            size="md"
          />

          <TextInput
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
            error={errors.email?.message}
            placeholder="Email"
            variant="unstyled"
            radius="md"
            size="md"
          />

          <PasswordInput
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: passwordPattern,
                message: 'Password must be 8-15 characters long and include uppercase, lowercase, number, and special character',
              },
            })}
            error={errors.password?.message}
            placeholder="Password"
            variant="unstyled"
            radius="md"
            size="md"
          />

          <PasswordInput
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || "Passwords don't match",
            })}
            error={errors.confirmPassword?.message}
            placeholder="Confirm Password"
            variant="unstyled"
            radius="md"
            size="md"
          />

          <Button type="submit" color="pink">
            Register
          </Button>

          <div className="text-neutral-100 self-center">
            Have an account?{' '}
            <Link to="/login" className="underline font-medium">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
