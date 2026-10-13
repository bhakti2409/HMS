import { Card, Text } from '@mantine/core';

// Small summary card used on dashboards
const StatCard = ({ title, value, icon: Icon, color = 'teal' }) => (
  <Card withBorder radius="md" padding="lg" shadow="sm">
    <div className="flex items-center justify-between">
      <div>
        <Text size="sm" c="dimmed">
          {title}
        </Text>
        <Text fw={700} size="xl" className="font-heading">
          {value}
        </Text>
      </div>
      {Icon && (
        <div className="rounded-full p-3" style={{ background: `var(--mantine-color-${color}-1)`, color: `var(--mantine-color-${color}-7)` }}>
          <Icon size={26} stroke={1.8} />
        </div>
      )}
    </div>
  </Card>
);

export default StatCard;
