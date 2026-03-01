import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/hooks/useCart';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer = ({ open, onClose, items, total, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border z-50 animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Seu Pedido</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Seu carrinho está vazio</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 bg-card rounded-lg p-3 border border-border">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-foreground truncate">{item.name}</h4>
                  <p className="text-primary font-bold text-sm mt-1">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-2xl font-extrabold text-primary">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:brightness-110 transition-all hover:scale-[1.02]"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
