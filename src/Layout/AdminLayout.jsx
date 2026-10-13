import DashboardLayout from './DashboardLayout';
import { adminLinks } from '../Components/Sidebar/sidebarLinks';

// Admin pages use the admin sidebar
const AdminLayout = () => <DashboardLayout links={adminLinks} />;

export default AdminLayout;
