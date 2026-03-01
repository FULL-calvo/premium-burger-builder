import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <footer id="contact" className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-extrabold mb-3">
              <span className="text-gradient-gold">GRILL POINT</span> BURGERS
            </h3>
            <p className="text-sm text-muted-foreground" id="about">
              Hambúrgueres clássicos com sabor marcante, ótimo custo-benefício e agilidade — no salão ou no delivery.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-foreground">Horário</h4>
            <p className="text-sm text-muted-foreground">Terça a Domingo</p>
            <p className="text-sm text-muted-foreground">18h às 23h</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-foreground">Contato</h4>
            <p className="text-sm text-muted-foreground">📱 (11) 99999-9999</p>
            <p className="text-sm text-muted-foreground">📍 Sua cidade, seu bairro</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Grill Point Burgers. Todos os direitos reservados.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            Entrar no Painel ADM
          </button>
        </div>
      </div>

      {/* Admin confirmation modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" /> Área Administrativa
            </DialogTitle>
          </DialogHeader>
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Atenção:</strong> Esta área não é visível para clientes. Este painel é apenas uma{' '}
              <span className="text-primary font-semibold">simulação</span> para demonstrar como seria a experiência do dono gerenciando a loja.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button onClick={() => { setShowModal(false); navigate('/admin'); }}>Continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
