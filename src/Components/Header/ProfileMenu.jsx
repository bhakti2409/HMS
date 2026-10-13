import { Menu, Text, Avatar } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, logoutUser } from '../../utils/auth';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser(); // read from localStorage

  const handleLogout = () => {
    logoutUser(); // localStorage.removeItem("loggedInUser")
    navigate('/login');
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="font-medium text-lg text-neutral">{user?.name}</span>
          <Avatar name={user?.name} color="initials" size={44} />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Signed in as</Menu.Label>
        <Menu.Item leftSection={<IconUser size={14} />}>
          <Text size="sm">{user?.email}</Text>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
