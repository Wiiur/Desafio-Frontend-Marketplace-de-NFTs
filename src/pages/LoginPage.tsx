// src/pages/LoginPage.tsx
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { EyeOff } from 'lucide-react';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full bg-[#0a0604] font-mono flex flex-col items-center px-6 pt-24 pb-12">
      
      {/* Logótipo Topo */}
      <Link to="/" className="text-3xl font-bold tracking-[0.3em] text-foreground mb-16">
        KURIO
      </Link>

      <div className="w-full max-w-[340px] flex flex-col items-center animate-in fade-in duration-300">
        
        <h1 className="text-[17px] font-bold text-foreground mb-8 tracking-wide">
          {isLogin ? 'Entrar' : 'Criar perfil de colecionador'}
        </h1>

        <form className="w-full flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Campos de Registo */}
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Nome de usuário" 
              className="w-full bg-transparent border border-[#38220F] rounded-md px-4 py-3.5 text-[12px] text-muted placeholder:text-[#8a7a6c] focus:outline-none focus:border-[#D28A4C] transition-colors" 
            />
          )}
          
          {/* Campo Email Comum */}
          <input 
            type={isLogin ? "email" : "text"} 
            placeholder={isLogin ? "contato@email.com" : "Digite seu e-mail"} 
            className="w-full bg-transparent border border-[#38220F] rounded-md px-4 py-3.5 text-[12px] text-muted placeholder:text-[#8a7a6c] focus:outline-none focus:border-[#D28A4C] transition-colors" 
          />
          
          {/* Campo Senha */}
          <div className="relative">
            <input 
              type="password" 
              placeholder={isLogin ? "***********" : "Senha"} 
              className="w-full bg-transparent border border-[#38220F] rounded-md px-4 py-3.5 text-[12px] text-muted placeholder:text-[#8a7a6c] focus:outline-none focus:border-[#D28A4C] transition-colors" 
            />
            <EyeOff className="absolute right-4 top-[14px] h-4 w-4 text-[#8a7a6c] cursor-pointer hover:text-[#D28A4C] transition-colors" />
          </div>

          {/* Confirmar Senha (Registo) */}
          {!isLogin && (
            <div className="relative">
              <input 
                type="password" 
                placeholder="Confirmar senha" 
                className="w-full bg-transparent border border-[#38220F] rounded-md px-4 py-3.5 text-[12px] text-muted placeholder:text-[#8a7a6c] focus:outline-none focus:border-[#D28A4C] transition-colors" 
              />
              <EyeOff className="absolute right-4 top-[14px] h-4 w-4 text-[#8a7a6c] cursor-pointer hover:text-[#D28A4C] transition-colors" />
            </div>
          )}

          {/* Esqueceu a senha */}
          {isLogin && (
            <div className="flex justify-end mt-1 mb-2">
              <a href="#" className="text-[11px] text-[#D28A4C] hover:opacity-80 transition-opacity tracking-wide">
                Esqueceu a senha?
              </a>
            </div>
          )}

          {/* Botão Principal */}
          <button 
            type="submit" 
            className={`w-full bg-[#D28A4C] text-[#140D0A] font-bold text-[13px] py-4 rounded-md hover:bg-[#D28A4C]/90 tracking-wide transition-colors ${!isLogin ? 'mt-4' : ''}`}
          >
            {isLogin ? "Entrar" : "Criar perfil"}
          </button>
        </form>

        {/* Divisória Redes Sociais */}
        <div className="flex items-center w-full gap-3 mt-10 mb-6">
          <div className="h-px bg-[#38220F] flex-1"></div>
          <span className="text-[10px] text-muted tracking-wide">Ou continue com</span>
          <div className="h-px bg-[#38220F] flex-1"></div>
        </div>

        {/* Botões Sociais */}
        <div className="flex flex-col gap-3 w-full mb-12">
          <button className="flex items-center justify-center gap-3 w-full py-3.5 rounded-md border border-[#38220F] bg-transparent text-[11px] text-[#e0d6cc] hover:bg-[#38220F]/30 transition-colors tracking-wide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>
          <button className="flex items-center justify-center gap-3 w-full py-3.5 rounded-md border border-[#38220F] bg-transparent text-[11px] text-[#e0d6cc] hover:bg-[#38220F]/30 transition-colors tracking-wide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continuar com Facebook
          </button>
        </div>

        {/* Toggle Footer */}
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-[11px] text-[#e0d6cc] hover:text-[#D28A4C] transition-colors tracking-wide"
        >
          {isLogin ? "Novo na Kurio? Crie uma conta" : "Já tem uma conta? Entre"}
        </button>

      </div>
    </div>
  );
}