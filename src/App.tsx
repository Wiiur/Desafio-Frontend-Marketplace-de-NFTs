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
import { LoginPage } from './pages/LoginPage';
import { BottomNav } from './components/BottomNav';

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
              {/* Ícones sociais omitidos para brevidade, mantenha os seus se preferir */}
              <a href="#" className="w-8 h-8 rounded bg-[#1f140f] border border-surface flex items-center justify-center cursor-pointer hover:opacity-80 text-[#D28A4C]">FB</a>
              <a href="#" className="w-8 h-8 rounded bg-[#1f140f] border border-surface flex items-center justify-center cursor-pointer hover:opacity-80 text-[#D28A4C]">IG</a>
              <a href="#" className="w-8 h-8 rounded bg-[#1f140f] border border-surface flex items-center justify-center cursor-pointer hover:opacity-80 text-[#D28A4C]">TW</a>
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
    <CartProvider>
      {/* Adicionado pb-[88px] no mobile para a BottomNav não sobrepor o conteúdo */}
      <div className="min-h-screen flex flex-col  text-foreground font-mono pb-[88px] md:pb-0">
        
        {/* Navbar - Já tem as classes responsivas lá dentro */}
        <Navbar />
        
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        
        {/* Escondemos o Footer gigante no Mobile */}
        <div className="hidden md:block">
          <GlobalFooter />
        </div>

        {/* Mostramos a BottomNav Apenas no Mobile */}
        <BottomNav />
      </div>
    </CartProvider>
  ),
});

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const detailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/nft/$id', component: NftDetailPage });
const carrinhoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/carrinho', component: CartPage });
const mercadoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/mercado', component: () => <div className="p-8 text-foreground font-mono">Página Mercado (Em Breve)</div> });
const criadoresRoute = createRoute({ getParentRoute: () => rootRoute, path: '/criadores', component: () => <div className="p-8 text-foreground font-mono">Página Criadores (Em Breve)</div> });
const aprendaRoute = createRoute({ getParentRoute: () => rootRoute, path: '/aprenda', component: () => <div className="p-8 text-foreground font-mono">Página Aprenda (Em Breve)</div> });
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: '/login', component: LoginPage });
const pagamentoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pagamento', component: PaymentPage });
const perfilRoute = createRoute({ getParentRoute: () => rootRoute, path: '/perfil', component: ProfilePage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  detailRoute,
  mercadoRoute,
  criadoresRoute,
  aprendaRoute,
  carrinhoRoute,
  pagamentoRoute,
  loginRoute,
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;