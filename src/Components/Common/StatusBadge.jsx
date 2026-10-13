import { Badge } from '@mantine/core';
import { statusColor } from '../../utils/helpers';

const StatusBadge = ({ status }) => (
  <Badge color={statusColor[status] || 'gray'} variant="light">
    {status}
  </Badge>
);

export default StatusBadge;
