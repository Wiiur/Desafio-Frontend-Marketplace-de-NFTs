// src/components/BottomNav.tsx
import { Link, useLocation } from '@tanstack/react-router';
import { Home, Heart, ShoppingCart, User, Maximize } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function BottomNav() {
  const { items } = useCart();
  // Hook do TanStack Router para saber em que página estamos e mudar a cor do ícone
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
      {/* Fundo da barra inferior com cantos arredondados no topo */}
      <div className="bg-[#140D0A] border-t border-[#38220F]/50 rounded-t-[32px] px-6 py-4 flex justify-between items-center relative shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        
        {/* Ícone Início */}
        <Link to="/" className={`p-2 transition-colors ${currentPath === '/' ? 'text-[#D28A4C]' : 'text-muted hover:text-[#D28A4C]'}`}>
          <Home className="h-6 w-6" strokeWidth={currentPath === '/' ? 2.5 : 2} />
        </Link>

        {/* Ícone Favoritos */}
        <Link to="/perfil" className={`p-2 transition-colors ${currentPath === '/favoritos' ? 'text-[#D28A4C]' : 'text-muted hover:text-[#D28A4C]'}`}>
          <Heart className="h-6 w-6" strokeWidth={2} />
        </Link>

        {/* Botão Central Flutuante (Scanner/Foco) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-6">
          <button className="bg-[#D28A4C] text-[#140D0A] h-14 w-14 rounded-full flex items-center justify-center shadow-lg border-[4px] border-[#0a0604] hover:scale-105 transition-transform">
            <Maximize className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Ícone Carrinho com Badge */}
        <Link to="/carrinho" className={`p-2 relative transition-colors ml-8 ${currentPath === '/carrinho' ? 'text-[#D28A4C]' : 'text-muted hover:text-[#D28A4C]'}`}>
          <ShoppingCart className="h-6 w-6" strokeWidth={currentPath === '/carrinho' ? 2.5 : 2} />
          {items.length > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#D28A4C] text-[8px] font-bold text-[#140D0A]">
              {items.length}
            </span>
          )}
        </Link>

        {/* Ícone Perfil */}
        <Link to="/perfil" className={`p-2 transition-colors ${currentPath === '/perfil' ? 'text-[#D28A4C]' : 'text-muted hover:text-[#D28A4C]'}`}>
          <User className="h-6 w-6" strokeWidth={currentPath === '/perfil' ? 2.5 : 2} />
        </Link>

      </div>
    </div>
  );
}