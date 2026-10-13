import { useState } from 'react';
import { Table, Button, Modal, TextInput, Select, Group, Badge, Card, Switch, ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from 'react-hook-form';
import { useHospital } from '../../context/HospitalContext';
import PageHeader from '../../Components/Common/PageHeader';
import EmptyState from '../../Components/Common/EmptyState';
import { formatCurrency } from '../../utils/helpers';

export const specializations = [
  'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic', 'Dermatologist', 'General Physician', 'Gynecologist', 'ENT Specialist',
];

const ManageDoctors = () => {
  const { state, dispatch } = useHospital();
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('');

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { name: '', specialization: 'General Physician', experience: 1, fee: 500, phone: '', email: '' },
  });

  // search + filter using filter()
  const doctors = state.doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) && (specFilter === '' || d.specialization === specFilter)
  );

  const onSubmit = (data) => {
    dispatch({
      type: 'ADD_DOCTOR',
      payload: { ...data, experience: Number(data.experience), fee: Number(data.fee), available: true, about: `${data.specialization} at Pulse hospital.` },
    });
    notifications.show({ message: `${data.name} added`, color: 'teal' });
    reset();
    close();
  };

  const handleDelete = (doctor) => {
    if (window.confirm(`Delete ${doctor.name}?`)) {
      dispatch({ type: 'DELETE_DOCTOR', payload: doctor.id });
      notifications.show({ message: 'Doctor deleted', color: 'red' });
    }
  };

  return (
    <div>
      <PageHeader
        title="Manage Doctors"
        subtitle={`${state.doctors.length} doctors registered`}
        action={
          <Button leftSection={<IconPlus size={16} />} onClick={open}>
            Add New Doctor
          </Button>
        }
      />

      <Card withBorder radius="md">
        <Group mb="md">
          <TextInput placeholder="Search by name" leftSection={<IconSearch size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select placeholder="All specializations" data={specializations} value={specFilter || null} onChange={(v) => setSpecFilter(v || '')} clearable />
        </Group>

        {doctors.length === 0 ? (
          <EmptyState message="No doctors found" />
        ) : (
          <Table.ScrollContainer minWidth={800}>
            <Table striped highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Specialization</Table.Th>
                  <Table.Th>Experience</Table.Th>
                  <Table.Th>Fee</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Availability</Table.Th>
                  <Table.Th>Delete</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {doctors.map((d) => (
                  <Table.Tr key={d.id}>
                    <Table.Td>{d.id}</Table.Td>
                    <Table.Td>{d.name}</Table.Td>
                    <Table.Td>{d.specialization}</Table.Td>
                    <Table.Td>{d.experience} yrs</Table.Td>
                    <Table.Td>{formatCurrency(d.fee)}</Table.Td>
                    <Table.Td>{d.phone}</Table.Td>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Switch checked={d.available} onChange={() => dispatch({ type: 'TOGGLE_DOCTOR_AVAILABILITY', payload: d.id })} />
                        <Badge color={d.available ? 'green' : 'gray'} variant="light">
                          {d.available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon color="red" variant="light" onClick={() => handleDelete(d)} aria-label="Delete doctor">
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

      <Modal opened={opened} onClose={close} title="Add New Doctor" centered>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <TextInput label="Name" placeholder="Dr. Full Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />
          <Select label="Specialization" data={specializations} value={watch('specialization')} onChange={(v) => setValue('specialization', v)} />
          <TextInput label="Email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} error={errors.email?.message} />
          <TextInput label="Phone" {...register('phone', { required: 'Phone is required', pattern: { value: /^\d{10}$/, message: 'Enter 10 digit phone number' } })} error={errors.phone?.message} />
          <TextInput label="Experience (years)" type="number" {...register('experience', { required: 'Required', min: { value: 0, message: 'Cannot be negative' } })} error={errors.experience?.message} />
          <TextInput label="Consultation fee (₹)" type="number" {...register('fee', { required: 'Required', min: { value: 100, message: 'Minimum fee is 100' } })} error={errors.fee?.message} />
          <Button type="submit" mt="sm">
            Save Doctor
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ManageDoctors;
