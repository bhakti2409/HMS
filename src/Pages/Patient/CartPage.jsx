import { Card, Table, Text, Button, Group, ActionIcon, Modal, Select, Textarea, Badge } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useHospital } from '../../context/HospitalContext';
import { getLoggedInUser } from '../../utils/auth';
import PageHeader from '../../Components/Common/PageHeader';
import EmptyState from '../../Components/Common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/helpers';

const CartPage = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const { state, dispatch } = useHospital();
  const [opened, { open, close }] = useDisclosure(false);

  const { handleSubmit, setValue, watch, register, formState: { errors } } = useForm({
    defaultValues: { paymentMethod: 'Cash on Delivery', address: '' },
  });

  // reduce() -> calculate the total amount
  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const myOrders = state.orders.filter((o) => o.patientId === user.profileId);

  const placeOrder = (data) => {
    dispatch({
      type: 'PLACE_ORDER',
      payload: {
        patientId: user.profileId,
        items: state.cart,
        total,
        paymentMethod: data.paymentMethod,
        address: data.address,
        date: new Date().toISOString().slice(0, 10),
        status: 'Placed',
      },
    });
    notifications.show({ title: 'Order placed', message: 'Your medicines will be delivered soon.', color: 'teal' });
    close();
  };

  return (
    <div>
      <PageHeader title="My Cart" subtitle="Review your medicines and place the order" />

      <Card withBorder radius="md" mb="lg">
        {/* conditional rendering: empty cart vs cart table */}
        {state.cart.length === 0 ? (
          <div className="text-center">
            <EmptyState message="Your cart is empty" />
            <Button onClick={() => navigate('/patient/pharmacy')}>Browse Pharmacy</Button>
          </div>
        ) : (
          <>
            <Table.ScrollContainer minWidth={600}>
              <Table verticalSpacing="sm">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Medicine</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Subtotal</Table.Th>
                    <Table.Th>Remove</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {state.cart.map((item) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>{item.name}</Table.Td>
                      <Table.Td>{formatCurrency(item.price)}</Table.Td>
                      <Table.Td>
                        <Group gap="xs" wrap="nowrap">
                          <ActionIcon variant="light" size="sm" onClick={() => dispatch({ type: 'DECREASE_QTY', payload: item.id })} aria-label="Decrease">
                            <IconMinus size={14} />
                          </ActionIcon>
                          <Text w={24} ta="center">{item.quantity}</Text>
                          <ActionIcon variant="light" size="sm" onClick={() => dispatch({ type: 'INCREASE_QTY', payload: item.id })} aria-label="Increase">
                            <IconPlus size={14} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                      <Table.Td>{formatCurrency(item.price * item.quantity)}</Table.Td>
                      <Table.Td>
                        <ActionIcon color="red" variant="light" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })} aria-label="Remove">
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>

            <Group justify="space-between" mt="md">
              <Button color="red" variant="light" onClick={() => dispatch({ type: 'CLEAR_CART' })}>
                Clear Cart
              </Button>
              <Group>
                <Text fw={700} size="lg">
                  Total: {formatCurrency(total)}
                </Text>
                <Button onClick={open}>Proceed to Payment</Button>
              </Group>
            </Group>
          </>
        )}
      </Card>

      <Card withBorder radius="md">
        <Text fw={600} mb="sm">
          My Previous Orders
        </Text>
        {myOrders.length === 0 ? (
          <EmptyState message="No orders yet" />
        ) : (
          myOrders.map((order) => (
            <div key={order.id} className="border-b last:border-b-0 py-3">
              <Group justify="space-between">
                <Text fw={500}>Order #{order.id} - {formatDate(order.date)}</Text>
                <Badge color="green" variant="light">{order.status}</Badge>
              </Group>
              <Text size="sm" c="dimmed">
                {order.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}
              </Text>
              <Text size="sm">
                {formatCurrency(order.total)} | {order.paymentMethod}
              </Text>
            </div>
          ))
        )}
      </Card>

      {/* Payment */}
      <Modal opened={opened} onClose={close} title="Payment" centered>
        <form onSubmit={handleSubmit(placeOrder)} className="flex flex-col gap-3">
          <Text size="sm">
            Amount to pay: <b>{formatCurrency(total)}</b>
          </Text>
          <Textarea
            label="Delivery address"
            autosize
            minRows={2}
            {...register('address', { required: 'Address is required', minLength: { value: 10, message: 'Enter full address' } })}
            error={errors.address?.message}
          />
          <Select
            label="Payment method"
            data={['Cash on Delivery', 'UPI', 'Credit / Debit Card']}
            value={watch('paymentMethod')}
            onChange={(v) => setValue('paymentMethod', v)}
          />
          <Button type="submit">Place Order</Button>
        </form>
      </Modal>
    </div>
  );
};

export default CartPage;
