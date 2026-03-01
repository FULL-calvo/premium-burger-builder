import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/hooks/useAdminStore';
import { useToast } from '@/hooks/use-toast';
import { StoreSettings } from '@/data/adminData';

interface Props {
  adminStore: ReturnType<typeof useAdminStore>;
}

const StoreManagement = ({ adminStore }: Props) => {
  const { store, updateStore } = adminStore;
  const { toast } = useToast();
  const [form, setForm] = useState<StoreSettings>(store);

  useEffect(() => { setForm(store); }, [store]);

  const handleSave = () => {
    updateStore(form);
    toast({ title: 'Dados da loja atualizados!' });
  };

  const Field = ({ label, name, type = 'text' }: { label: string; name: keyof StoreSettings; type?: string }) => (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Input
        type={type}
        value={String(form[name])}
        onChange={e => {
          const val = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
          setForm({ ...form, [name]: val });
        }}
      />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-bold text-foreground">Informações da Loja</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nome da Loja" name="name" />
          <Field label="Telefone" name="phone" />
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">Descrição</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <Field label="Endereço" name="address" />
          <Field label="Instagram" name="instagram" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-bold text-foreground">Funcionamento e Entrega</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Abertura" name="openTime" type="time" />
          <Field label="Fechamento" name="closeTime" type="time" />
          <Field label="Taxa de Entrega (R$)" name="deliveryFee" type="number" />
          <Field label="Tempo Estimado" name="estimatedDelivery" />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-muted-foreground">Status da Loja:</label>
          <button
            onClick={() => setForm({ ...form, isOpen: !form.isOpen })}
            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
              form.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-destructive/20 text-destructive'
            }`}
          >
            {form.isOpen ? '🟢 Aberta' : '🔴 Fechada'}
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-bold text-foreground">Logo da Empresa</h2>
        <Field label="URL da Logo" name="logo" />
        {form.logo && <img src={form.logo} alt="Logo" className="w-20 h-20 rounded-lg object-cover" />}
      </div>

      <Button onClick={handleSave} className="w-full sm:w-auto">Salvar Alterações</Button>
    </div>
  );
};

export default StoreManagement;
