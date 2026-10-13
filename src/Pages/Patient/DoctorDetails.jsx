import { Card, Text, Badge, Button, Group, Avatar, TextInput, Textarea, Select, SimpleGrid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useHospital } from '../../context/HospitalContext';
import { getLoggedInUser } from '../../utils/auth';
import PageHeader from '../../Components/Common/PageHeader';
import { formatCurrency, todayString } from '../../utils/helpers';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

const DoctorDetails = () => {
  const { id } = useParams(); // id from the URL: /patient/doctors/:id
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const { state, dispatch } = useHospital();

  const doctor = state.doctors.find((d) => d.id === Number(id));

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { date: '', time: '10:00', reason: '' },
  });

  if (!doctor) {
    return (
      <div>
        <Text mb="md">Doctor not found.</Text>
        <Button onClick={() => navigate('/patient/doctors')}>Back to doctors</Button>
      </div>
    );
  }

  const onSubmit = (data) => {
    // same doctor, same date and time already booked?
    const clash = state.appointments.some(
      (a) => a.doctorId === doctor.id && a.date === data.date && a.time === data.time && a.status !== 'Cancelled'
    );
    if (clash) {
      notifications.show({ title: 'Slot not available', message: 'Please choose another time.', color: 'red' });
      return;
    }

    dispatch({
      type: 'ADD_APPOINTMENT',
      payload: { patientId: user.profileId, doctorId: doctor.id, date: data.date, time: data.time, reason: data.reason },
    });
    notifications.show({ title: 'Appointment booked', message: `Request sent to ${doctor.name}`, color: 'teal' });
    navigate('/patient/appointments');
  };

  return (
    <div>
      <Button variant="subtle" leftSection={<IconArrowLeft size={16} />} mb="sm" onClick={() => navigate('/patient/doctors')}>
        Back
      </Button>
      <PageHeader title="Doctor Details" />

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Group mb="md" wrap="nowrap">
            <Avatar name={doctor.name} color="initials" size={80} />
            <div>
              <Text fw={700} size="xl" className="font-heading">
                {doctor.name}
              </Text>
              <Text c="dimmed">{doctor.specialization}</Text>
              <Badge mt={6} color={doctor.available ? 'green' : 'gray'} variant="light">
                {doctor.available ? 'Available' : 'Unavailable'}
              </Badge>
            </div>
          </Group>
          <Text size="sm" mb={4}>Experience: {doctor.experience} years</Text>
          <Text size="sm" mb={4}>Consultation fee: {formatCurrency(doctor.fee)}</Text>
          <Text size="sm" mb={4}>Phone: {doctor.phone}</Text>
          <Text size="sm" mb={4}>Email: {doctor.email}</Text>
          <Text size="sm" mt="sm">{doctor.about}</Text>
        </Card>

        <Card withBorder radius="md" padding="lg">
          <Text fw={600} mb="sm">
            Book Appointment
          </Text>

          {/* conditional rendering: form only if the doctor is available */}
          {doctor.available ? (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <TextInput
                label="Date"
                type="date"
                min={todayString()}
                {...register('date', {
                  required: 'Please select a date',
                  validate: (v) => v >= todayString() || 'Date cannot be in the past',
                })}
                error={errors.date?.message}
              />
              <Select label="Time" data={timeSlots} value={watch('time')} onChange={(v) => setValue('time', v)} />
              <Textarea
                label="Reason for visit"
                minRows={3}
                autosize
                {...register('reason', { required: 'Please enter a reason', minLength: { value: 5, message: 'At least 5 characters' } })}
                error={errors.reason?.message}
              />
              <Button type="submit">Confirm Booking</Button>
            </form>
          ) : (
            <Text c="dimmed">This doctor is currently unavailable for new appointments.</Text>
          )}
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default DoctorDetails;
