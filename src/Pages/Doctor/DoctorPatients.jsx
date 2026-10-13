import { Table, Card } from '@mantine/core';
import { useHospital } from '../../context/HospitalContext';
import { getLoggedInUser } from '../../utils/auth';
import PageHeader from '../../Components/Common/PageHeader';
import EmptyState from '../../Components/Common/EmptyState';
import { formatDate } from '../../utils/helpers';

const DoctorPatients = () => {
  const user = getLoggedInUser();
  const { state } = useHospital();

  const myAppointments = state.appointments.filter((a) => a.doctorId === user.profileId);

  // unique patient ids -> patient objects (map + filter)
  const patientIds = [...new Set(myAppointments.map((a) => a.patientId))];
  const myPatients = patientIds.map((id) => state.patients.find((p) => p.id === id)).filter(Boolean);

  const visitsOf = (patientId) => myAppointments.filter((a) => a.patientId === patientId && a.status === 'Completed').length;

  const lastVisitOf = (patientId) => {
    const dates = myAppointments.filter((a) => a.patientId === patientId && a.status === 'Completed').map((a) => a.date).sort();
    return dates.length ? formatDate(dates[dates.length - 1]) : '-';
  };

  return (
    <div>
      <PageHeader title="My Patients" subtitle={`${myPatients.length} patients have booked with you`} />

      <Card withBorder radius="md">
        {myPatients.length === 0 ? (
          <EmptyState message="No patients yet" />
        ) : (
          <Table.ScrollContainer minWidth={700}>
            <Table striped highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Age</Table.Th>
                  <Table.Th>Gender</Table.Th>
                  <Table.Th>Blood Group</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Completed Visits</Table.Th>
                  <Table.Th>Last Visit</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {myPatients.map((p) => (
                  <Table.Tr key={p.id}>
                    <Table.Td>{p.name}</Table.Td>
                    <Table.Td>{p.age}</Table.Td>
                    <Table.Td>{p.gender}</Table.Td>
                    <Table.Td>{p.bloodGroup}</Table.Td>
                    <Table.Td>{p.phone}</Table.Td>
                    <Table.Td>{visitsOf(p.id)}</Table.Td>
                    <Table.Td>{lastVisitOf(p.id)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Card>
    </div>
  );
};

export default DoctorPatients;
