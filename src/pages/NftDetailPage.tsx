// src/pages/NftDetailPage.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from '@tanstack/react-router';
import { Heart, Search, Mail, ChevronLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { fetchNfts } from '../services/api';
import { useCart } from '../context/CartContext';

export function NftDetailPage() {
  const { id } = useParams({ from: '/nft/$id' });
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: nfts } = useQuery({
    queryKey: ['nfts'],
    queryFn: fetchNfts,
  });

  const nft = Array.isArray(nfts) ? nfts.find((item) => String(item.id) === String(id)) : null;
  
  // Apanhar apenas os NFTs da lista, tirar o atual para não repetir e manter 5 para recomendação
  const relatedNfts = Array.isArray(nfts) 
    ? nfts.filter((item) => String(item.id) !== String(id)).slice(0, 5) 
    : [];

  if (!nft) return <div className="p-12 text-center text-[#D28A4C] font-mono">A carregar detalhes do NFT...</div>;

  return (
    <div className="w-full font-mono bg-[#1a110c] md:bg-[#140D0A]">
      
      {/* ========================================= */}
      {/* VERSÃO MOBILE (Idêntica à Imagem de Referência) */}
      {/* ========================================= */}
      <div className="md:hidden flex flex-col min-h-[calc(100vh-80px)] pb-[120px] relative bg-[#1a110c]">
        
        {/* Cabeçalho Flutuante (Botão Voltar e Favorito) */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 pt-6 z-10">
          <button onClick={() => window.history.back()} className="w-[34px] h-[34px] rounded-full bg-[#241612]/90 flex items-center justify-center text-[#D28A4C] hover:bg-[#38220F] transition-colors shadow-lg">
            <ChevronLeft className="h-5 w-5 -ml-0.5" />
          </button>
          <button className="w-[34px] h-[34px] rounded-full bg-[#241612]/90 flex items-center justify-center text-[#D28A4C] hover:bg-[#38220F] transition-colors shadow-lg">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Imagem Principal Arredondada */}
        <div className="px-4 pt-16 pb-6">
          <div className="w-full aspect-square rounded-[24px] overflow-hidden bg-[#241612] shadow-xl">
            {/* Adicionei object-contain e p-4 aqui para não cortar a imagem do NFT */}
            <img src={nft.imageUrl} alt={nft.title} className="w-full h-full object-contain p-4" />
          </div>
        </div>

        {/* Conteúdo Descritivo */}
        <div className="px-5 flex flex-col gap-4">
          
          {/* Título e Avaliação */}
          <div className="flex justify-between items-start gap-2">
            <h1 className="text-[18px] font-bold text-foreground leading-tight">{nft.title}</h1>
            <div className="flex items-center gap-1 border border-[#D28A4C] rounded-full px-2.5 py-1 text-[#D28A4C] text-[10px] font-bold shrink-0">
              <span className="text-[11px] mb-0.5">★</span> 4.8<span className="text-[#8a7a6c] font-normal">(19)</span>
            </div>
          </div>

          {/* Descrição Curta */}
          <p className="text-[11px] text-[#a89b8d] leading-relaxed tracking-wide">
            Um colecionável digital 1/50 finalizado à mão da coleção Kurio Editions, verificado na Ethereum.
          </p>

          {/* Edição / Pills */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="font-bold text-foreground text-[12px] tracking-wide">Edição:</span>
            <div className="flex flex-wrap gap-2 text-[10px] tracking-wide">
              <span className="border border-[#38220F] text-[#8a7a6c] rounded-full px-3 py-1">1/10</span>
              <span className="border border-[#38220F] text-[#8a7a6c] rounded-full px-3 py-1">1/10</span>
              <span className="border border-[#D28A4C] text-[#D28A4C] rounded-full px-3 py-1 font-bold">1/50</span>
              <span className="border border-[#38220F] text-[#8a7a6c] rounded-full px-3 py-1">ABERTA</span>
            </div>
          </div>

          {/* Metadados */}
          <div className="flex flex-col gap-2.5 mt-3 text-[11px] text-[#8a7a6c] tracking-wide">
            <p>ID do token: <span className="text-[#a89b8d]">#0{nft.id}42</span></p>
            <p>Coleção: <span className="text-[#a89b8d]">{nft.collectionName || 'Kurio Apes'}</span></p>
            <p>Atributos: <span className="text-[#a89b8d]">Óculos, Esmeralda, Raro</span></p>
          </div>
        </div>

        {/* Barra de Ação Inferior Fixa */}
        <div className="fixed bottom-0 left-0 w-full bg-[#140D0A] rounded-t-[32px] px-5 py-6 border-t border-[#38220F]/40 shadow-[0_-20px_40px_rgba(0,0,0,0.7)] z-[60] flex flex-col gap-6">
          
          {/* Seletor de Quantidade e Preço */}
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-3">
              <span className="text-[#a89b8d] font-bold text-[11px] tracking-wide">Qtd.</span>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-[22px] h-[22px] rounded-full bg-[#D28A4C] flex items-center justify-center text-[#140D0A] hover:bg-[#D28A4C]/80">
                <Minus className="h-3.5 w-3.5" strokeWidth={3} />
              </button>
              <span className="font-bold text-foreground text-[13px] w-3 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-[22px] h-[22px] rounded-full bg-[#D28A4C] flex items-center justify-center text-[#140D0A] hover:bg-[#D28A4C]/80">
                <Plus className="h-3.5 w-3.5" strokeWidth={3} />
              </button>
            </div>
            
            <span className="font-bold text-[#D28A4C] text-[15px] tracking-wide">{nft.price} ETH</span>
          </div>

          {/* Botões de Comprar e Carrinho */}
          <div className="flex gap-3">
            <button
            onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(nft);
                }} 
            className="flex-1 rounded-full bg-[#D28A4C] h-[52px] font-bold text-[#140D0A] text-[13px] tracking-wide hover:bg-[#D28A4C]/90 transition-colors">
              Comprar NFT
            </button>
            <button 
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(nft);
              }} 
              className="w-[52px] h-[52px] rounded-full bg-[#241612] flex items-center justify-center text-[#D28A4C] hover:bg-[#38220F] shrink-0 border border-[#38220F]/50 transition-colors"
            >
              <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

      </div>


      {/* ========================================= */}
      {/* VERSÃO DESKTOP (Oculta no Mobile)         */}
      {/* ========================================= */}
      <div className="hidden md:block container mx-auto px-6 lg:px-16 py-12 max-w-[1400px]">
        {/* Breadcrumb refinado */}
        <div className="text-xs text-muted mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-foreground transition-colors">Início</Link>
          <span>/</span>
          <Link to="/mercado" className="hover:text-foreground transition-colors">Mercado</Link>
        </div>

        {/* 1. SECÇÃO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Lado Esquerdo: Galeria */}
          <div className="lg:col-span-5 flex gap-4">
            {/* Miniaturas */}
            <div className="flex flex-col gap-3 shrink-0">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="w-16 h-16 rounded-lg bg-[#140D0A] overflow-hidden border border-surface cursor-pointer hover:border-primary transition-colors">
                  <img src={nft.imageUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-contain p-2 opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
            
            {/* Imagem Principal */}
            <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-[#140D0A] border border-surface relative">
              <img src={nft.imageUrl} alt={nft.title} className="w-full h-full object-contain p-4" />
              <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#140D0A]/60 flex items-center justify-center text-foreground hover:bg-primary hover:text-[#140D0A] transition-colors backdrop-blur-sm">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Lado Direito: Informações e Ações */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{nft.title}</h1>
            
            <div className="flex items-center gap-8 mb-8 border-b border-surface/50 pb-6">
              <span className="text-2xl font-bold text-primary">{nft.price} ETH</span>
              <span className="text-xs text-muted tracking-wide flex items-center gap-1">
                <span className="text-primary">★★★★★</span> 19 avaliações de colecionadores
              </span>
            </div>

            <div className="text-xs text-muted leading-relaxed mb-6 max-w-2xl">
              <p className="font-bold text-foreground mb-2">Sobre este NFT:</p>
              Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores.
            </div>

            <div className="flex flex-col gap-1.5 mb-8 text-xs text-muted">
              <span className="font-bold text-foreground">Edição:</span>
              <span className="tracking-widest">
                1/1 <span className="text-primary px-1">1/10</span> (1/50) <span className="font-bold ml-1">ABERTA</span>
              </span>
            </div>

            {/* Botões de Ação na mesma linha */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              {/* Seletor de Quantidade */}
              <div className="flex items-center gap-5 bg-[#1f140f] border border-surface px-4 py-2.5 rounded-lg h-[46px]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-primary font-bold text-lg hover:opacity-80 transition-opacity">-</button>
                <span className="text-sm font-bold text-foreground min-w-[20px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-primary font-bold text-lg hover:opacity-80 transition-opacity">+</button>
              </div>
              
              <button 
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(nft);
                }} 
                className="rounded-lg bg-primary px-10 h-[46px] font-bold text-[#140D0A] hover:bg-primary/80 text-sm transition-colors tracking-wide"
              >
                COMPRAR
              </button>
              
              <button className="flex items-center gap-2 px-6 h-[46px] rounded-lg border border-surface text-muted hover:text-foreground hover:border-muted transition-colors text-sm">
                <Heart className="h-4 w-4" />
                Favoritar
              </button>
            </div>

            {/* Meta Detalhes */}
            <div className="flex flex-col gap-2 text-[11px] text-muted">
              <p>ID do token: <span className="text-foreground">#0{nft.id}42</span></p>
              <p>Coleção: <span className="text-foreground">{nft.collectionName || 'Kurio Apes'}</span></p>
              <p>Atributos: <span className="text-foreground">Óculos, Esmeralda, Raro</span></p>
              <div className="flex items-center gap-2 mt-2">
                <span>Compartilhar este NFT:</span>
                <div className="flex items-center gap-4 text-foreground ml-2">
                    {/* LinkedIn SVG */}
                    <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>
                    
                    {/* Mail */}
                    <button aria-label="Email" className="hover:text-primary transition-colors">
                        <Mail className="h-4 w-4" />
                    </button>
                    
                    {/* Twitter / X SVG */}
                    <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ABAS E DETALHES TÉCNICOS */}
        <div className="border-t border-surface/50 pt-10 mb-20">
          <div className="flex items-center gap-12 border-b border-surface/50 mb-10">
            <button className="text-primary border-b-2 border-primary pb-4 text-sm font-bold tracking-wide">
              Detalhes do NFT
            </button>
            <button className="text-muted hover:text-foreground pb-4 text-sm transition-colors tracking-wide">
              Avaliações de colecionadores (19)
            </button>
          </div>

          <div className="flex flex-col gap-10 text-xs text-muted leading-relaxed max-w-5xl">
              <div className="flex flex-col gap-6">
                  <p>
                  {nft.title} é uma obra digital 1/50 finalizada à mão da coleção Kurio Editions. Cada atributo fica armazenado nos metadados do token e verificado na Ethereum. A obra explora identidade, movimento e luz em um mundo digital sem fronteiras.
                  </p>
                  <p>
                  A propriedade inclui a arte em alta resolução, lançamentos exclusivos para colecionadores e um registro permanente de procedência registrada na rede. Nova Sato recebe 5% de direitos autorais nas vendas secundárias, apoiando novos trabalhos e lançamentos da comunidade.
                  </p>
              </div>
              
              <div className="flex flex-col gap-6">
                  <div>
                  <span className="font-bold text-foreground block mb-1">Rede:</span>
                  <p>Cunhado na {nft.network || 'Ethereum'} com procedência imutável e metadados armazenados no IPFS.</p>
                  </div>
                  <div>
                  <span className="font-bold text-foreground block mb-1">Contrato:</span>
                  <p>Direitos autorais do criador: 5% nas vendas secundárias, pagos automaticamente pelos mercados compatíveis.</p>
                  </div>
                  <div>
                  <span className="font-bold text-foreground block mb-1">Direitos autorais:</span>
                  <p>0x7442...19E8 - Contrato inteligente ERC-721 verificado.</p>
                  </div>
              </div>
          </div>
        </div>

        {/* 3. MAIS DESTA COLEÇÃO */}
        <div className="border-t border-surface/50 pt-12 mb-12">
          <h2 className="text-base font-bold text-foreground mb-8 tracking-wide">Mais desta coleção</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mb-10">
            {relatedNfts.map((item) => (
              <Link to="/nft/$id" params={{ id: String(item.id) }} key={item.id} className="bg-surface p-3.5 rounded-xl border border-surface flex flex-col gap-3 group cursor-pointer hover:-translate-y-1 transition-transform">
                <div className="aspect-square rounded-lg bg-[#140D0A] overflow-hidden relative">
                  {/* Corrigido para object-contain */}
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] text-foreground truncate">{item.title}</span>
                  <span className="text-sm font-bold text-primary">{item.price} ETH</span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Paginação */}
          <div className="flex items-center justify-center gap-2.5">
            <button className="w-2 h-2 rounded-full bg-primary hover:scale-125 transition-transform"></button>
            <button className="w-2 h-2 rounded-full bg-surface border border-surface/80 hover:bg-surface/80 hover:scale-125 transition-transform"></button>
            <button className="w-2 h-2 rounded-full bg-surface border border-surface/80 hover:bg-surface/80 hover:scale-125 transition-transform"></button>
          </div>
        </div>
        
      </div>
    </div>
  );
}