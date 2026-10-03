// src/pages/HomePage.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, Link } from '@tanstack/react-router';
import { Search, SlidersHorizontal, ArrowRight, Heart } from 'lucide-react';
import { NftCard } from '../features/catalog/components/NftCard';
import { CatalogFilters } from '../features/catalog/components/CatalogFilters';
import { fetchNfts } from '../services/api';
import { useCart } from '../context/CartContext';
import nft1 from '../assets/NFT1.png';
import nft2 from '../assets/NFT2.png';
import nft3 from '../assets/NFT3.png';
import nft4 from '../assets/NFT4.png';

const localImages = [nft1, nft2, nft3, nft4];
const getRandomImage = () => localImages[Math.floor(Math.random() * localImages.length)];

export function HomePage() {
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '0.02', max: '12.30' });
  const [activeTab, setActiveTab] = useState('todos');
  const { addToCart } = useCart();
  const navigate = useNavigate();



  const { data: nfts, isLoading, error } = useQuery({
    queryKey: ['nfts'],
    queryFn: fetchNfts,
  });


  const nftList = Array.isArray(nfts) ? nfts : [];
  
  const filteredNfts = nftList.filter((nft) => {
    const matchesCollection = selectedCollection ? nft.collectionName === selectedCollection : true;
    const matchesNetwork = selectedNetwork ? nft.network === selectedNetwork : true;
    const nftPrice = Number(nft.price);
    const matchesPrice = nftPrice >= Number(priceRange.min) && nftPrice <= Number(priceRange.max);
    return matchesCollection && matchesNetwork && matchesPrice;
  });

  const featuredNfts = nftList.slice(0, 4);

  return (
    <div className="w-full font-mono bg-[#0a0604] md:bg-[#140D0A]">
      
      {/* ========================================= */}
      {/* VERSÃO MOBILE (Idêntica à Imagem de Referência) */}
      {/* ========================================= */}
      <div className="md:hidden flex flex-col px-5 pt-6 pb-[140px] min-h-screen">
        
        {/* Barra de Pesquisa e Filtro */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 flex items-center bg-[#1a110c] border border-[#38220F]/50 rounded-2xl px-4 py-3.5 shadow-sm">
            <Search className="h-[18px] w-[18px] text-[#8a7a6c] mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Explorar coleções"
              className="bg-transparent text-[13px] text-foreground placeholder:text-[#8a7a6c] focus:outline-none w-full"
            />
          </div>
          <button className="bg-[#D28A4C] h-[48px] w-[48px] rounded-2xl flex items-center justify-center text-[#140D0A] shrink-0 hover:bg-[#D28A4C]/80 transition-colors">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Cartão Hero (Destaque) */}
        <div className="relative bg-gradient-to-br from-[#593922] to-[#2a170e] rounded-[24px] p-6 overflow-hidden flex mb-8 border border-[#38220F]/30 shadow-lg">
          
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-[#D28A4C]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Conteúdo Texto */}
          <div className="flex flex-col w-[55%] relative z-10 pr-2">
            <span className="text-[10px] text-[#e0d6cc] mb-1.5 font-bold tracking-wide">Bem-vindo à Kurio</span>
            <h2 className="text-[16px] font-bold text-white leading-[1.3] mb-3">
              SEJA DONO DA<br/>CULTURA DIGITAL
            </h2>
            <p className="text-[10px] text-[#a89b8d] leading-relaxed mb-4 pr-2">
              Descubra NFTs selecionados de criadores do mundo todo.
            </p>
            <button className="text-[#D28A4C] text-[10px] font-bold flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              EXPLORAR <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
            </button>
          </div>

          {/* Imagens Sobrepostas */}
          <div className="w-[45%] relative z-10 flex justify-end items-center">
            {/* Imagem Maior */}
            <div className="w-[100px] h-[100px] rounded-xl overflow-hidden border border-[#eab308] relative z-0 bg-[#140D0A]">
              {featuredNfts[0] && <img src={featuredNfts[0].imageUrl} className="w-full h-full object-cover" alt="Destaque" />}
            </div>
            {/* Imagem Menor Sobreposta */}
            <div className="absolute -bottom-2 -left-2 w-[52px] h-[52px] rounded-[14px] border-4 border-[#3d2516] overflow-hidden z-10 bg-[#140D0A]">
              {featuredNfts[1] && <img src={featuredNfts[1].imageUrl} className="w-full h-full object-cover" alt="Destaque pequeno" />}
            </div>
          </div>

          {/* Pontos de Paginação */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]/40"></div>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="flex items-center gap-4 border-b border-[#38220F]/60 text-[11px] mb-6">
          <button className="text-[#D28A4C] font-bold border-b-2 border-[#D28A4C] pb-2.5 tracking-wide">
            Todos os NFTs
          </button>
          <button className="text-[#8a7a6c] pb-2.5 tracking-wide hover:text-[#e0d6cc] transition-colors">
            Novos lançamentos
          </button>
          <button className="text-[#8a7a6c] pb-2.5 tracking-wide hover:text-[#e0d6cc] transition-colors">
            Em alta
          </button>
        </div>

        {/* Grid de NFTs Mobile (2 Colunas) */}
        <div className="grid grid-cols-2 gap-4">
          {nftList.map((nft) => (
            <Link to="/nft/$id" params={{ id: String(nft.id) }} key={nft.id} className="bg-[#1a110c] p-2.5 rounded-2xl border border-[#38220F]/30 flex flex-col gap-2 group cursor-pointer hover:border-[#D28A4C]/50 transition-colors">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#241612] relative">
                <img src={nft.imageUrl} alt={nft.title} className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => {
                    e.preventDefault(); // Impede o link de abrir ao clicar no coração
                    // lógica de favorito aqui
                  }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#140D0A]/60 flex items-center justify-center text-muted hover:text-[#D28A4C] backdrop-blur-sm transition-colors z-20"
                >
                  <Heart className="h-3 w-3" />
                </button>
              </div>
              <div className="flex flex-col gap-0.5 px-0.5">
                <span className="text-[11px] text-foreground font-bold truncate">{nft.title}</span>
                <span className="text-[10px] text-[#D28A4C] font-bold">{nft.price} ETH</span>
              </div>
            </Link>
          ))}
        </div>

      </div>


      {/* ========================================= */}
      {/* VERSÃO DESKTOP (Oculta no Mobile)         */}
      {/* O seu código original mantido intacto     */}
      {/* ========================================= */}
      <div className="hidden md:block container mx-auto px-4 py-12">
        {/* 1. HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 mt-8 gap-12 w-full">
          <div className="flex flex-col gap-7 flex-1 lg:pl-5 w-full">
            <span className="text-md text-foreground tracking-wide">Bem-vindo à Kurio</span>
            <h1 className="text-4xl md:text-[44px] lg:text-[52px] font-bold text-foreground leading-[1.15]">
              SEJA DONO DO FUTURO <br />
              DA ARTE DIGITAL
            </h1>
            <p className="text-muted text-[13px] md:text-sm leading-relaxed max-w-[520px]">
              Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet.
            </p>
            <div className="flex items-center justify-between max-w-[520px] pt-4">
              <button className="rounded-[6px] bg-[#D28A4C] px-8 py-2.5 font-bold text-[#140D0A] transition-colors hover:bg-[#D28A4C]/80 text-sm">
                EXPLORAR
              </button>
              <div className="flex gap-1.5 pr-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></span>
              </div>
            </div>
          </div>
          <div className="aspect-square w-full max-w-md lg:max-w-[460px] mx-auto lg:mx-0 lg:ml-auto rounded-xl overflow-hidden shadow-2xl shrink-0">
            <img src={getRandomImage()} alt="Hero" className="w-full h-full object-contain p-4" />
          </div>
        </div>

        {/* 2. CATÁLOGO COM FILTROS E ABAS */}
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="w-full md:w-72 shrink-0 flex flex-col gap-8">
            <CatalogFilters
              selectedCollection={selectedCollection}
              onCollectionChange={setSelectedCollection}
              selectedNetwork={selectedNetwork}
              onNetworkChange={setSelectedNetwork}
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              onPriceChange={(min, max) => setPriceRange({ min, max })}
            />
            <div className="rounded-xl bg-surface p-6 border border-surface flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">NFT EM DESTAQUE</span>
                <h4 className="text-sm font-bold text-foreground">OFERTA LIMITADA</h4>
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-[#140D0A]">
                <img src={getRandomImage()} alt="Featured" className="w-full h-full object-contain" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted">Cosmic Bloon #118</p>
                  <p className="text-sm font-bold text-primary">1.29 ETH</p>
                </div>
                <button onClick={() => navigate({ to: '/nft/$id', params: { id: '1' } })} className="text-xs text-primary underline font-bold hover:text-primary/80">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </aside>
          
          <main className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface">
              <div className="flex items-center gap-6 text-sm">
                <button onClick={() => setActiveTab('todos')} className={`font-bold pb-1 transition-colors ${activeTab === 'todos' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-foreground'}`}>Todos os NFTs</button>
                <button onClick={() => setActiveTab('novos')} className={`font-bold pb-1 transition-colors ${activeTab === 'novos' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-foreground'}`}>Novos lançamentos</button>
                <button onClick={() => setActiveTab('alta')} className={`font-bold pb-1 transition-colors ${activeTab === 'alta' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-foreground'}`}>Em alta</button>
              </div>
              <div className="text-xs text-muted flex items-center gap-2">
                <span>Ordenar por:</span>
                <span className="text-foreground font-bold cursor-pointer">Listados recentemente ▾</span>
              </div>
            </div>

            {isLoading && <div className="flex justify-center items-center h-64 text-primary">A carregar mercado digital...</div>}
            {error && <div className="text-red-500">Erro ao carregar os NFTs do servidor simulado.</div>}

            {filteredNfts && filteredNfts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-muted">
                <p>Nenhum NFT encontrado com os filtros selecionados.</p>
              </div>
            )}

            {filteredNfts && filteredNfts.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filteredNfts.map((nft) => (
                  <NftCard 
                    key={nft.id} 
                    nft={nft} 
                    onSelect={(selectedNft) => navigate({ to: '/nft/$id', params: { id: selectedNft.id } })}
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end items-center gap-2 pt-6">
              <button className="h-8 w-8 rounded bg-primary text-[#140D0A] font-bold text-xs flex items-center justify-center">1</button>
              <button className="h-8 w-8 rounded bg-surface text-muted hover:text-foreground text-xs flex items-center justify-center border border-surface">2</button>
              <button className="h-8 w-8 rounded bg-surface text-muted hover:text-foreground text-xs flex items-center justify-center border border-surface">3</button>
              <button className="h-8 w-8 rounded bg-surface text-muted hover:text-foreground text-xs flex items-center justify-center border border-surface">4</button>
              <span className="text-muted px-1">&gt;</span>
            </div>
          </main>
        </div>

        {/* BANNERS PROMOCIONAIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="rounded-xl bg-surface p-8 border border-surface flex items-center gap-6">
            <div className="w-[250px] h-[250px] flex items-center justify-center rounded-[8px] bg-[#140D0A] shrink-0 overflow-hidden p-2">
              <img 
                src={getRandomImage()} 
                alt="Promo" 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-base text-foreground">Lançamentos gerais de edição limitada</h3>
              <p className="text-xs text-muted leading-relaxed">Colecione edições limitadas com criadores antes do lançamento público.</p>
              <button className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-[#140D0A] w-fit hover:bg-primary/80 transition-colors">
                Explorar →
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-8 border border-surface flex items-center gap-6">
            <div className="w-[250px] h-[250px] flex items-center justify-center rounded-[8px] bg-[#140D0A] shrink-0 overflow-hidden p-2">
              <img 
                src={getRandomImage()} 
                alt="Promo" 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-base text-foreground">Arte digital selecionada e muito mais</h3>
              <p className="text-xs text-muted leading-relaxed">Descubra novos artistas, coleções verificadas e ativos digitais com alta raridade.</p>
              <button className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-[#140D0A] w-fit hover:bg-primary/80 transition-colors">
                Explorar →
              </button>
            </div>
          </div>
        </div>

        {/* DIÁRIO DA CUNHAGEM (BLOG) */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Diário da Cunhagem</h2>
            <p className="text-xs text-muted mt-2">Histórias, guias e insights para colecionadores sobre o universo da propriedade digital.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Como funciona a propriedade de NFTs', desc: 'Aprenda a colecionar, negociar e verificar ativos digitais.' },
              { title: '10 artistas digitais para acompanhar', desc: 'Conheça criadores que moldam a cultura digital.' },
              { title: 'Raridade, atributos e procedência', desc: 'Entenda raridade, procedência, direitos autorais e utilidade.' },
              { title: 'Como proteger sua carteira', desc: 'Proteja sua carteira, seus ativos e sua identidade.' },
            ].map((article, i) => (
              <div key={i} className="rounded-xl bg-surface p-2 border border-surface flex flex-col gap-3">
                <div className="aspect-video rounded-lg w-full h-[230px] bg-[#140D0A] overflow-hidden">
                  <img src={getRandomImage()} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-sm text-foreground">{article.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{article.desc}</p>
                <span className="text-xs text-primary font-bold cursor-pointer hover:underline mt-auto pt-2">Ler mais →</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}