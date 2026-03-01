import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { menuItems, MenuItem } from '@/data/menuData';
import MenuCard from './MenuCard';

interface MenuSectionProps {
  onAddItem: (item: MenuItem) => void;
}

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'burgers', label: '🍔 Hambúrgueres' },
  { key: 'sides', label: '🍟 Acompanhamentos' },
  { key: 'drinks', label: '🥤 Bebidas' },
] as const;

const MenuSection = ({ onAddItem }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <section id="menu" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-2">
          Nosso <span className="text-gradient-gold">Cardápio</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10">Escolha seus favoritos e monte seu pedido</p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar no cardápio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Nenhum item encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <MenuCard key={item.id} item={item} onAdd={onAddItem} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
