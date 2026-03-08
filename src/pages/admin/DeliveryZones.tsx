import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/hooks/useAdminStore';
import { useToast } from '@/hooks/use-toast';

interface Props {
  adminStore: ReturnType<typeof useAdminStore>;
}

const DeliveryZones = ({ adminStore }: Props) => {
  const { deliveryZones, addDeliveryZone, updateDeliveryZone, removeDeliveryZone } = adminStore;
  const { toast } = useToast();
  const [newName, setNewName] = useState('');
  const [newFee, setNewFee] = useState('');

  const handleAdd = () => {
    if (!newName.trim() || !newFee) return;
    addDeliveryZone({ name: newName.trim(), fee: parseFloat(newFee) || 0 });
    setNewName('');
    setNewFee('');
    toast({ title: 'Região adicionada!' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-foreground">Taxas de Entrega por Região</h2>
        <p className="text-xs text-muted-foreground">
          Defina as regiões de entrega e o valor cobrado por cada uma. O cliente selecionará a região no checkout.
        </p>

        <div className="space-y-3">
          {deliveryZones.map(zone => (
            <div key={zone.id} className="flex items-center gap-3 bg-background border border-border rounded-lg p-3">
              <Input
                value={zone.name}
                onChange={e => updateDeliveryZone(zone.id, { name: e.target.value })}
                className="flex-1"
                placeholder="Nome da região"
              />
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">R$</span>
                <Input
                  type="number"
                  value={zone.fee}
                  onChange={e => updateDeliveryZone(zone.id, { fee: parseFloat(e.target.value) || 0 })}
                  className="w-24"
                  step="0.50"
                  min="0"
                />
              </div>
              <button
                onClick={() => {
                  removeDeliveryZone(zone.id);
                  toast({ title: 'Região removida.' });
                }}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new zone */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Nova região..."
            className="flex-1"
          />
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">R$</span>
            <Input
              type="number"
              value={newFee}
              onChange={e => setNewFee(e.target.value)}
              placeholder="0.00"
              className="w-24"
              step="0.50"
              min="0"
            />
          </div>
          <Button onClick={handleAdd} size="sm" disabled={!newName.trim() || !newFee}>
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </Button>
        </div>
      </div>

      <Button
        onClick={() => toast({ title: 'Alterações salvas com sucesso!' })}
        className="w-full sm:w-auto"
      >
        <Save className="w-4 h-4 mr-2" /> Salvar Alterações
      </Button>
    </div>
  );
};

export default DeliveryZones;
