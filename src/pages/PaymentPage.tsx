// src/pages/PaymentPage.tsx
import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronDown, ChevronLeft, MoreVertical } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { socket } from '../services/socket';
import { api } from '../services/api';
import { ShadcnSelect } from '../components/ui/select';

interface FormGroupProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}

const FormGroup = ({ label, required = true, type = "text", placeholder = "", defaultValue = "" }: FormGroupProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] text-foreground tracking-wide">
      {label} {required && <span className="text-[#D28A4C]">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="w-full bg-transparent border border-[#38220F] rounded-md px-3 py-2.5 text-xs text-foreground placeholder:text-muted/40 focus:outline-none focus:border-[#D28A4C] transition-colors"
    />
  </div>
);

// Função para gerar UUIDs (Chave de Idempotência Sênior)
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export function PaymentPage() {
  const { items, clearCart } = useCart();
  
  const [selectedWallet, setSelectedWallet] = useState('coinbase');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedConnected, setSelectedConnected] = useState('reserva');

  const subtotal = items.reduce((acc, item) => acc + Number(item.price), 0);
  const networkFee = 0.016;
  const total = subtotal > 0 ? subtotal + networkFee : 0;

  const { isAuthenticated, openLoginModal } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);

  // 1. Escuta a confirmação da Blockchain via Socket
  useEffect(() => {
    socket.on('order.updated', (data) => {
      console.log('Socket recebido:', data);
      if (data.status === 'confirmed') {
        setIsProcessing(false);
        setShowSuccessModal(true);
      }
    });

    return () => {
      socket.off('order.updated');
    };
  }, []);

  // 2. Chama a API de Checkout (AGORA COM IDEMPOTÊNCIA)
  const executeCheckout = async () => {
    console.log('A executar checkout na API com idempotência...');
    setIsProcessing(true);
    
    const idempotencyKey = generateUUID();

    try {
      await api.post('/checkout', 
        { items, total, network: selectedNetwork, wallet: selectedWallet },
        {
          headers: {
            'Idempotency-Key': idempotencyKey
          }
        }
      );
    } catch (error) {
      console.error('Erro na compra:', error);
      setIsProcessing(false);
    }
  };

  // 3. Se acabou de fazer login e tinha compra pendente, avança!
  useEffect(() => {
    if (isAuthenticated && pendingCheckout) {
      console.log('Login feito com sucesso! A retomar compra pendente...');
      
      setTimeout(() => {
        setPendingCheckout(false);
        executeCheckout();
      }, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, pendingCheckout]);

  // 4. Lógica do clique no botão
  const handleCheckout = () => {
    console.log('Botão clicado. Está logado?', isAuthenticated);
    
    if (!isAuthenticated) {
      console.log('Não está logado. A abrir o Pop-up de Login...');
      setPendingCheckout(true);
      openLoginModal();
      return; 
    }
    
    console.log('Já está logado. A avançar para o pagamento...');
    executeCheckout();
  };

  return (
    <div className="w-full font-mono bg-[#140D0A]">
      
      {/* ========================================= */}
      {/* VERSÃO MOBILE                               */}
      {/* ========================================= */}
      <div className="md:hidden flex flex-col px-6 pt-10 pb-8 min-h-[calc(100vh-80px)]">
        
        <div className="flex items-center mb-10 relative">
          <button onClick={() => window.history.back()} className="w-[34px] h-[34px] rounded-full bg-[#1a110c] flex items-center justify-center text-[#D28A4C] hover:opacity-80 transition-opacity">
            <ChevronLeft className="h-5 w-5 -ml-0.5" />
          </button>
          <h1 className="text-[16px] font-bold text-foreground absolute left-1/2 -translate-x-1/2 tracking-wide whitespace-nowrap">
            Pagamento com carteira
          </h1>
        </div>

        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-[13px] font-bold text-foreground tracking-wide">Carteira conectada</h2>
          <button className="text-[11px] font-bold text-[#D28A4C] tracking-wide hover:opacity-80 transition-opacity">Trocar carteira</button>
        </div>

        <div className="flex flex-col gap-3.5 mb-10">
          <div onClick={() => setSelectedConnected('reserva')} className="bg-[#1a110c] p-4 rounded-xl flex items-start gap-4 cursor-pointer border border-transparent transition-colors">
            <div className={`mt-0.5 w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center shrink-0 ${selectedConnected === 'reserva' ? 'border-[#D28A4C]' : 'border-[#38220F]'}`}>
              {selectedConnected === 'reserva' && <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-bold text-[13px] text-foreground tracking-wide">Reserva</span>
              <span className="text-[11px] text-[#8a7a6c] tracking-wide">nova.kurio.eth</span>
              <span className="text-[11px] text-[#8a7a6c] tracking-wide">Rede Polygon</span>
            </div>
            <button className="text-[#8a7a6c] hover:text-foreground p-1"><MoreVertical className="h-4 w-4" /></button>
          </div>

          <div onClick={() => setSelectedConnected('principal')} className="bg-[#1a110c] p-4 rounded-xl flex items-start gap-4 cursor-pointer border border-transparent transition-colors">
            <div className={`mt-0.5 w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center shrink-0 ${selectedConnected === 'principal' ? 'border-[#D28A4C]' : 'border-[#38220F]'}`}>
              {selectedConnected === 'principal' && <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-bold text-[13px] text-foreground tracking-wide">Principal</span>
              <span className="text-[11px] text-[#8a7a6c] tracking-wide">0xA91F…E82C</span>
              <span className="text-[11px] text-[#8a7a6c] tracking-wide">Rede principal Ethereum</span>
            </div>
            <button className="text-[#8a7a6c] hover:text-foreground p-1"><MoreVertical className="h-4 w-4" /></button>
          </div>
        </div>

        <h2 className="text-[13px] font-bold text-foreground tracking-wide mb-4 px-1">Carteira e rede</h2>
        
        <div className="flex flex-col gap-3.5 mb-10">
          <div onClick={() => setSelectedWallet('walletconnect')} className="bg-[#1a110c] p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#241612] flex items-center justify-center text-[#D28A4C] font-bold text-[11px] shrink-0">W</div>
            <span className="text-[12px] text-foreground tracking-wide flex-1">WalletConnect</span>
            <div className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center shrink-0 ${selectedWallet === 'walletconnect' ? 'border-[#D28A4C]' : 'border-[#38220F]'}`}>
              {selectedWallet === 'walletconnect' && <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>}
            </div>
          </div>

          <div onClick={() => setSelectedWallet('metamask')} className="bg-[#1a110c] p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#241612] flex items-center justify-center text-[#D28A4C] font-bold text-[11px] shrink-0">M</div>
            <span className="text-[12px] text-foreground tracking-wide flex-1">MetaMask</span>
            <div className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center shrink-0 ${selectedWallet === 'metamask' ? 'border-[#D28A4C]' : 'border-[#38220F]'}`}>
              {selectedWallet === 'metamask' && <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>}
            </div>
          </div>

          <div onClick={() => setSelectedWallet('coinbase')} className="bg-[#1a110c] p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#241612] border border-[#38220F]/50 flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D28A4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <span className="text-[12px] text-foreground tracking-wide flex-1">Coinbase Wallet</span>
            <div className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center shrink-0 ${selectedWallet === 'coinbase' ? 'border-[#D28A4C]' : 'border-[#38220F]'}`}>
              {selectedWallet === 'coinbase' && <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>}
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-auto gap-8 pt-4">
          <div className="flex justify-end items-center gap-4">
            <span className="text-[13px] font-bold text-foreground tracking-wide">Total:</span>
            <span className="text-[15px] font-bold text-[#D28A4C] font-mono">{total.toFixed(3)} ETH</span>
          </div>

          <button 
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0 || isProcessing}
            className="w-full flex items-center justify-center rounded-full bg-[#D28A4C] h-[52px] font-bold text-[#140D0A] transition-colors hover:bg-[#D28A4C]/90 text-[13px] tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'A processar na Blockchain...' : 'Confirmar compra'}
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* VERSÃO DESKTOP                              */}
      {/* ========================================= */}
      <div className="hidden md:block container mx-auto px-6 lg:px-16 py-12 max-w-[1400px]">
        <div className="text-[11px] text-foreground mb-12 flex items-center gap-2 font-bold tracking-wide">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <span className="font-normal text-muted">/</span>
          <Link to="/mercado" className="hover:text-primary transition-colors">Mercado</Link>
          <span className="font-normal text-muted">/</span>
          <span>Pagamento</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-20 gap-y-16 mb-20">
          
          <div className="lg:col-span-7 flex flex-col">
            <h1 className="text-[15px] font-bold text-foreground mb-8 tracking-wide">Perfil do colecionador</h1>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormGroup label="Nome de exibição" />
              <FormGroup label="Nome de usuário" />
              
              <ShadcnSelect
                label="Rede *"
                options={[
                  { label: 'Selecione uma rede', value: '' },
                  { label: 'Ethereum', value: 'ethereum' },
                  { label: 'Polygon', value: 'polygon' }
                ]}
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
              />
              
              <FormGroup label="Nome do perfil" />
              
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-foreground tracking-wide">Endereço da carteira <span className="text-[#D28A4C]">*</span></label>
                <input type="text" placeholder="Endereço 0x da carteira" className="w-full bg-transparent border border-[#38220F] rounded-md px-3 py-2.5 text-xs text-muted placeholder:text-muted/40 focus:outline-none focus:border-[#D28A4C]" />
              </div>
              
              <div className="flex flex-col justify-end">
                <input type="text" placeholder="ENS ou carteira secundária (opcional)" className="w-full bg-transparent border border-[#38220F] rounded-md px-3 py-2.5 text-xs text-muted placeholder:text-muted/40 focus:outline-none focus:border-[#D28A4C]" />
              </div>

              <ShadcnSelect
                label="Tipo de carteira *"
                options={[
                  { label: 'Selecione uma carteira', value: '' },
                  { label: 'MetaMask', value: 'metamask' },
                  { label: 'Coinbase', value: 'coinbase' },
                  { label: 'WalletConnect', value: 'walletconnect' }
                ]}
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
              />
              
              <FormGroup label="Código de indicação" />
              <FormGroup label="E-mail" />
              
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-foreground tracking-wide">Nome ENS <span className="text-[#D28A4C]">*</span></label>
                <div className="flex">
                  <div className="relative w-24">
                    <select className="w-full bg-transparent border border-[#38220F] border-r-0 rounded-l-md px-3 py-2.5 text-xs text-foreground focus:outline-none appearance-none cursor-pointer">
                      <option>.eth</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-muted pointer-events-none" />
                  </div>
                  <input type="text" className="w-full bg-transparent border border-[#38220F] rounded-r-md px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-[#D28A4C]" />
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-3 mt-1">
                <div className="w-[14px] h-[14px] rounded-full border-2 border-[#D28A4C] flex items-center justify-center cursor-pointer"></div>
                <span className="text-[11px] text-foreground">Usar outra carteira?</span>
              </div>

              <div className="md:col-span-2 flex flex-col gap-2 mt-2">
                <label className="text-[11px] text-foreground tracking-wide">Observação do colecionador (opcional)</label>
                <textarea rows={4} className="w-full bg-transparent border border-[#38220F] rounded-md px-3 py-3 text-xs text-foreground focus:outline-none focus:border-[#D28A4C] resize-none"></textarea>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-[13px] font-bold text-foreground tracking-wide">Seus NFTs</h2>
              <span className="text-[11px] font-bold text-foreground">Subtotal</span>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              {items.length === 0 && <p className="text-xs text-muted">Nenhum item no carrinho.</p>}
              {items.map((item) => (
                <div key={item.id} className="bg-[#241612] p-2.5 rounded-md flex items-center justify-between border border-[#38220F]/40">
                  <div className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded object-cover bg-[#140D0A]" />
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-[11px] text-foreground">{item.title}</span>
                      <span className="text-[9px] text-muted tracking-wide">ID do token: #0{item.id}42</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-muted text-[10px]">(x 1)</span>
                    <span className="font-bold text-[#D28A4C] text-[12px]">{item.price} ETH</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-center text-muted hover:text-foreground cursor-pointer transition-colors mb-6 tracking-wide">
              Tem um código promocional? Aplique aqui
            </p>

            <div className="flex flex-col gap-3.5 text-[11px] mb-10">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Subtotal</span>
                <span className="text-foreground font-mono">{subtotal.toFixed(2)} ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Desconto do lançamento</span>
                <span className="text-foreground font-mono">(-) 00.00</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-foreground">Taxa de rede</span>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-foreground font-mono">{networkFee} ETH</span>
                  <span className="text-[9px] text-[#D28A4C] tracking-tight">Taxa estimada</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3">
                <span className="text-[13px] font-bold text-foreground">Total</span>
                <span className="text-[13px] font-bold text-[#D28A4C]">{total.toFixed(3)} ETH</span>
              </div>
            </div>

            <h3 className="text-[13px] font-bold text-center text-foreground mb-4">Carteira e rede</h3>
            
            <div className="flex flex-col gap-3 mb-6">
              <div onClick={() => setSelectedWallet('all')} className={`flex items-center gap-4 p-3.5 rounded-md cursor-pointer border transition-colors ${selectedWallet === 'all' ? 'border-[#D28A4C]' : 'border-[#38220F] hover:border-surface'}`}>
                <div className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center ${selectedWallet === 'all' ? 'border-[#D28A4C]' : 'border-[#38220F]'}`}>
                  {selectedWallet === 'all' && <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>}
                </div>
                <p className="inline-block bg-[#2a170e] border border-[#55321F] rounded-md px-2 py-1 text-[9px] tracking-tight text-[#E89B55]">
                  METAMASK · WALLETCONNECT · COINBASE
                </p>
              </div>
              <div onClick={() => setSelectedWallet('metamask')} className={`flex items-center gap-4 p-3.5 rounded-md cursor-pointer border transition-colors ${selectedWallet === 'metamask' ? 'border-[#D28A4C]' : 'border-[#38220F] hover:border-surface'}`}>
                <div className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center ${selectedWallet === 'metamask' ? 'border-[#D28A4C]' : 'border-[#38220F]'}`}>
                  {selectedWallet === 'metamask' && <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>}
                </div>
                <span className="text-[11px] text-foreground">MetaMask</span>
              </div>
              <div onClick={() => setSelectedWallet('coinbase')} className={`flex items-center gap-4 p-3.5 rounded-md cursor-pointer border transition-colors ${selectedWallet === 'coinbase' ? 'border-[#D28A4C]' : 'border-[#38220F] hover:border-surface'}`}>
                <div className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center ${selectedWallet === 'coinbase' ? 'border-[#D28A4C]' : 'border-[#38220F]'}`}>
                  {selectedWallet === 'coinbase' && <div className="w-1.5 h-1.5 rounded-full bg-[#D28A4C]"></div>}
                </div>
                <span className="text-[11px] text-foreground">Coinbase Wallet</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleCheckout}
              disabled={items.length === 0 || isProcessing}
              className="w-full rounded-md bg-[#D28A4C] py-3.5 font-bold text-[#140D0A] transition-colors hover:bg-[#D28A4C]/80 text-[12px] tracking-wide mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'A processar na Blockchain...' : 'Confirmar compra'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* MODAL DE SUCESSO (RECIBO)                 */}
      {/* ========================================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#140D0A]/95 backdrop-blur-sm p-4">

          <div className="bg-[#241612] w-full max-w-[500px] max-h-[85vh] overflow-y-auto border border-[#140D0A] border-b-[6px] border-b-[#D28A4C] relative flex flex-col font-mono shadow-2xl rounded-t-xl">
            
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                clearCart();
              }} 
              className="absolute top-5 right-5 text-[#D28A4C] hover:opacity-70 transition-opacity z-10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="p-6 sm:p-8 pt-10 pb-8 flex flex-col items-center">
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18V6C12 4.89543 12.8954 4 14 4H34C35.1046 4 36 4.89543 36 6V18" stroke="#D28A4C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 18H44V42C44 43.1046 43.1046 44 42 44H6C4.89543 44 4 43.1046 4 42V18Z" stroke="#D28A4C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 18L24 31L44 18" stroke="#D28A4C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="18" y="7" width="12" height="8" rx="1" stroke="#D28A4C" strokeWidth="1" strokeDasharray="1 1"/>
                  <text x="24" y="11" fill="#D28A4C" fontSize="3.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">THANK</text>
                  <text x="24" y="14" fill="#D28A4C" fontSize="3.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">YOU</text>
                </svg>
              </div>
              
              <p className="text-[11px] text-foreground mb-6 tracking-wide text-center">
                Seus NFTs agora estão na sua carteira
              </p>

              <div className="w-full h-px bg-[#D28A4C] mb-5"></div>

              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-2 text-[9px] sm:text-[10px] mb-5 px-1">
                <div className="flex flex-col gap-1.5">
                  <span className="text-muted">ID da transação</span>
                  <span className="text-foreground tracking-tight truncate">0xA91F…E82C</span>
                </div>
                <div className="flex flex-col gap-1.5 sm:border-l sm:border-[#D28A4C] sm:pl-3">
                  <span className="text-muted">Data</span>
                  <span className="text-foreground tracking-tight">29 Jul, 2026</span>
                </div>
                <div className="flex flex-col gap-1.5 sm:border-l sm:border-[#D28A4C] sm:pl-3">
                  <span className="text-muted">Total</span>
                  <span className="text-foreground tracking-tight">{total.toFixed(3)} ETH</span>
                </div>
                <div className="flex flex-col gap-1.5 sm:border-l sm:border-[#D28A4C] sm:pl-3">
                  <span className="text-muted">Carteira</span>
                  <span className="text-foreground tracking-tight capitalize truncate">
                    {selectedWallet === 'all' ? 'WalletConnect' : selectedWallet}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-[#D28A4C] mb-6"></div>

              <div className="w-full text-left mb-4">
                <h3 className="text-[11px] font-bold text-foreground tracking-wide mb-4">Detalhes da transação</h3>
                
                <div className="flex justify-between text-[9px] sm:text-[10px] text-foreground font-bold border-b border-[#D28A4C] pb-3 mb-4 px-1">
                  <span className="w-[55%]">NFTs</span>
                  <span className="w-[20%] text-center">Edições</span>
                  <span className="w-[25%] text-right">Subtotal</span>
                </div>

                <div className="flex flex-col gap-3.5 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-[9px] sm:text-[10px] px-1">
                      <div className="w-[55%] flex items-center gap-2.5">
                        <img src={item.imageUrl} className="w-8 h-8 rounded bg-[#1a110c] object-cover shrink-0" />
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                          <span className="font-bold text-foreground text-[10px] sm:text-[11px] truncate">{item.title}</span>
                          <span className="text-muted text-[8px] sm:text-[9px] tracking-wide truncate">ID: #0{item.id}42</span>
                        </div>
                      </div>
                      <div className="w-[20%] text-center text-muted tracking-widest">
                        (x 1)
                      </div>
                      <div className="w-[25%] text-right font-bold text-[#D28A4C] text-[10px] sm:text-[11px]">
                        {item.price} ETH
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5 border-b border-[#D28A4C] pt-4 mb-6 text-[9px] sm:text-[10px] px-1">
                  <div className="flex justify-end items-center">
                    <span className="text-foreground w-1/3 text-left pr-4 text-[13px]">Taxa de rede</span>
                    <span className="text-foreground font-bold w-1/4 text-right text-[12px]">{networkFee} ETH</span>
                  </div>
                  <div className="flex justify-end items-center">
                    <span className="text-foreground font-bold w-1/3 text-left text-[15px]">Total</span>
                    <span className="text-[#D28A4C] font-bold w-1/4 text-right text-[15px] sm:text-[15px]">{total.toFixed(3)} ETH</span>
                  </div>
                </div>

                <p className="text-[9px] sm:text-[10px] text-muted text-center leading-relaxed max-w-[340px] mx-auto mb-8 mt-6">
                  Transação confirmada na Ethereum. A propriedade foi transferida para sua carteira conectada e registrada na rede.
                </p>

                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      setShowSuccessModal(false);
                      clearCart();
                    }}
                    className="bg-[#D28A4C] text-[#140D0A] font-bold text-[11px] px-8 py-3 rounded-md hover:bg-[#D28A4C]/80 transition-colors tracking-wide w-full sm:w-auto"
                  >
                    Ver no Etherscan
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}