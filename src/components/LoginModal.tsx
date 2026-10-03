// src/components/LoginModal.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Eye, EyeOff } from 'lucide-react';

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
  };

  return (
    // NO MOBILE: Fundo 100% sólido. NO PC (md:): Fundo transparente com desfoque
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#140D0A] md:bg-[#0a0604]/80 md:backdrop-blur-sm md:px-4 font-mono">
      
      {/* NO MOBILE: Ocupa 100% da tela (h-full w-full). NO PC (md:): Vira um Pop-up menor e arredondado */}
      <div className="w-full h-full md:h-auto md:max-w-[420px] bg-[#140D0A] md:rounded-xl relative md:shadow-2xl border-0 md:border md:border-[#38220F] overflow-y-auto">
        
        {/* Barra Laranja no Topo */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#D28A4C]"></div>
        
        {/* Botão Fechar (X): Maior e mais fácil de tocar no Mobile */}
        <button 
          onClick={closeLoginModal}
          className="absolute top-6 right-6 md:top-4 md:right-4 text-[#8a7a6c] hover:text-[#D28A4C] transition-colors"
        >
          <X size={24} className="md:w-[18px] md:h-[18px]" />
        </button>

        {/* Espaçamento interno: adaptado para centralizar no mobile */}
        <div className="p-6 pt-20 md:p-8 md:pt-10 min-h-full flex flex-col justify-center md:block">
          
          <div className="flex items-center justify-center gap-3 text-sm font-bold mb-5">
            <button onClick={() => setIsLoginTab(true)} className={`transition-colors ${isLoginTab ? 'text-[#D28A4C]' : 'text-[#8a7a6c] hover:text-[#e0d6cc]'}`}>
              Entrar
            </button>
            <span className="text-[#38220F] font-normal">|</span>
            <button onClick={() => setIsLoginTab(false)} className={`transition-colors ${!isLoginTab ? 'text-[#D28A4C]' : 'text-[#8a7a6c] hover:text-[#e0d6cc]'}`}>
              Criar conta
            </button>
          </div>

          <p className="text-[11px] text-[#8a7a6c] text-center mb-8 px-2 leading-relaxed">
            {isLoginTab ? "Entre para gerenciar sua carteira, coleção e perfil de criador." : "Crie seu perfil de colecionador e conecte sua carteira quando quiser."}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLoginTab && (
              <div className="relative">
                <input type="text" placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#1a110c] border border-[#38220F] text-[#e0d6cc] placeholder:text-[#8a7a6c] rounded-lg px-4 py-3.5 text-[13px] focus:outline-none focus:border-[#D28A4C] transition-colors" required={!isLoginTab} />
              </div>
            )}
            <div className="relative">
              <input type="email" placeholder={isLoginTab ? "contato@email.com" : "Digite seu e-mail"} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#1a110c] border border-[#38220F] text-[#e0d6cc] placeholder:text-[#8a7a6c] rounded-lg px-4 py-3.5 text-[13px] focus:outline-none focus:border-[#D28A4C] transition-colors" required />
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder={isLoginTab ? "***********" : "Senha"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#1a110c] border border-[#38220F] text-[#e0d6cc] placeholder:text-[#8a7a6c] rounded-lg px-4 py-3.5 text-[13px] focus:outline-none focus:border-[#D28A4C] transition-colors pr-10" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7a6c] hover:text-[#D28A4C] transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {!isLoginTab && (
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar senha" className="w-full bg-[#1a110c] border border-[#38220F] text-[#e0d6cc] placeholder:text-[#8a7a6c] rounded-lg px-4 py-3.5 text-[13px] focus:outline-none focus:border-[#D28A4C] transition-colors pr-10" required={!isLoginTab} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7a6c] hover:text-[#D28A4C] transition-colors">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

            {isLoginTab && (
              <div className="flex justify-end mt-[-4px]">
                <button type="button" className="text-[11px] text-[#8a7a6c] hover:text-[#D28A4C] transition-colors">Esqueceu a senha?</button>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-[#D28A4C] text-[#140D0A] font-bold py-3.5 rounded-lg text-[13px] hover:bg-[#D28A4C]/90 transition-colors mt-2 disabled:opacity-70">
              {isLoading ? 'A processar...' : (isLoginTab ? 'Entrar' : 'Criar conta')}
            </button>
          </form>

          <div className="flex items-center gap-3 my-7">
            <div className="h-px bg-[#38220F] flex-1"></div>
            <span className="text-[10px] text-[#8a7a6c]">Ou continue com</span>
            <div className="h-px bg-[#38220F] flex-1"></div>
          </div>

          <div className="flex flex-col gap-3">
            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-[#38220F] text-[#a89b8d] text-[12px] font-bold hover:bg-[#1a110c] transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </button>
            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-[#38220F] text-[#a89b8d] text-[12px] font-bold hover:bg-[#1a110c] transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continuar com Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}