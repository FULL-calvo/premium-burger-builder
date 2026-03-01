import { useState } from 'react';
import { Plus, Pencil, Trash2, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAdminStore, AdminMenuItem } from '@/hooks/useAdminStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Props {
  adminStore: ReturnType<typeof useAdminStore>;
}

type FormData = {
  name: string;
  description: string;
  price: string;
  category: 'burgers' | 'sides' | 'drinks';
  image: string;
};

const emptyForm: FormData = { name: '', description: '', price: '', category: 'burgers', image: '' };

const MenuManagement = ({ adminStore }: Props) => {
  const { menu, addMenuItem, updateMenuItem, removeMenuItem, toggleMenuItem } = adminStore;
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = menu.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || i.category === filterCat;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: AdminMenuItem) => {
    setEditingId(item.id);
    setForm({ name: item.name, description: item.description, price: String(item.price), category: item.category, image: item.image });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const price = parseFloat(form.price);
    if (isNaN(price)) return;

    if (editingId) {
      updateMenuItem(editingId, { name: form.name, description: form.description, price, category: form.category, image: form.image });
      toast({ title: 'Item atualizado!', description: form.name });
    } else {
      addMenuItem({ name: form.name, description: form.description, price, category: form.category, image: form.image });
      toast({ title: 'Item adicionado!', description: form.name });
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    removeMenuItem(deleteId);
    toast({ title: 'Item removido!', variant: 'destructive' });
    setDeleteId(null);
  };

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'burgers', label: 'Hambúrgueres' },
    { value: 'sides', label: 'Acompanhamentos' },
    { value: 'drinks', label: 'Bebidas' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <Input
          placeholder="Buscar item..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c.value}
              onClick={() => setFilterCat(c.value)}
              className={cn(
                'text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
                filterCat === c.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {c.label}
            </button>
          ))}
          <Button size="sm" onClick={openAdd} className="gap-1">
            <Plus className="w-4 h-4" /> Novo Item
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left bg-muted/30">
                <th className="p-3">Imagem</th>
                <th className="p-3">Nome</th>
                <th className="p-3 hidden md:table-cell">Categoria</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="p-3">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  </td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground capitalize">
                    {item.category === 'burgers' ? 'Hambúrguer' : item.category === 'sides' ? 'Acompanhamento' : 'Bebida'}
                  </td>
                  <td className="p-3 text-foreground font-medium">R$ {item.price.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={cn(
                      'text-xs font-semibold px-2 py-1 rounded-full',
                      item.active ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'
                    )}>
                      {item.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => toggleMenuItem(item.id)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Ativar/Desativar">
                        <Power className={cn('w-4 h-4', item.active ? 'text-green-400' : 'text-muted-foreground')} />
                      </button>
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Editar">
                        <Pencil className="w-4 h-4 text-primary" />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Remover">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">Nenhum item encontrado.</p>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Item' : 'Novo Item'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Nome</label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Descrição</label>
              <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Preço (R$)</label>
                <Input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Categoria</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value as any })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="burgers">Hambúrguer</option>
                  <option value="sides">Acompanhamento</option>
                  <option value="drinks">Bebida</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">URL da Imagem</label>
              <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>{editingId ? 'Salvar' : 'Adicionar'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Tem certeza que deseja remover este item do cardápio?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Remover</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuManagement;
