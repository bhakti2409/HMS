import { IconHeartbeat } from '@tabler/icons-react';
import { Text, Avatar, Badge } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { getLoggedInUser } from '../../utils/auth';
import { useHospital } from '../../context/HospitalContext';

const roleLabel = { ADMIN: 'Admin', DOCTOR: 'Doctor', PATIENT: 'Patient' };

// links  -> list of sidebar links for the current role (props)
// collapsed -> true when the user presses the collapse button in the Header
const Sidebar = ({ links, collapsed }) => {
  const user = getLoggedInUser();
  const { state } = useHospital();

  // total quantity in the cart (shown as a badge on the Cart link)
  const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} shrink-0 bg-red-200 flex flex-col gap-7 items-center pt-3 transition-all duration-200 overflow-y-auto`}>
      {/* Logo */}
      <div className="text-red-500 flex gap-1 items-center">
        <IconHeartbeat size={40} stroke={2.5} />
        {!collapsed && <span className="font-heading font-semibold text-3xl">Pulse</span>}
      </div>

      {/* Profile */}
      <div className="flex flex-col gap-1 items-center">
        <div className="p-1 bg-white rounded-full shadow-lg">
          <Avatar variant="filled" name={user?.name} color="initials" size={collapsed ? 'md' : 'xl'} />
        </div>
        {!collapsed && (
          <>
            <span className="font-medium text-center px-2">{user?.name}</span>
            <Text c="dimmed" size="xs">
              {roleLabel[user?.role]}
            </Text>
          </>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-1 w-full px-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              to={link.url}
              key={link.url}
              title={link.name}
              className={({ isActive }) =>
                `flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full font-medium text-neutral-900 py-3 px-3 rounded-lg ${
                  isActive ? 'bg-primary-400' : 'hover:bg-gray-100'
                }`
              }
            >
              <Icon stroke={1.5} />
              {!collapsed && <span>{link.name}</span>}
              {!collapsed && link.name === 'Cart' && cartCount > 0 && (
                <Badge size="sm" circle color="red" className="ml-auto">
                  {cartCount}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
