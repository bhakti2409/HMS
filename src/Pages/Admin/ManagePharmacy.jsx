import { useState } from 'react';
import { Table, Button, Modal, TextInput, Group, Card, Badge, ActionIcon, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useHospital } from '../../context/HospitalContext';
import PageHeader from '../../Components/Common/PageHeader';
import EmptyState from '../../Components/Common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/helpers';

const LOW_STOCK_LIMIT = 10;

const ManagePharmacy = () => {
  const { state, dispatch } = useHospital();
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', category: '', price: '', stock: '', expiry: '' },
  });

  const medicines = state.medicines.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  // reduce() -> total value of the stock
  const stockValue = state.medicines.reduce((total, m) => total + m.price * m.stock, 0);

  const onSubmit = (data) => {
    dispatch({ type: 'ADD_MEDICINE', payload: { ...data, price: Number(data.price), stock: Number(data.stock) } });
    notifications.show({ message: `${data.name} added`, color: 'teal' });
    reset();
    close();
  };

  const handleDelete = (medicine) => {
    if (window.confirm(`Delete ${medicine.name}?`)) dispatch({ type: 'DELETE_MEDICINE', payload: medicine.id });
  };

  const stockBadge = (stock) => {
    if (stock === 0) return <Badge color="red">Out of stock</Badge>;
    if (stock <= LOW_STOCK_LIMIT) return <Badge color="orange">Low: {stock}</Badge>;
    return <Badge color="green" variant="light">{stock}</Badge>;
  };

  // expiring within 90 days (or already expired)
  const isExpiringSoon = (expiry) => dayjs(expiry).diff(dayjs(), 'day') <= 90;

  return (
    <div>
      <PageHeader
        title="Manage Pharmacy"
        subtitle={`${state.medicines.length} medicines | Stock value ${formatCurrency(stockValue)}`}
        action={
          <Button leftSection={<IconPlus size={16} />} onClick={open}>
            Add Medicine
          </Button>
        }
      />

      <Card withBorder radius="md">
        <TextInput mb="md" w={280} placeholder="Search medicine" leftSection={<IconSearch size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />

        {medicines.length === 0 ? (
          <EmptyState message="No medicines found" />
        ) : (
          <Table.ScrollContainer minWidth={800}>
            <Table striped highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Medicine</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Stock</Table.Th>
                  <Table.Th>Expiry</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {medicines.map((m) => (
                  <Table.Tr key={m.id}>
                    <Table.Td>{m.id}</Table.Td>
                    <Table.Td>{m.name}</Table.Td>
                    <Table.Td>{m.category}</Table.Td>
                    <Table.Td>{formatCurrency(m.price)}</Table.Td>
                    <Table.Td>{stockBadge(m.stock)}</Table.Td>
                    <Table.Td>
                      <Text size="sm" c={isExpiringSoon(m.expiry) ? 'red' : undefined}>
                        {formatDate(m.expiry)}
                        {isExpiringSoon(m.expiry) && ' (expiring soon)'}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Button size="xs" variant="light" onClick={() => dispatch({ type: 'RESTOCK_MEDICINE', payload: { id: m.id, quantity: 10 } })}>
                          +10 Stock
                        </Button>
                        <ActionIcon color="red" variant="light" onClick={() => handleDelete(m)} aria-label="Delete medicine">
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}
      </Card>

      <Modal opened={opened} onClose={close} title="Add Medicine" centered>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <TextInput label="Medicine name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />
          <TextInput label="Category" placeholder="e.g. Antibiotic" {...register('category', { required: 'Category is required' })} error={errors.category?.message} />
          <Group grow align="flex-start">
            <TextInput label="Price (₹)" type="number" {...register('price', { required: 'Required', min: { value: 1, message: 'Min 1' } })} error={errors.price?.message} />
            <TextInput label="Stock" type="number" {...register('stock', { required: 'Required', min: { value: 0, message: 'Min 0' } })} error={errors.stock?.message} />
          </Group>
          <TextInput label="Expiry date" type="date" {...register('expiry', { required: 'Expiry date is required' })} error={errors.expiry?.message} />
          <Button type="submit" mt="sm">
            Save Medicine
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ManagePharmacy;
