import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';

// Common shell for every role: Sidebar + Header + <Outlet/> (the page that matches the URL)
const DashboardLayout = ({ links }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar links={links} collapsed={collapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header collapsed={collapsed} onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
