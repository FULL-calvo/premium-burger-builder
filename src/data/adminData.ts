import { menuItems, MenuItem } from './menuData';

// ── Store Settings ──
export interface StoreSettings {
  name: string;
  description: string;
  address: string;
  phone: string;
  instagram: string;
  openTime: string;
  closeTime: string;
  deliveryFee: number;
  estimatedDelivery: string;
  isOpen: boolean;
  logo: string;
}

export const defaultStoreSettings: StoreSettings = {
  name: 'Grill Point Burgers',
  description: 'Hamburgueria moderna especializada em hambúrgueres clássicos e saborosos com ingredientes selecionados.',
  address: 'Av. Paulista, 1000 - São Paulo, SP',
  phone: '(11) 99999-9999',
  instagram: '@grillpointburgers',
  openTime: '11:00',
  closeTime: '23:00',
  deliveryFee: 6.90,
  estimatedDelivery: '30-45 min',
  isOpen: true,
  logo: '',
};

// ── Orders ──
export type OrderStatus = 'received' | 'preparing' | 'delivering' | 'done';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export const mockOrders: Order[] = [
  { id: 'PED-001', customer: 'Lucas Silva', address: 'Rua Augusta, 200', items: [{ name: 'Grill Classic', quantity: 2, price: 28.9 }, { name: 'Batata Frita Clássica', quantity: 1, price: 16.9 }], total: 74.7, status: 'received', createdAt: '2026-03-01T12:30:00' },
  { id: 'PED-002', customer: 'Maria Oliveira', address: 'Rua Oscar Freire, 450', items: [{ name: 'Bacon Beast', quantity: 1, price: 35.9 }, { name: 'Coca-Cola 350ml', quantity: 2, price: 7.9 }], total: 51.7, status: 'preparing', createdAt: '2026-03-01T12:45:00' },
  { id: 'PED-003', customer: 'Pedro Santos', address: 'Al. Santos, 1200', items: [{ name: 'Triple Point', quantity: 1, price: 42.9 }, { name: 'Onion Rings', quantity: 1, price: 18.9 }, { name: 'Cerveja IPA 473ml', quantity: 1, price: 18.9 }], total: 80.7, status: 'delivering', createdAt: '2026-03-01T11:15:00' },
  { id: 'PED-004', customer: 'Ana Costa', address: 'Rua Haddock Lobo, 80', items: [{ name: 'Double Smash', quantity: 3, price: 32.9 }], total: 98.7, status: 'done', createdAt: '2026-03-01T10:00:00' },
  { id: 'PED-005', customer: 'Carlos Mendes', address: 'Rua Frei Caneca, 300', items: [{ name: 'Picanha Burger', quantity: 1, price: 39.9 }, { name: 'Mac & Cheese', quantity: 1, price: 21.9 }, { name: 'Milkshake Ovomaltine', quantity: 1, price: 19.9 }], total: 81.7, status: 'received', createdAt: '2026-03-01T13:00:00' },
  { id: 'PED-006', customer: 'Fernanda Lima', address: 'Rua Consolação, 600', items: [{ name: 'Veggie Grill', quantity: 2, price: 29.9 }, { name: 'Suco Detox', quantity: 2, price: 14.9 }], total: 89.6, status: 'done', createdAt: '2026-03-01T09:30:00' },
];

// ── Users ──
export type UserRole = 'admin' | 'employee';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export const mockUsers: AdminUser[] = [
  { id: 'u1', name: 'João Admin', email: 'joao@grillpoint.com', role: 'admin', createdAt: '2025-01-15' },
  { id: 'u2', name: 'Maria Caixa', email: 'maria@grillpoint.com', role: 'employee', createdAt: '2025-06-20' },
  { id: 'u3', name: 'Pedro Cozinha', email: 'pedro@grillpoint.com', role: 'employee', createdAt: '2025-09-10' },
];

// ── Sales chart data ──
export const salesChartData = [
  { day: 'Seg', vendas: 1250 },
  { day: 'Ter', vendas: 980 },
  { day: 'Qua', vendas: 1480 },
  { day: 'Qui', vendas: 1120 },
  { day: 'Sex', vendas: 2100 },
  { day: 'Sáb', vendas: 2650 },
  { day: 'Dom', vendas: 1800 },
];
