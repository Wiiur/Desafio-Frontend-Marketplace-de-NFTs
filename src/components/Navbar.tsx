// src/components/Navbar.tsx
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ShoppingCart, Search, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { items } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-[#D28A4C] border-surface bg-[#140D0A] font-mono sticky top-0 z-40">
      <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between h-20">
        
        {/* LOGO */}
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl tracking-widest text-foreground">
            KURIO
          </Link>
        </div>

        {/* NAVEGAÇÃO DESKTOP (Escondida em Mobile) */}
        <nav className="hidden md:flex items-center h-full gap-8 text-sm absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-primary h-full flex items-center border-b-2 border-primary font-bold pt-[2px]">
            Início
          </Link>
          <Link to="/mercado" className="text-muted hover:text-foreground h-full flex items-center transition-colors pt-[2px] border-b-2 border-transparent">
            Mercado
          </Link>
          <Link to="/criadores" className="text-muted hover:text-foreground h-full flex items-center transition-colors pt-[2px] border-b-2 border-transparent">
            Criadores
          </Link>
          <Link to="/aprenda" className="text-muted hover:text-foreground h-full flex items-center transition-colors pt-[2px] border-b-2 border-transparent">
            Aprenda
          </Link>
        </nav>

        {/* ÍCONES DA DIREITA (Desktop & Mobile) */}
        <div className="flex items-center gap-4 lg:gap-6 text-sm">
          <button aria-label="Pesquisar" className="text-foreground hover:text-primary transition-colors hidden sm:block">
            <Search className="h-5 w-5" />
          </button>
          
          <Link to="/carrinho" className="relative text-foreground hover:text-primary transition-colors flex items-center">
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-[#140D0A]">
                {items.length}
              </span>
            )}
          </Link>
          
          <Link 
            to="/login"
            className="hidden sm:flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-bold text-[#140D0A] transition-colors hover:bg-primary/80 ml-2 text-xs lg:text-sm"
          >
            <LogOut className="h-4 w-4" />
            Entrar
          </Link>

          {/* BOTÃO MENU MOBILE (Escondido em Desktop) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground ml-2 p-1"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MENU DROPDOWN MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#140D0A] border-b border-surface/50 flex flex-col px-6 py-4 gap-4 shadow-2xl">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-primary font-bold text-sm py-2 border-b border-surface/30"
          >
            Início
          </Link>
          <Link 
            to="/mercado" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground text-sm py-2 border-b border-surface/30"
          >
            Mercado
          </Link>
          <Link 
            to="/criadores" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground text-sm py-2 border-b border-surface/30"
          >
            Criadores
          </Link>
          <Link 
            to="/aprenda" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground text-sm py-2 border-b border-surface/30"
          >
            Aprenda
          </Link>
          
          <Link 
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-[#140D0A] mt-2 w-full text-sm"
          >
            <LogOut className="h-4 w-4" />
            Entrar / Criar conta
          </Link>
        </div>
      )}
    </header>
  );
}