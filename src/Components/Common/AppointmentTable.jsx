import { Table, Group } from '@mantine/core';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';
import { formatDate, formatTime } from '../../utils/helpers';

// Reusable table for appointments. Each page decides which action buttons to show.
//   showPatient / showDoctor -> which name columns to display
//   renderActions(appointment) -> returns the buttons for that row
const AppointmentTable = ({ appointments, patients, doctors, showPatient = true, showDoctor = true, renderActions }) => {
  if (appointments.length === 0) return <EmptyState message="No appointments found" />;

  const getPatientName = (id) => patients.find((p) => p.id === id)?.name || 'Unknown';
  const getDoctorName = (id) => doctors.find((d) => d.id === id)?.name || 'Unknown';

  return (
    <Table.ScrollContainer minWidth={700}>
      <Table striped highlightOnHover verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>#</Table.Th>
            {showPatient && <Table.Th>Patient</Table.Th>}
            {showDoctor && <Table.Th>Doctor</Table.Th>}
            <Table.Th>Date</Table.Th>
            <Table.Th>Time</Table.Th>
            <Table.Th>Reason</Table.Th>
            <Table.Th>Status</Table.Th>
            {renderActions && <Table.Th>Actions</Table.Th>}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {appointments.map((a) => (
            <Table.Tr key={a.id}>
              <Table.Td>{a.id}</Table.Td>
              {showPatient && <Table.Td>{getPatientName(a.patientId)}</Table.Td>}
              {showDoctor && <Table.Td>{getDoctorName(a.doctorId)}</Table.Td>}
              <Table.Td>{formatDate(a.date)}</Table.Td>
              <Table.Td>{formatTime(a.time)}</Table.Td>
              <Table.Td>{a.reason}</Table.Td>
              <Table.Td>
                <StatusBadge status={a.status} />
              </Table.Td>
              {renderActions && (
                <Table.Td>
                  <Group gap="xs" wrap="nowrap">
                    {renderActions(a)}
                  </Group>
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default AppointmentTable;
