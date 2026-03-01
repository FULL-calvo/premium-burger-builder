import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, UtensilsCrossed, Store, ClipboardList,
  Users, Settings, ChevronLeft, ChevronRight, LogOut, Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/hooks/useAdminStore';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Cardápio', icon: UtensilsCrossed, path: '/admin/menu' },
  { label: 'Loja', icon: Store, path: '/admin/store' },
  { label: 'Pedidos', icon: ClipboardList, path: '/admin/orders' },
  { label: 'Usuários', icon: Users, path: '/admin/users' },
  { label: 'Configurações', icon: Settings, path: '/admin/settings' },
];

interface Props {
  adminStore: ReturnType<typeof useAdminStore>;
}

const AdminLayout = ({ adminStore }: Props) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-card border-r border-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {!collapsed && (
          <span className="text-sm font-bold text-gradient-gold truncate">GRILL POINT</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Voltar ao Site</span>}
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {sidebar}

      {/* Main */}
      <div className={cn('transition-all duration-300', collapsed ? 'md:ml-16' : 'md:ml-60')}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center h-16 px-4 bg-background/95 backdrop-blur-md border-b border-border gap-4">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground truncate">
            {navItems.find(i => i.path === location.pathname)?.label ?? 'Admin'}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <span className={cn(
              'text-xs font-semibold px-2 py-1 rounded-full',
              adminStore.store.isOpen
                ? 'bg-green-500/20 text-green-400'
                : 'bg-destructive/20 text-destructive'
            )}>
              {adminStore.store.isOpen ? 'Aberta' : 'Fechada'}
            </span>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
