import { Card, Text, SimpleGrid, Button } from '@mantine/core';
import { IconCalendarCheck, IconClockHour4, IconCircleCheck, IconMoodHeart } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../../context/HospitalContext';
import { getLoggedInUser } from '../../utils/auth';
import PageHeader from '../../Components/Common/PageHeader';
import StatCard from '../../Components/Common/StatCard';
import AppointmentTable from '../../Components/Common/AppointmentTable';
import { todayString } from '../../utils/helpers';

const DoctorDashboardPage = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const { state } = useHospital();

  // only the appointments that belong to the logged-in doctor
  const myAppointments = state.appointments.filter((a) => a.doctorId === user.profileId);

  const pending = myAppointments.filter((a) => a.status === 'Pending').length;
  const completed = myAppointments.filter((a) => a.status === 'Completed').length;
  const today = myAppointments.filter((a) => a.date === todayString() && a.status !== 'Cancelled');

  // unique patient ids using map() + Set
  const patientCount = new Set(myAppointments.map((a) => a.patientId)).size;

  // upcoming = not cancelled / completed, sorted by date
  const upcoming = myAppointments
    .filter((a) => a.status === 'Pending' || a.status === 'Confirmed')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 5);

  return (
    <div>
      <PageHeader title={`Welcome, ${user.name}`} subtitle="Your schedule at a glance" />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="lg">
        <StatCard title="Today's Appointments" value={today.length} icon={IconCalendarCheck} color="blue" />
        <StatCard title="Pending Requests" value={pending} icon={IconClockHour4} color="yellow" />
        <StatCard title="Completed" value={completed} icon={IconCircleCheck} color="green" />
        <StatCard title="My Patients" value={patientCount} icon={IconMoodHeart} color="pink" />
      </SimpleGrid>

      <Card withBorder radius="md">
        <div className="flex justify-between items-center mb-3">
          <Text fw={600}>Upcoming Appointments</Text>
          <Button variant="light" size="xs" onClick={() => navigate('/doctor/appointments')}>
            View all
          </Button>
        </div>
        <AppointmentTable appointments={upcoming} patients={state.patients} doctors={state.doctors} showDoctor={false} />
      </Card>
    </div>
  );
};

export default DoctorDashboardPage;
