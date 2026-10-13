import { useState } from 'react';
import { Table, Button, Modal, TextInput, Select, Group, Card, ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from 'react-hook-form';
import { useHospital } from '../../context/HospitalContext';
import PageHeader from '../../Components/Common/PageHeader';
import EmptyState from '../../Components/Common/EmptyState';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const ManagePatients = () => {
  const { state, dispatch } = useHospital();
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState('');

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { name: '', age: '', gender: 'Male', bloodGroup: 'O+', phone: '', email: '', address: '' },
  });

  const patients = state.patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  // number of appointments for one patient
  const countAppointments = (patientId) => state.appointments.filter((a) => a.patientId === patientId).length;

  const onSubmit = (data) => {
    dispatch({ type: 'ADD_PATIENT', payload: { ...data, age: Number(data.age) } });
    notifications.show({ message: `${data.name} added`, color: 'teal' });
    reset();
    close();
  };

  const handleDelete = (patient) => {
    if (window.confirm(`Delete patient ${patient.name}?`)) {
      dispatch({ type: 'DELETE_PATIENT', payload: patient.id });
      notifications.show({ message: 'Patient deleted', color: 'red' });
    }
  };

  return (
    <div>
      <PageHeader
        title="Manage Patients"
        subtitle={`${state.patients.length} patients registered`}
        action={
          <Button leftSection={<IconPlus size={16} />} onClick={open}>
            Add New Patient
          </Button>
        }
      />

      <Card withBorder radius="md">
        <TextInput mb="md" w={280} placeholder="Search by name" leftSection={<IconSearch size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />

        {patients.length === 0 ? (
          <EmptyState message="No patients found" />
        ) : (
          <Table.ScrollContainer minWidth={800}>
            <Table striped highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Age</Table.Th>
                  <Table.Th>Gender</Table.Th>
                  <Table.Th>Blood Group</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Address</Table.Th>
                  <Table.Th>Appointments</Table.Th>
                  <Table.Th>Delete</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {patients.map((p) => (
                  <Table.Tr key={p.id}>
                    <Table.Td>{p.id}</Table.Td>
                    <Table.Td>{p.name}</Table.Td>
                    <Table.Td>{p.age}</Table.Td>
                    <Table.Td>{p.gender}</Table.Td>
                    <Table.Td>{p.bloodGroup}</Table.Td>
                    <Table.Td>{p.phone}</Table.Td>
                    <Table.Td>{p.address}</Table.Td>
                    <Table.Td>{countAppointments(p.id)}</Table.Td>
                    <Table.Td>
                      <ActionIcon color="red" variant="light" onClick={() => handleDelete(p)} aria-label="Delete patient">
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Card>

      <Modal opened={opened} onClose={close} title="Add New Patient" centered>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <TextInput label="Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />
          <Group grow align="flex-start">
            <TextInput label="Age" type="number" {...register('age', { required: 'Age is required', min: { value: 0, message: 'Invalid age' }, max: { value: 120, message: 'Invalid age' } })} error={errors.age?.message} />
            <Select label="Gender" data={['Male', 'Female', 'Other']} value={watch('gender')} onChange={(v) => setValue('gender', v)} />
          </Group>
          <Select label="Blood group" data={bloodGroups} value={watch('bloodGroup')} onChange={(v) => setValue('bloodGroup', v)} />
          <TextInput label="Email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} error={errors.email?.message} />
          <TextInput label="Phone" {...register('phone', { required: 'Phone is required', pattern: { value: /^\d{10}$/, message: 'Enter 10 digit phone number' } })} error={errors.phone?.message} />
          <TextInput label="Address" {...register('address', { required: 'Address is required' })} error={errors.address?.message} />
          <Button type="submit" mt="sm">
            Save Patient
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ManagePatients;
