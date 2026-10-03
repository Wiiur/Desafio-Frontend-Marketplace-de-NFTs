// src/pages/CartPage.tsx
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Trash2, ChevronLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchNfts } from '../services/api';

export function CartPage() {
  const { items, removeFromCart } = useCart();
  
  const [quantities, setQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const { data: nfts } = useQuery({
    queryKey: ['nfts'],
    queryFn: fetchNfts,
  });

  const relatedNfts = nfts?.slice(0, 5) || [];

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 1) + delta;
      if (newQty < 1) {
        removeFromCart(id);
        return prev;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const subtotal = items.reduce((acc, item) => acc + (Number(item.price) * (quantities[item.id] || 1)), 0);
  const networkFee = 0.016;
  const total = subtotal > 0 ? subtotal + networkFee : 0;

  return (
    <div className="w-full font-mono">
      
      {/* ========================================= */}
      {/* VERSÃO MOBILE (Idêntica à Imagem de Referência) */}
      {/* ========================================= */}
      <div className="md:hidden flex flex-col bg-[#0a0604] min-h-screen">
        
        {/* Cabeçalho Mobile */}
        <div className="flex items-center px-6 pt-10 pb-8 relative">
          <button 
            onClick={() => window.history.back()} 
            className="w-[34px] h-[34px] rounded-full bg-[#1a110c] flex items-center justify-center text-[#D28A4C] hover:opacity-80 transition-opacity"
          >
            <ChevronLeft className="h-5 w-5 -ml-0.5" />
          </button>
          <h1 className="text-[16px] font-bold text-foreground absolute left-1/2 -translate-x-1/2 tracking-wide">
            Carrinho de NFTs
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingCart className="h-12 w-12 text-muted/30 mb-4" />
            <p className="text-foreground font-bold mb-2">Carrinho vazio</p>
            <Link to="/" className="text-[#D28A4C] text-sm mt-4">Explorar Mercado</Link>
          </div>
        ) : (
          <>
            {/* Lista de Cartões Mobile */}
            <div className="flex flex-col gap-3.5 px-5 mb-8">
              {items.map((item) => {
                const qty = quantities[item.id] || 1;
                return (
                  <div key={item.id} className="bg-[#1a110c] p-2.5 rounded-2xl flex gap-3.5 border border-[#38220F]/30">
                    <img src={item.imageUrl} alt={item.title} className="w-[84px] h-[84px] rounded-xl object-cover bg-[#241612]" />
                    
                    <div className="flex flex-col justify-between flex-1 py-0.5">
                      <div>
                        <h3 className="font-bold text-[12px] text-foreground tracking-wide mb-0.5 truncate">{item.title}</h3>
                        <span className="text-[10px] text-muted tracking-wide">Edição: 1/50</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-[#D28A4C] text-[13px]">{item.price} ETH</span>
                        
                        {/* Controlos de Quantidade */}
                        <div className="flex items-center gap-3 pr-1">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-[22px] h-[22px] rounded-full bg-[#241612] flex items-center justify-center text-[#D28A4C] hover:bg-[#38220F] transition-colors"
                          >
                            <Minus className="h-3 w-3" strokeWidth={2.5} />
                          </button>
                          <span className="text-[11px] font-bold text-foreground">{qty}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-[22px] h-[22px] rounded-full bg-[#241612] flex items-center justify-center text-[#D28A4C] hover:bg-[#38220F] transition-colors"
                          >
                            <Plus className="h-3 w-3" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resumo da Encomenda (Bottom Sheet) com PB-32 adicionado */}
            <div className="bg-[#1a110c] rounded-t-[32px] p-6 pt-7 pb-32 mt-auto border-t border-[#38220F]/40 shadow-2xl">
              
              {/* Input Código Promocional em Formato Cápsula */}
              <div className="flex bg-[#0a0604] border border-[#38220F]/60 rounded-full overflow-hidden mb-7 h-[46px] p-1">
                <input
                  type="text"
                  placeholder="Digite o código promocional..."
                  className="bg-transparent px-4 text-[11px] text-muted placeholder:text-muted/50 flex-1 focus:outline-none"
                />
                <button type="button" className="bg-[#D28A4C] px-6 text-[11px] font-bold text-[#140D0A] rounded-full hover:bg-[#D28A4C]/80 transition-colors">
                  Aplicar
                </button>
              </div>

              {/* Linhas de Totais */}
              <div className="flex flex-col gap-3.5 text-[11px] mb-8 px-1">
                <div className="flex justify-between items-center">
                  <span className="text-foreground tracking-wide">Subtotal</span>
                  <span className="text-foreground font-mono">{subtotal.toFixed(2)} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground tracking-wide">Desconto do lançamento</span>
                  <span className="text-foreground font-mono">(-) 00.00</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-foreground tracking-wide">Taxa de rede</span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-foreground font-mono">{networkFee} ETH</span>
                    <span className="text-[9px] text-[#D28A4C] tracking-tight">Taxa estimada</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1 pt-4 border-t border-[#38220F]/40">
                  <span className="text-[14px] font-bold text-foreground">Total</span>
                  <span className="text-[15px] font-bold text-[#D28A4C] font-mono">{total.toFixed(3)} ETH</span>
                </div>
              </div>

              {/* Botão Final */}
              <Link
                to="/pagamento"
                className="w-full flex items-center justify-center rounded-full bg-[#D28A4C] h-[52px] font-bold text-[#140D0A] transition-colors hover:bg-[#D28A4C]/90 text-[13px] tracking-wide"
              >
                Conectar e finalizar
              </Link>
            </div>
          </>
        )}
      </div>


      {/* ========================================= */}
      {/* VERSÃO DESKTOP (Oculta no Mobile)         */}
      {/* ========================================= */}
      <div className="hidden md:block container mx-auto px-6 lg:px-16 py-12 max-w-[1400px]">
        {/* Breadcrumbs */}
        <div className="text-xs text-muted mb-12 flex items-center gap-2">
          <Link to="/" className="hover:text-foreground transition-colors">Início</Link>
          <span>/</span>
          <Link to="/mercado" className="hover:text-foreground transition-colors">Mercado</Link>
          <span>/</span>
          <span className="text-foreground">Carrinho</span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-xl bg-surface border border-surface mb-20">
            <ShoppingCart className="h-16 w-16 text-muted/30 mb-4" />
            <p className="text-foreground font-bold mb-2">O seu carrinho está vazio</p>
            <p className="text-muted text-sm max-w-sm mb-6">Explore o mercado digital e selecione peças exclusivas.</p>
            <Link to="/" className="rounded-lg bg-[#D28A4C] px-6 py-2.5 font-bold text-[#140D0A] hover:bg-[#D28A4C]/80 text-sm">
              Explorar Mercado
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Lado Esquerdo: Lista de NFTs (Desktop) */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="grid grid-cols-12 gap-4 border-b border-surface/50 pb-4 text-[11px] text-foreground font-bold tracking-wide">
                <div className="col-span-5">NFTs</div>
                <div className="col-span-2">Preço</div>
                <div className="col-span-3">Edições</div>
                <div className="col-span-2 flex justify-between">
                  <span>Total</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                {items.map((item) => {
                  const qty = quantities[item.id] || 1;
                  const itemTotal = (Number(item.price) * qty).toFixed(2);
                  
                  return (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-5 bg-[#241612] rounded-xl">
                      <div className="col-span-5 flex items-center gap-4">
                        <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-lg bg-[#140D0A] object-cover" />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-[13px] text-primary">{item.title}</span>
                          <span className="text-[10px] text-muted">ID do token: #0{item.id}42</span>
                        </div>
                      </div>

                      <div className="col-span-2 text-xs text-muted font-bold">
                        {item.price} ETH
                      </div>

                      <div className="col-span-3 flex items-center gap-3">
                        <button 
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-[22px] h-[22px] rounded-md bg-[#D28A4C] text-[#140D0A] flex items-center justify-center font-bold text-sm hover:opacity-80 transition-opacity"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-foreground min-w-[12px] text-center">{qty}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-[22px] h-[22px] rounded-md bg-[#D28A4C] text-[#140D0A] flex items-center justify-center font-bold text-sm hover:opacity-80 transition-opacity"
                        >
                          +
                        </button>
                      </div>

                      <div className="col-span-2 flex items-center justify-between">
                        <span className="text-xs text-primary font-bold">
                          {itemTotal} ETH
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-muted hover:text-red-400 transition-colors pr-2"
                          title="Remover item"
                        >
                          <Trash2 className="h-[18px] w-[18px]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lado Direito: Resumo da Carteira (Desktop) */}
            <div className="lg:col-span-4 flex flex-col">
              <h2 className="text-sm font-bold text-foreground mb-8 tracking-wide">Resumo da carteira</h2>
              
              <div className="flex flex-col gap-2 mb-10">
                <label className="text-[11px] text-foreground font-bold tracking-wide">Código promocional</label>
                <div className="flex border border-surface rounded-lg bg-[#1f140f] overflow-hidden focus-within:ring-1 focus-within:ring-primary h-[42px]">
                  <input
                    type="text"
                    placeholder="digite o código promocional..."
                    className="bg-transparent px-3 text-[11px] text-foreground placeholder:text-muted/50 flex-1 focus:outline-none"
                  />
                  <button 
                    type="button" 
                    className="bg-[#D28A4C] px-5 text-[11px] font-bold text-[#140D0A] hover:bg-[#D28A4C]/80 transition-colors shrink-0"
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-foreground font-bold">{subtotal.toFixed(2)} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Desconto do lançamento</span>
                  <span className="text-foreground font-bold">(-) 00.00</span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="text-muted">Taxa de rede</span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-foreground font-bold">0.016 ETH</span>
                    <span className="text-[9px] text-muted tracking-tight">Taxa estimada</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-surface/50 my-6"></div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-bold text-foreground tracking-wide">Total</span>
                <span className="text-sm font-bold text-primary">{total.toFixed(3)} ETH</span>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <Link
                  to="/pagamento"
                  className="w-full block text-center rounded-lg bg-[#D28A4C] py-3.5 font-bold text-[#140D0A] transition-colors hover:bg-[#D28A4C]/80 text-sm tracking-wide"
                >
                  Conectar e finalizar
                </Link>
                <Link to="/" className="text-[11px] text-[#D28A4C] text-center hover:underline tracking-wide mt-2">
                  Continuar explorando
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Secção Inferior: Colecionadores também viram (Apenas Desktop) */}
        <div className="border-t border-surface/50 pt-16 mt-4 mb-8">
          <h2 className="text-sm font-bold text-foreground mb-8 tracking-wide">Colecionadores também viram</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mb-10">
            {relatedNfts.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#241612] p-3.5 rounded-xl flex flex-col gap-3 group cursor-pointer hover:-translate-y-1 transition-transform"
              >
                <div className="aspect-square rounded-lg bg-[#241612] overflow-hidden relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="flex flex-col gap-0.5 px-1">
                  <span className="text-[11px] text-muted truncate">{item.title}</span>
                  <span className="text-sm font-bold text-primary">{item.price} ETH</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}