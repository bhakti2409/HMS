import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarLeftExpandFilled, IconBellRinging } from '@tabler/icons-react';
import { ActionIcon, Indicator } from '@mantine/core';
import ProfileMenu from './ProfileMenu';
import { useHospital } from '../../context/HospitalContext';

const Header = ({ collapsed, onToggleSidebar }) => {
  const { state } = useHospital();

  // notification count = appointments that are still pending
  const pendingCount = state.appointments.filter((a) => a.status === 'Pending').length;

  return (
    <div className="bg-cyan-100 w-full h-16 shrink-0 flex justify-between px-5 items-center">
      <ActionIcon variant="outline" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        {collapsed ? (
          <IconLayoutSidebarLeftExpandFilled size={18} stroke={2} />
        ) : (
          <IconLayoutSidebarLeftCollapseFilled size={18} stroke={2} />
        )}
      </ActionIcon>

      <div className="flex gap-5 items-center">
        <Indicator label={pendingCount} size={16} disabled={pendingCount === 0} color="red" title={`${pendingCount} pending appointments`}>
          <ActionIcon variant="transparent" size="md" aria-label="Notifications">
            <IconBellRinging style={{ width: '90%', height: '90%' }} stroke={2} />
          </ActionIcon>
        </Indicator>
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
