import { Plus } from 'lucide-react';
import { MenuItem } from '@/data/menuData';

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

const MenuCard = ({ item, onAdd }: MenuCardProps) => {
  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-extrabold text-primary">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={() => onAdd(item)}
            className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:brightness-110 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
