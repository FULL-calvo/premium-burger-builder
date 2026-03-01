import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useAdminStore } from '@/hooks/useAdminStore';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/data/adminData';

interface Props {
  adminStore: ReturnType<typeof useAdminStore>;
}

const UsersManagement = ({ adminStore }: Props) => {
  const { users, addUser, updateUser, removeUser } = adminStore;
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'employee' as UserRole, password: '' });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => { setEditingId(null); setForm({ name: '', email: '', role: 'employee', password: '' }); setDialogOpen(true); };
  const openEdit = (u: typeof users[0]) => { setEditingId(u.id); setForm({ name: u.name, email: u.email, role: u.role, password: '' }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (editingId) {
      updateUser(editingId, { name: form.name, email: form.email, role: form.role });
      toast({ title: 'Usuário atualizado!' });
    } else {
      addUser({ name: form.name, email: form.email, role: form.role });
      toast({ title: 'Usuário criado!' });
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    removeUser(deleteId);
    toast({ title: 'Usuário removido!', variant: 'destructive' });
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{users.length} usuário(s)</p>
        <Button size="sm" onClick={openAdd} className="gap-1"><Plus className="w-4 h-4" /> Novo Usuário</Button>
      </div>

      <div className="space-y-3">
        {users.map(u => (
          <div key={u.id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">{u.name}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
              {u.role === 'admin' ? 'Administrador' : 'Funcionário'}
            </span>
            <div className="flex gap-1">
              <button onClick={() => openEdit(u)} className="p-2 rounded-lg hover:bg-muted transition-colors"><Pencil className="w-4 h-4 text-primary" /></button>
              <button onClick={() => setDeleteId(u.id)} className="p-2 rounded-lg hover:bg-muted transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>{editingId ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-xs font-medium text-muted-foreground">Nome</label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Email</label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Senha</label><Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder={editingId ? 'Deixe vazio para manter' : ''} /></div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Nível de Acesso</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as UserRole })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="admin">Administrador</option>
                <option value="employee">Funcionário</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>{editingId ? 'Salvar' : 'Criar'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Remover este usuário?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Remover</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManagement;
