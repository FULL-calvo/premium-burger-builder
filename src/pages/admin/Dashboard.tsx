import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, ShoppingBag, DollarSign, Clock } from 'lucide-react';
import { useAdminStore } from '@/hooks/useAdminStore';
import { salesChartData } from '@/data/adminData';

interface Props {
  adminStore: ReturnType<typeof useAdminStore>;
}

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
    </div>
  </div>
);

const Dashboard = ({ adminStore }: Props) => {
  const { menu, orders, store } = adminStore;
  const activeItems = menu.filter(i => i.active).length;
  const todayOrders = orders.length;
  const todayRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status !== 'done').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Itens no Cardápio" value={`${activeItems}`} color="bg-primary/15 text-primary" />
        <StatCard icon={ShoppingBag} label="Pedidos Hoje" value={`${todayOrders}`} color="bg-secondary/15 text-secondary" />
        <StatCard icon={DollarSign} label="Faturamento Hoje" value={`R$ ${todayRevenue.toFixed(2)}`} color="bg-green-500/15 text-green-400" />
        <StatCard icon={Clock} label="Pedidos Pendentes" value={`${pendingOrders}`} color="bg-yellow-500/15 text-yellow-400" />
      </div>

      {/* Store info row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground font-medium mb-1">Status</p>
          <span className={`text-sm font-bold ${store.isOpen ? 'text-green-400' : 'text-destructive'}`}>
            {store.isOpen ? '🟢 Aberta' : '🔴 Fechada'}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground font-medium mb-1">Horário</p>
          <p className="text-sm font-bold text-foreground">{store.openTime} – {store.closeTime}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground font-medium mb-1">Entrega</p>
          <p className="text-sm font-bold text-foreground">{store.estimatedDelivery} • R$ {store.deliveryFee.toFixed(2)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-sm font-bold text-foreground mb-4">Vendas da Semana (Simulado)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesChartData}>
              <XAxis dataKey="day" stroke="hsl(40,10%,60%)" fontSize={12} />
              <YAxis stroke="hsl(40,10%,60%)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: 'hsl(0,0%,11%)', border: '1px solid hsl(0,0%,20%)', borderRadius: 8, color: 'hsl(40,20%,92%)' }}
              />
              <Bar dataKey="vendas" fill="hsl(43,80%,55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-sm font-bold text-foreground mb-4">Pedidos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-2 pr-4">Pedido</th>
                <th className="pb-2 pr-4">Cliente</th>
                <th className="pb-2 pr-4">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 pr-4 font-medium text-foreground">{o.id}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{o.customer}</td>
                  <td className="py-3 pr-4 text-foreground">R$ {o.total.toFixed(2)}</td>
                  <td className="py-3">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const statusLabels: Record<string, { label: string; cls: string }> = {
  received: { label: 'Recebido', cls: 'bg-blue-500/20 text-blue-400' },
  preparing: { label: 'Em Preparo', cls: 'bg-yellow-500/20 text-yellow-400' },
  delivering: { label: 'Saiu p/ Entrega', cls: 'bg-purple-500/20 text-purple-400' },
  done: { label: 'Finalizado', cls: 'bg-green-500/20 text-green-400' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const s = statusLabels[status] ?? { label: status, cls: '' };
  return <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.cls}`}>{s.label}</span>;
};

export default Dashboard;
