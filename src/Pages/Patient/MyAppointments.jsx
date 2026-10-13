import { Button, Card, SegmentedControl } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../../context/HospitalContext';
import { getLoggedInUser } from '../../utils/auth';
import PageHeader from '../../Components/Common/PageHeader';
import AppointmentTable from '../../Components/Common/AppointmentTable';

const filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

const MyAppointments = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const { state, dispatch } = useHospital();
  const [filter, setFilter] = useState('All');

  const mine = state.appointments.filter((a) => a.patientId === user.profileId);
  const appointments = filter === 'All' ? mine : mine.filter((a) => a.status === filter);

  const cancel = (id) => {
    if (window.confirm('Cancel this appointment?')) {
      dispatch({ type: 'UPDATE_APPOINTMENT_STATUS', payload: { id, status: 'Cancelled' } });
      notifications.show({ message: 'Appointment cancelled', color: 'red' });
    }
  };

  return (
    <div>
      <PageHeader
        title="My Appointments"
        subtitle="Track all your bookings"
        action={<Button onClick={() => navigate('/patient/doctors')}>Book New</Button>}
      />

      <Card withBorder radius="md">
        <SegmentedControl mb="md" data={filters} value={filter} onChange={setFilter} />
        <AppointmentTable
          appointments={appointments}
          patients={state.patients}
          doctors={state.doctors}
          showPatient={false}
          renderActions={(a) =>
            (a.status === 'Pending' || a.status === 'Confirmed') && (
              <Button size="xs" color="red" variant="light" onClick={() => cancel(a.id)}>
                Cancel
              </Button>
            )
          }
        />
      </Card>
    </div>
  );
};

export default MyAppointments;
