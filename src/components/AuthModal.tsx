// src/components/AuthModal.tsx
import { useState } from 'react';
import { X, EyeOff } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  // Estado para controlar se estamos na aba Login ou Cadastro
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-mono">
      <div className="bg-[#241612] w-full max-w-[400px] border border-[#241612] border-b-[6px] border-b-[#D28A4C] relative flex flex-col shadow-2xl rounded-b-lg">
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-8 pt-10 pb-8 flex flex-col items-center">
          
          {/* Abas Superiores */}
          <div className="flex items-center gap-2 text-[15px] mb-6 tracking-wide">
            <button 
              onClick={() => setIsLogin(true)} 
              className={`transition-colors ${isLogin ? 'text-[#D28A4C] font-bold' : 'text-foreground hover:text-[#D28A4C]'}`}
            >
              Entrar
            </button>
            <span className="text-[#D28A4C] font-light">|</span>
            <button 
              onClick={() => setIsLogin(false)} 
              className={`transition-colors ${!isLogin ? 'text-[#D28A4C] font-bold' : 'text-foreground hover:text-[#D28A4C]'}`}
            >
              Criar conta
            </button>
          </div>

          {/* Texto Descritivo */}
          <p className="text-[12px] text-foreground text-center max-w-[260px] leading-relaxed mb-6 tracking-wide">
            {isLogin 
              ? "Entre para gerenciar sua carteira, coleção e perfil de criador." 
              : "Crie seu perfil de colecionador e conecte sua carteira quando quiser."}
          </p>

          {/* Formulário Dinâmico */}
          <form className="w-full flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <input 
                type="text" 
                placeholder="Nome de usuário" 
                className="w-full bg-transparent border border-[#38220F] rounded-md px-4 py-3 text-[11px] text-foreground placeholder:text-muted/50 focus:outline-none focus:border-[#D28A4C] transition-colors" 
              />
            )}
            
            <input 
              type={isLogin ? "email" : "text"} 
              placeholder={isLogin ? "contato@email.com" : "Digite seu e-mail"} 
              className="w-full bg-transparent border border-[#38220F] rounded-md px-4 py-3 text-[11px] text-foreground placeholder:text-muted/50 focus:outline-none focus:border-[#D28A4C] transition-colors" 
            />
            
            <div className="relative">
              <input 
                type="password" 
                placeholder={isLogin ? "***********" : "Senha"} 
                className="w-full bg-transparent border border-[#38220F] rounded-md px-4 py-3 text-[11px] text-foreground placeholder:text-muted/50 focus:outline-none focus:border-[#D28A4C] transition-colors" 
              />
              <EyeOff className="absolute right-3.5 top-3.5 h-3.5 w-3.5 text-muted hover:text-foreground cursor-pointer transition-colors" />
            </div>

            {!isLogin && (
              <input 
                type="password" 
                placeholder="Confirmar senha" 
                className="w-full bg-transparent border border-[#38220F] rounded-md px-4 py-3 text-[11px] text-foreground placeholder:text-muted/50 focus:outline-none focus:border-[#D28A4C] transition-colors" 
              />
            )}

            {isLogin && (
              <div className="flex justify-end mt-0.5 mb-1">
                <a href="#" className="text-[9px] text-muted hover:text-[#D28A4C] transition-colors tracking-wide">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-[#D28A4C] text-[#140D0A] font-bold text-[11px] py-3.5 rounded-md hover:bg-[#D28A4C]/80 mt-1 tracking-wide transition-colors"
            >
              {isLogin ? "Entrar" : "Criar conta"}
            </button>
          </form>

          {/* Divisória Redes Sociais */}
          <div className="flex items-center w-full gap-3 my-6">
            <div className="h-px bg-[#38220F] flex-1"></div>
            <span className="text-[9px] text-muted tracking-wide">Ou continue com</span>
            <div className="h-px bg-[#38220F] flex-1"></div>
          </div>

          {/* Botões Sociais */}
          <div className="flex flex-col gap-2 w-full">
            <button className="flex items-center border border-[#38220F] justify-center gap-3 w-full py-2 text-[10px] text-muted hover:text-foreground transition-colors tracking-wide">
              {/* Ícone Google */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuar com Google
            </button>
            <button className="flex items-center border border-[#38220F] justify-center gap-3 w-full py-2 text-[10px] text-muted hover:text-foreground transition-colors tracking-wide">
              {/* Ícone Facebook */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continuar com Facebook
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}