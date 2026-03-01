import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/hooks/useAdminStore';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, Bell, Download, RotateCcw } from 'lucide-react';

interface Props {
  adminStore: ReturnType<typeof useAdminStore>;
}

const SettingsPage = ({ adminStore }: Props) => {
  const { darkMode, setDarkMode, resetDemo } = adminStore;
  const { toast } = useToast();

  const handleBackup = () => {
    toast({ title: 'Backup realizado!', description: 'Dados exportados com sucesso (simulação).' });
  };

  const handleReset = () => {
    resetDemo();
    toast({ title: 'Sistema resetado!', description: 'Todos os dados voltaram ao padrão de demonstração.' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Theme */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-sm font-bold text-foreground mb-4">Aparência</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              darkMode ? 'bg-primary/15 text-primary border border-primary/30' : 'bg-muted text-muted-foreground'
            }`}
          >
            <Moon className="w-4 h-4" /> Escuro
          </button>
          <button
            onClick={() => setDarkMode(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              !darkMode ? 'bg-primary/15 text-primary border border-primary/30' : 'bg-muted text-muted-foreground'
            }`}
          >
            <Sun className="w-4 h-4" /> Claro
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Nota: Nesta simulação o tema visual permanece escuro.</p>
      </div>

      {/* Notifications */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4" /> Notificações
        </h2>
        <div className="space-y-3">
          {['Novo pedido recebido', 'Pedido cancelado', 'Estoque baixo', 'Avaliação do cliente'].map(n => (
            <label key={n} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary rounded" />
              <span className="text-sm text-foreground">{n}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-foreground">Sistema</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleBackup} className="gap-2">
            <Download className="w-4 h-4" /> Backup dos Dados
          </Button>
          <Button variant="destructive" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" /> Resetar Sistema (Demo)
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">O reset volta todos os dados para o estado original de demonstração.</p>
      </div>
    </div>
  );
};

export default SettingsPage;
