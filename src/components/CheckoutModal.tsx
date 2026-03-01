import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { CartItem } from '@/hooks/useCart';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderSent: () => void;
}

const CheckoutModal = ({ open, onClose, items, total, onOrderSent }: CheckoutModalProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSend = () => {
    if (!name.trim() || !address.trim()) return;

    const itemsText = items
      .map(i => `▸ ${i.quantity}x ${i.name} — R$ ${(i.price * i.quantity).toFixed(2).replace('.', ',')}`)
      .join('\n');

    const message = `🔥 *Novo Pedido - Grill Point Burgers*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📍 *Endereço:* ${address}\n\n` +
      `📋 *Itens:*\n${itemsText}\n\n` +
      `💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

    // ALTERE O NÚMERO ABAIXO PARA O NÚMERO DA HAMBURGUERIA
    const phone = '5511999999999';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setAddress('');
      onOrderSent();
      onClose();
    }, 3000);
  };

  if (sent) {
    return (
      <>
        <div className="fixed inset-0 bg-black/70 z-50" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-8 max-w-sm w-full text-center animate-fade-in border border-border">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Pedido enviado!</h3>
            <p className="text-muted-foreground">Logo seu pedido chegará. 🍔</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-6 max-w-md w-full animate-fade-in border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Finalizar Pedido</h3>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Seu nome</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Endereço de entrega</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Rua, número, bairro..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-extrabold text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <button
                onClick={handleSend}
                disabled={!name.trim() || !address.trim()}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar pelo WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
