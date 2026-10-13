import { Card, Text, Button, SimpleGrid, Group } from '@mantine/core';
import { IconStethoscope, IconMoodHeart, IconCalendarCheck, IconClockHour4, IconVaccine, IconAlertTriangle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../../context/HospitalContext';
import PageHeader from '../../Components/Common/PageHeader';
import StatCard from '../../Components/Common/StatCard';
import AppointmentTable from '../../Components/Common/AppointmentTable';
import { formatCurrency } from '../../utils/helpers';

const LOW_STOCK_LIMIT = 10;

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { state } = useHospital();
  const { doctors, patients, appointments, medicines, orders } = state;

  // filter() -> count appointments by status
  const pending = appointments.filter((a) => a.status === 'Pending').length;
  const lowStock = medicines.filter((m) => m.stock <= LOW_STOCK_LIMIT);
  const availableDoctors = doctors.filter((d) => d.available).length;

  // reduce() -> total revenue of all medicine orders
  const revenue = orders.reduce((total, order) => total + order.total, 0);

  // latest 5 appointments
  const recent = [...appointments].reverse().slice(0, 5);

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Quick overview of the hospital" />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
        <StatCard title="Total Doctors" value={doctors.length} icon={IconStethoscope} color="teal" />
        <StatCard title="Total Patients" value={patients.length} icon={IconMoodHeart} color="pink" />
        <StatCard title="Total Appointments" value={appointments.length} icon={IconCalendarCheck} color="blue" />
        <StatCard title="Pending Appointments" value={pending} icon={IconClockHour4} color="yellow" />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
        <StatCard title="Available Doctors" value={availableDoctors} icon={IconStethoscope} color="green" />
        <StatCard title="Medicines in Stock" value={medicines.length} icon={IconVaccine} color="violet" />
        <StatCard title="Low Stock Medicines" value={lowStock.length} icon={IconAlertTriangle} color="red" />
        <StatCard title="Pharmacy Revenue" value={formatCurrency(revenue)} icon={IconVaccine} color="orange" />
      </SimpleGrid>

      <Card withBorder radius="md" mb="lg">
        <Text fw={600} mb="sm">
          Quick Actions
        </Text>
        <Group>
          <Button onClick={() => navigate('/admin/doctors')}>Manage Doctors</Button>
          <Button variant="light" onClick={() => navigate('/admin/patients')}>
            Manage Patients
          </Button>
          <Button variant="light" onClick={() => navigate('/admin/appointments')}>
            Manage Appointments
          </Button>
          <Button variant="light" onClick={() => navigate('/admin/pharmacy')}>
            Manage Pharmacy
          </Button>
        </Group>
      </Card>

      <Card withBorder radius="md" mb="lg">
        <Text fw={600} mb="sm">
          Recent Appointments
        </Text>
        <AppointmentTable appointments={recent} patients={patients} doctors={doctors} />
      </Card>

      {/* conditional rendering: show only when some medicine is running low */}
      {lowStock.length > 0 && (
        <Card withBorder radius="md">
          <Text fw={600} mb="sm" c="red">
            Low Stock Alert
          </Text>
          {lowStock.map((m) => (
            <Text size="sm" key={m.id}>
              {m.name} - only {m.stock} left
            </Text>
          ))}
        </Card>
      )}
    </div>
  );
};

export default AdminDashboardPage;
