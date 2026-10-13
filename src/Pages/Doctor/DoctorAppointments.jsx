import { useState } from 'react';
import { Button, Card, SegmentedControl } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useHospital } from '../../context/HospitalContext';
import { getLoggedInUser } from '../../utils/auth';
import PageHeader from '../../Components/Common/PageHeader';
import AppointmentTable from '../../Components/Common/AppointmentTable';

const filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

const DoctorAppointments = () => {
  const user = getLoggedInUser();
  const { state, dispatch } = useHospital();
  const [filter, setFilter] = useState('All');

  const mine = state.appointments.filter((a) => a.doctorId === user.profileId);
  const appointments = filter === 'All' ? mine : mine.filter((a) => a.status === filter);

  const changeStatus = (id, status) => {
    dispatch({ type: 'UPDATE_APPOINTMENT_STATUS', payload: { id, status } });
    notifications.show({ message: `Appointment ${status.toLowerCase()}`, color: status === 'Cancelled' ? 'red' : 'teal' });
  };

  return (
    <div>
      <PageHeader title="My Appointments" subtitle="Accept, complete or cancel appointments booked with you" />

      <Card withBorder radius="md">
        <SegmentedControl mb="md" data={filters} value={filter} onChange={setFilter} />
        <AppointmentTable
          appointments={appointments}
          patients={state.patients}
          doctors={state.doctors}
          showDoctor={false}
          renderActions={(a) => (
            <>
              {a.status === 'Pending' && (
                <Button size="xs" color="green" onClick={() => changeStatus(a.id, 'Confirmed')}>
                  Accept
                </Button>
              )}
              {a.status === 'Confirmed' && (
                <Button size="xs" color="blue" onClick={() => changeStatus(a.id, 'Completed')}>
                  Mark Completed
                </Button>
              )}
              {(a.status === 'Pending' || a.status === 'Confirmed') && (
                <Button size="xs" color="red" variant="light" onClick={() => changeStatus(a.id, 'Cancelled')}>
                  Cancel
                </Button>
              )}
            </>
          )}
        />
      </Card>
    </div>
  );
};

export default DoctorAppointments;
