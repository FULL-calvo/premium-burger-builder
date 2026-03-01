import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-extrabold tracking-tight">
          <span className="text-gradient-gold">GRILL POINT</span>{' '}
          <span className="text-foreground">BURGERS</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#menu" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Cardápio</a>
          <a href="#about" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Sobre</a>
          <a href="#contact" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Contato</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in">
          <a href="#menu" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-muted-foreground hover:text-primary">Cardápio</a>
          <a href="#about" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-muted-foreground hover:text-primary">Sobre</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-muted-foreground hover:text-primary">Contato</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
