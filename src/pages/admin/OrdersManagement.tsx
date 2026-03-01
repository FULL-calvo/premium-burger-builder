import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAdminStore } from '@/hooks/useAdminStore';
import { Order, OrderStatus } from '@/data/adminData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Props {
  adminStore: ReturnType<typeof useAdminStore>;
}

const statusFlow: OrderStatus[] = ['received', 'preparing', 'delivering', 'done'];
const statusLabels: Record<OrderStatus, { label: string; cls: string }> = {
  received: { label: 'Recebido', cls: 'bg-blue-500/20 text-blue-400' },
  preparing: { label: 'Em Preparo', cls: 'bg-yellow-500/20 text-yellow-400' },
  delivering: { label: 'Saiu p/ Entrega', cls: 'bg-purple-500/20 text-purple-400' },
  done: { label: 'Finalizado', cls: 'bg-green-500/20 text-green-400' },
};

const OrdersManagement = ({ adminStore }: Props) => {
  const { orders, updateOrderStatus } = adminStore;
  const { toast } = useToast();
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  const nextStatus = (current: OrderStatus): OrderStatus | null => {
    const idx = statusFlow.indexOf(current);
    return idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
  };

  const advance = (order: Order) => {
    const next = nextStatus(order.status);
    if (!next) return;
    updateOrderStatus(order.id, next);
    toast({ title: `${order.id} → ${statusLabels[next].label}` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {[{ value: 'all', label: 'Todos' }, ...statusFlow.map(s => ({ value: s, label: statusLabels[s].label }))].map(f => (
          <button
            key={f.value}
            onClick={() => setFilterStatus(f.value)}
            className={cn(
              'text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
              filterStatus === f.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map(order => (
          <div key={order.id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-foreground text-sm">{order.id}</span>
                <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', statusLabels[order.status].cls)}>
                  {statusLabels[order.status].label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{order.customer} • {order.items.length} item(ns) • R$ {order.total.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setDetailOrder(order)} className="gap-1">
                <Eye className="w-3.5 h-3.5" /> Ver
              </Button>
              {nextStatus(order.status) && (
                <Button size="sm" onClick={() => advance(order)}>
                  → {statusLabels[nextStatus(order.status)!].label}
                </Button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">Nenhum pedido encontrado.</p>}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!detailOrder} onOpenChange={() => setDetailOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pedido {detailOrder?.id}</DialogTitle>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Cliente</p>
                <p className="font-semibold text-foreground">{detailOrder.customer}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Endereço</p>
                <p className="font-semibold text-foreground">{detailOrder.address}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Itens</p>
                {detailOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-border/50 last:border-0">
                    <span className="text-foreground">{it.quantity}x {it.name}</span>
                    <span className="text-foreground">R$ {(it.quantity * it.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border">
                <span>Total</span>
                <span>R$ {detailOrder.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersManagement;
