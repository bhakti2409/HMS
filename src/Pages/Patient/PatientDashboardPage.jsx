import { Card, Text, SimpleGrid, Button, Group } from '@mantine/core';
import { IconCalendarCheck, IconCircleCheck, IconShoppingCart, IconReceipt } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../../context/HospitalContext';
import { getLoggedInUser } from '../../utils/auth';
import PageHeader from '../../Components/Common/PageHeader';
import StatCard from '../../Components/Common/StatCard';
import { formatDate, formatTime } from '../../utils/helpers';

const PatientDashboardPage = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const { state } = useHospital();

  const mine = state.appointments.filter((a) => a.patientId === user.profileId);
  const upcoming = mine
    .filter((a) => a.status === 'Pending' || a.status === 'Confirmed')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const completed = mine.filter((a) => a.status === 'Completed').length;
  const cartItems = state.cart.reduce((total, item) => total + item.quantity, 0);
  const myOrders = state.orders.filter((o) => o.patientId === user.profileId).length;

  const next = upcoming[0];
  const nextDoctor = next ? state.doctors.find((d) => d.id === next.doctorId) : null;

  return (
    <div>
      <PageHeader title={`Hello, ${user.name}`} subtitle="Manage your health in one place" />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
        <StatCard title="Upcoming Appointments" value={upcoming.length} icon={IconCalendarCheck} color="blue" />
        <StatCard title="Completed Visits" value={completed} icon={IconCircleCheck} color="green" />
        <StatCard title="Items in Cart" value={cartItems} icon={IconShoppingCart} color="orange" />
        <StatCard title="Medicine Orders" value={myOrders} icon={IconReceipt} color="violet" />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Card withBorder radius="md">
          <Text fw={600} mb="sm">
            Next Appointment
          </Text>
          {/* conditional rendering */}
          {next ? (
            <div className="flex flex-col gap-1">
              <Text>{nextDoctor ? nextDoctor.name : 'Doctor'}</Text>
              <Text size="sm" c="dimmed">
                {nextDoctor?.specialization}
              </Text>
              <Text size="sm">
                {formatDate(next.date)} at {formatTime(next.time)}
              </Text>
              <Text size="sm">Reason: {next.reason}</Text>
            </div>
          ) : (
            <Text c="dimmed">You have no upcoming appointments.</Text>
          )}
        </Card>

        <Card withBorder radius="md">
          <Text fw={600} mb="sm">
            Quick Actions
          </Text>
          <Group>
            <Button onClick={() => navigate('/patient/doctors')}>Book Appointment</Button>
            <Button variant="light" onClick={() => navigate('/patient/pharmacy')}>
              Order Medicines
            </Button>
            <Button variant="light" onClick={() => navigate('/patient/appointments')}>
              My Appointments
            </Button>
          </Group>
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default PatientDashboardPage;
