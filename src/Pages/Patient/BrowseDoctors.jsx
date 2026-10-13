import { useState } from 'react';
import { Card, Text, Badge, Button, Group, TextInput, Select, SimpleGrid, Avatar } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../../context/HospitalContext';
import PageHeader from '../../Components/Common/PageHeader';
import EmptyState from '../../Components/Common/EmptyState';
import { formatCurrency } from '../../utils/helpers';

const BrowseDoctors = () => {
  const navigate = useNavigate();
  const { state } = useHospital();
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [maxFee, setMaxFee] = useState('');

  // unique specializations for the dropdown
  const specializations = [...new Set(state.doctors.map((d) => d.specialization))];

  // search + filter by specialization + filter by fee
  const doctors = state.doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) &&
      (specialization === '' || d.specialization === specialization) &&
      (maxFee === '' || d.fee <= Number(maxFee))
  );

  return (
    <div>
      <PageHeader title="Find Doctors" subtitle="Choose a doctor and book your appointment" />

      <Group mb="lg">
        <TextInput placeholder="Search doctor" leftSection={<IconSearch size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select placeholder="Specialization" data={specializations} value={specialization || null} onChange={(v) => setSpecialization(v || '')} clearable />
        <Select placeholder="Max fee" data={[{ value: '500', label: 'Up to ₹500' }, { value: '800', label: 'Up to ₹800' }, { value: '1000', label: 'Up to ₹1000' }]} value={maxFee || null} onChange={(v) => setMaxFee(v || '')} clearable />
      </Group>

      {doctors.length === 0 ? (
        <EmptyState message="No doctors match your search" />
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {doctors.map((d) => (
            <Card key={d.id} withBorder radius="md" padding="lg" shadow="sm">
              <Group mb="sm" wrap="nowrap">
                <Avatar name={d.name} color="initials" size={54} />
                <div>
                  <Text fw={600}>{d.name}</Text>
                  <Text size="sm" c="dimmed">
                    {d.specialization}
                  </Text>
                </div>
              </Group>
              <Text size="sm">Experience: {d.experience} years</Text>
              <Text size="sm" mb="sm">
                Fee: {formatCurrency(d.fee)}
              </Text>
              <Group justify="space-between">
                <Badge color={d.available ? 'green' : 'gray'} variant="light">
                  {d.available ? 'Available' : 'Unavailable'}
                </Badge>
                <Button size="xs" onClick={() => navigate(`/patient/doctors/${d.id}`)}>
                  View Details
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default BrowseDoctors;
