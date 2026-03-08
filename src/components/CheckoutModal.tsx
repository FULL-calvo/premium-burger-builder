import { useState, useMemo } from 'react';
import { X, CheckCircle, MapPin } from 'lucide-react';
import { CartItem } from '@/hooks/useCart';
import { DeliveryZone, defaultDeliveryZones } from '@/data/adminData';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderSent: () => void;
  deliveryZones?: DeliveryZone[];
}

const CheckoutModal = ({ open, onClose, items, total, onOrderSent, deliveryZones }: CheckoutModalProps) => {
  const zones = deliveryZones ?? defaultDeliveryZones;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [sent, setSent] = useState(false);

  const currentZone = useMemo(() => zones.find(z => z.id === selectedZone), [zones, selectedZone]);
  const deliveryFee = currentZone?.fee ?? 0;
  const grandTotal = total + deliveryFee;

  if (!open) return null;

  const handleSend = () => {
    if (!name.trim() || !address.trim() || !selectedZone) return;

    const itemsText = items
      .map(i => `▸ ${i.quantity}x ${i.name} — R$ ${(i.price * i.quantity).toFixed(2).replace('.', ',')}`)
      .join('\n');

    const message = `🔥 *Novo Pedido - Grill Point Burgers*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📍 *Endereço:* ${address}\n` +
      `📍 *Região:* ${currentZone?.name}\n\n` +
      `📋 *Itens:*\n${itemsText}\n\n` +
      `🛵 *Taxa de entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n` +
      `💰 *Total: R$ ${grandTotal.toFixed(2).replace('.', ',')}*`;

    const phone = '5511999999999';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setAddress('');
      setSelectedZone('');
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
        <div className="bg-card rounded-2xl p-6 max-w-md w-full animate-fade-in border border-border max-h-[90vh] overflow-y-auto">
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
              <label className="block text-sm font-semibold text-foreground mb-1">Região de entrega</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedZone}
                  onChange={e => setSelectedZone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                >
                  <option value="">Selecione sua região...</option>
                  {zones.map(z => (
                    <option key={z.id} value={z.id}>
                      {z.name} — R$ {z.fee.toFixed(2).replace('.', ',')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Endereço completo</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Rua, número, complemento..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="pt-2 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa de entrega</span>
                <span className={`font-medium ${selectedZone ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {selectedZone ? `R$ ${deliveryFee.toFixed(2).replace('.', ',')}` : 'Selecione a região'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-extrabold text-primary">
                  R$ {grandTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <button
                onClick={handleSend}
                disabled={!name.trim() || !address.trim() || !selectedZone}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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
