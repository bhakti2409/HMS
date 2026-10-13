import { useState } from 'react';
import { Button, Card, SegmentedControl } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useHospital } from '../../context/HospitalContext';
import PageHeader from '../../Components/Common/PageHeader';
import AppointmentTable from '../../Components/Common/AppointmentTable';

const filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

const ManageAppointments = () => {
  const { state, dispatch } = useHospital();
  const [filter, setFilter] = useState('All');

  const appointments = filter === 'All' ? state.appointments : state.appointments.filter((a) => a.status === filter);

  // map() is used inside the reducer to change the status
  const changeStatus = (id, status) => {
    dispatch({ type: 'UPDATE_APPOINTMENT_STATUS', payload: { id, status } });
    notifications.show({ message: `Appointment ${status.toLowerCase()}`, color: status === 'Cancelled' ? 'red' : 'teal' });
  };

  // filter() is used inside the reducer to delete
  const handleDelete = (id) => {
    if (window.confirm('Delete this appointment?')) dispatch({ type: 'DELETE_APPOINTMENT', payload: id });
  };

  return (
    <div>
      <PageHeader title="Manage Appointments" subtitle="Confirm, cancel or delete patient appointments" />

      <Card withBorder radius="md">
        <SegmentedControl mb="md" data={filters} value={filter} onChange={setFilter} />

        <AppointmentTable
          appointments={appointments}
          patients={state.patients}
          doctors={state.doctors}
          renderActions={(a) => (
            <>
              {/* conditional rendering: buttons depend on the current status */}
              {a.status === 'Pending' && (
                <Button size="xs" color="green" onClick={() => changeStatus(a.id, 'Confirmed')}>
                  Confirm
                </Button>
              )}
              {a.status === 'Confirmed' && (
                <Button size="xs" color="blue" onClick={() => changeStatus(a.id, 'Completed')}>
                  Complete
                </Button>
              )}
              {(a.status === 'Pending' || a.status === 'Confirmed') && (
                <Button size="xs" color="orange" variant="light" onClick={() => changeStatus(a.id, 'Cancelled')}>
                  Cancel
                </Button>
              )}
              <Button size="xs" color="red" variant="light" onClick={() => handleDelete(a.id)}>
                Delete
              </Button>
            </>
          )}
        />
      </Card>
    </div>
  );
};

export default ManageAppointments;
