import { Text } from '@mantine/core';

const EmptyState = ({ message = 'No records found' }) => (
  <div className="py-10 text-center">
    <Text c="dimmed">{message}</Text>
  </div>
);

export default EmptyState;
