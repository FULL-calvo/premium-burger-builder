import { useState, useCallback } from 'react';
import { menuItems as initialMenu, MenuItem } from '@/data/menuData';
import {
  defaultStoreSettings, StoreSettings,
  mockOrders, Order, OrderStatus,
  mockUsers, AdminUser, UserRole,
} from '@/data/adminData';

// Extend MenuItem for admin (active flag)
export interface AdminMenuItem extends MenuItem {
  active: boolean;
}

export function useAdminStore() {
  // Menu
  const [menu, setMenu] = useState<AdminMenuItem[]>(
    initialMenu.map(i => ({ ...i, active: true }))
  );

  const addMenuItem = useCallback((item: Omit<AdminMenuItem, 'id' | 'active'>) => {
    const id = `custom-${Date.now()}`;
    setMenu(prev => [...prev, { ...item, id, active: true } as AdminMenuItem]);
  }, []);

  const updateMenuItem = useCallback((id: string, data: Partial<AdminMenuItem>) => {
    setMenu(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  }, []);

  const removeMenuItem = useCallback((id: string) => {
    setMenu(prev => prev.filter(i => i.id !== id));
  }, []);

  const toggleMenuItem = useCallback((id: string) => {
    setMenu(prev => prev.map(i => i.id === id ? { ...i, active: !i.active } : i));
  }, []);

  // Store settings
  const [store, setStore] = useState<StoreSettings>(defaultStoreSettings);

  const updateStore = useCallback((data: Partial<StoreSettings>) => {
    setStore(prev => ({ ...prev, ...data }));
  }, []);

  // Orders
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  // Users
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);

  const addUser = useCallback((user: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const id = `u-${Date.now()}`;
    setUsers(prev => [...prev, { ...user, id, createdAt: new Date().toISOString().slice(0, 10) }]);
  }, []);

  const updateUser = useCallback((id: string, data: Partial<AdminUser>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
  }, []);

  const removeUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  // Theme
  const [darkMode, setDarkMode] = useState(true);

  // Reset demo
  const resetDemo = useCallback(() => {
    setMenu(initialMenu.map(i => ({ ...i, active: true })));
    setStore(defaultStoreSettings);
    setOrders(mockOrders);
    setUsers(mockUsers);
  }, []);

  return {
    menu, addMenuItem, updateMenuItem, removeMenuItem, toggleMenuItem,
    store, updateStore,
    orders, updateOrderStatus,
    users, addUser, updateUser, removeUser,
    darkMode, setDarkMode,
    resetDemo,
  };
}
