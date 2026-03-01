import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from './Dashboard';
import MenuManagement from './MenuManagement';
import StoreManagement from './StoreManagement';
import OrdersManagement from './OrdersManagement';
import UsersManagement from './UsersManagement';
import SettingsPage from './SettingsPage';
import { useAdminStore } from '@/hooks/useAdminStore';

const AdminWrapper = () => {
  const adminStore = useAdminStore();

  return (
    <Routes>
      <Route element={<AdminLayout adminStore={adminStore} />}>
        <Route index element={<Dashboard adminStore={adminStore} />} />
        <Route path="menu" element={<MenuManagement adminStore={adminStore} />} />
        <Route path="store" element={<StoreManagement adminStore={adminStore} />} />
        <Route path="orders" element={<OrdersManagement adminStore={adminStore} />} />
        <Route path="users" element={<UsersManagement adminStore={adminStore} />} />
        <Route path="settings" element={<SettingsPage adminStore={adminStore} />} />
      </Route>
    </Routes>
  );
};

export default AdminWrapper;
