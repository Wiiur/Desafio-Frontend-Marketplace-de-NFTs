// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { HomePage } from './pages/HomePage';
import { NftDetailPage } from './pages/NftDetailPage';
import { CartPage } from './pages/CartPage';
import { PaymentPage } from './pages/PaymentPage';
import { ProfilePage } from './pages/ProfilePage';
import { BottomNav } from './components/BottomNav';
import { AuthProvider } from './context/AuthContext';
import { LoginModal } from './components/LoginModal';
import { useEffect } from 'react';
import { socket } from './services/socket';

const queryClient = new QueryClient();

// Componente do Rodapé Global
function GlobalFooter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Inscrito com sucesso com o e-mail: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-[#241612] border-t border-surface text-xs text-muted mt-20 font-mono">
      {/* 1. Secção Superior */}
      <div className="w-full px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3">
          <div className="flex flex-col gap-3 pr-8 lg:pr-12">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/30">W</div>
            <h4 className="font-bold text-sm text-foreground">Segurança da carteira</h4>
            <p className="text-xs text-muted leading-relaxed">Proteja sua carteira e colecione arte digital verificada com confiança.</p>
          </div>
          <div className="flex flex-col gap-3 sm:border-l sm:border-[#D28A4C] sm:px-8 lg:px-12 pt-8 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/30">C</div>
            <h4 className="font-bold text-sm text-foreground">Criadores em destaque</h4>
            <p className="text-xs text-muted leading-relaxed">Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.</p>
          </div>
          <div className="flex flex-col gap-3 sm:border-l sm:border-[#D28A4C] sm:px-8 lg:px-12 pt-8 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/30">D</div>
            <h4 className="font-bold text-sm text-foreground">Alertas de lançamentos</h4>
            <p className="text-xs text-muted leading-relaxed">Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.</p>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l lg:border-[#D28A4C] pt-8 lg:pt-0 lg:pl-12 justify-center">
          <h4 className="font-bold text-sm text-foreground">Antecipe-se ao próximo lançamento</h4>
          <form onSubmit={handleSubmit} className="flex border border-surface rounded-lg bg-[#1f140f] overflow-hidden focus-within:ring-1 focus-within:ring-primary">
            <input
              type="email"
              placeholder="digite seu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent px-3 py-2.5 text-xs text-foreground placeholder:text-muted/50 flex-1 focus:outline-none"
            />
            <button type="submit" className="bg-primary px-5 py-2.5 text-xs font-bold text-[#140D0A] hover:bg-primary/80 transition-colors shrink-0">
              Enviar
            </button>
          </form>
          <p className="text-xs text-muted leading-relaxed">Receba lançamentos selecionados, histórias de criadores e novidades do mercado.</p>
        </div>
      </div>

      {/* 2. Barra de Marca e Contactos */}
      <div className="bg-[#38220F] text-foreground w-full px-8 lg:px-16 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center border-b border-surface/50 text-[11px]">
        <span className="font-bold text-sm tracking-widest">KURIO</span>
        <span>Feito para colecionadores, criadores e cultura</span>
        <span>contato@email.com</span>
        <span className="text-sm">+55 11 4002 8922</span>
      </div>

      {/* 3. Secção Inferior: Colunas de Links */}
      <div className="w-full text-foreground px-8 lg:px-16 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-3">
          <span className="font-bold uppercase tracking-wider text-[11px]">Meu perfil</span>
          <Link to="/perfil" className="hover:text-primary">Meu perfil</Link>
          <Link to="/" className="hover:text-primary">Minha coleção</Link>
          <Link to="/" className="hover:text-primary">Atividade</Link>
          <Link to="/" className="hover:text-primary">Estúdio do criador</Link>
          <Link to="/" className="hover:text-primary">Lista de interesse</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Central de ajuda</span>
          <Link to="/" className="hover:text-primary">Central de ajuda</Link>
          <Link to="/" className="hover:text-primary">Como comprar NFTs</Link>
          <Link to="/" className="hover:text-primary">Carteira e segurança</Link>
          <Link to="/" className="hover:text-primary">Política do mercado</Link>
          <Link to="/" className="hover:text-primary">Denunciar item</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Coleções</span>
          <Link to="/" className="hover:text-primary">Arte digital</Link>
          <Link to="/" className="hover:text-primary">Fotografia</Link>
          <Link to="/" className="hover:text-primary">Música</Link>
          <Link to="/" className="hover:text-primary">Arte 3D</Link>
          <Link to="/" className="hover:text-primary">Utilidade</Link>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Redes sociais</span>
            <div className="flex gap-2">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded bg-[#1f140f] border border-surface flex items-center justify-center cursor-pointer hover:opacity-80 text-[#D28A4C] transition-opacity">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded bg-[#1f140f] border border-surface flex items-center justify-center cursor-pointer hover:opacity-80 text-[#D28A4C] transition-opacity">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 rounded bg-[#1f140f] border border-surface flex items-center justify-center cursor-pointer hover:opacity-80 text-[#D28A4C] transition-opacity">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Carteiras compatíveis</span>
            <p className="w-fit bg-[#38220F] border border-[#55321F] rounded-[6px] px-[10.5px] py-[7px] text-[10px] tracking-tight text-[#E89B55]">
              METAMASK · WALLETCONNECT · COINBASE
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#140D0A] w-full px-8 lg:px-16 text-center py-6 border-t border-surface/50 text-[10px] text-muted">
        © 2026 Kurio. Propriedade digital para todos.
      </div>
    </footer>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    // 1. Envolvemos a base do layout com AuthProvider
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col text-foreground font-mono pb-[88px] md:pb-0">
          
          {/* 2. O Modal de Login injetado no topo. Fica escondido até ser invocado */}
          <LoginModal />
          
          <Navbar />
          
          <main className="flex-1 flex flex-col">
            <Outlet />
          </main>
          
          <div className="hidden md:block">
            <GlobalFooter />
          </div>

          <BottomNav />
        </div>
      </CartProvider>
    </AuthProvider>
  ),
});

    // 1. Definição do tipo para a validação da URL
    type HomeSearch = {
      q?: string;
      collection?: string;
      network?: string;
      minPrice?: string;
      maxPrice?: string;
      tab?: string;
    };

    // 2. Substitua a sua variável indexRoute antiga por esta:
    const indexRoute = createRoute({ 
      getParentRoute: () => rootRoute, 
      path: '/', 
      validateSearch: (search: Record<string, unknown>): HomeSearch => {
        return {
          q: (search.q as string) || '',
          collection: (search.collection as string) || '',
          network: (search.network as string) || '',
          minPrice: (search.minPrice as string) || '0.02',
          maxPrice: (search.maxPrice as string) || '12.30',
          tab: (search.tab as string) || 'todos',
        };
      },
      component: HomePage 
    });
const detailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/nft/$id', component: NftDetailPage });
const carrinhoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/carrinho', component: CartPage });
const mercadoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/mercado', component: () => <div className="p-8 text-foreground font-mono">Página Mercado (Em Breve)</div> });
const criadoresRoute = createRoute({ getParentRoute: () => rootRoute, path: '/criadores', component: () => <div className="p-8 text-foreground font-mono">Página Criadores (Em Breve)</div> });
const aprendaRoute = createRoute({ getParentRoute: () => rootRoute, path: '/aprenda', component: () => <div className="p-8 text-foreground font-mono">Página Aprenda (Em Breve)</div> });
const pagamentoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pagamento', component: PaymentPage });
const perfilRoute = createRoute({ getParentRoute: () => rootRoute, path: '/perfil', component: ProfilePage });

// Removida a antiga loginRoute do array
const routeTree = rootRoute.addChildren([
  indexRoute,
  detailRoute,
  mercadoRoute,
  criadoresRoute,
  aprendaRoute,
  carrinhoRoute,
  pagamentoRoute,
  perfilRoute,
]);

const router = createRouter({
  routeTree,
  context: { queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  // Escuta os eventos do Socket e atualiza o React Query
  useEffect(() => {
    socket.connect();

    socket.on('nft.updated', (updatedData) => {
      console.log('Recebido evento do Socket:', updatedData);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueriesData({ queryKey: ['nfts'] }, (oldData: any) => {
        if (!oldData) return oldData;

        if (Array.isArray(oldData)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return oldData.map((nft: any) => 
            String(nft.id) === String(updatedData.id)
              ? { ...nft, price: updatedData.price } 
              : nft
          );
        }

        if (String(oldData.id) === String(updatedData.id)) {
          return { ...oldData, price: updatedData.price };
        }

        return oldData;
      });
    });

    return () => {
      socket.off('nft.updated');
      socket.disconnect();
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;