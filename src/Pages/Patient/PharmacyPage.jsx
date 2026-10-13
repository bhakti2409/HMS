import { useState } from 'react';
import { Card, Text, Badge, Button, Group, TextInput, Select, SimpleGrid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSearch, IconShoppingCartPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useHospital } from '../../context/HospitalContext';
import PageHeader from '../../Components/Common/PageHeader';
import EmptyState from '../../Components/Common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/helpers';

const PharmacyPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useHospital();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = [...new Set(state.medicines.map((m) => m.category))];

  const medicines = state.medicines.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) && (category === '' || m.category === category)
  );

  const quantityInCart = (id) => state.cart.find((item) => item.id === id)?.quantity || 0;

  const addToCart = (medicine) => {
    if (quantityInCart(medicine.id) >= medicine.stock) {
      notifications.show({ message: 'Maximum available stock already in your cart', color: 'orange' });
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: medicine });
    notifications.show({ message: `${medicine.name} added to cart`, color: 'teal' });
  };

  return (
    <div>
      <PageHeader
        title="Pharmacy"
        subtitle="Order medicines online"
        action={
          <Button variant="light" onClick={() => navigate('/patient/cart')}>
            Go to Cart ({state.cart.reduce((total, item) => total + item.quantity, 0)})
          </Button>
        }
      />

      <Group mb="lg">
        <TextInput placeholder="Search medicine" leftSection={<IconSearch size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select placeholder="Category" data={categories} value={category || null} onChange={(v) => setCategory(v || '')} clearable />
      </Group>

      {medicines.length === 0 ? (
        <EmptyState message="No medicines found" />
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          {medicines.map((m) => {
            const expired = dayjs(m.expiry).isBefore(dayjs());
            const unavailable = m.stock === 0 || expired;
            return (
              <Card key={m.id} withBorder radius="md" padding="lg" shadow="sm">
                <Badge variant="light" mb="xs" w="fit-content">
                  {m.category}
                </Badge>
                <Text fw={600}>{m.name}</Text>
                <Text size="lg" fw={700} my={4}>
                  {formatCurrency(m.price)}
                </Text>
                <Text size="xs" c="dimmed">
                  Expiry: {formatDate(m.expiry)}
                </Text>
                <Text size="xs" c={m.stock <= 10 ? 'red' : 'dimmed'} mb="sm">
                  {m.stock === 0 ? 'Out of stock' : `${m.stock} in stock`}
                </Text>
                <Button fullWidth size="xs" leftSection={<IconShoppingCartPlus size={16} />} disabled={unavailable} onClick={() => addToCart(m)}>
                  {expired ? 'Expired' : m.stock === 0 ? 'Out of stock' : 'Add to Cart'}
                </Button>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </div>
  );
};

export default PharmacyPage;
