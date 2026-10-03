// src/pages/ProfilePage.tsx
import { useState } from 'react';
import { 
  User, MapPin, ShoppingCart, Heart, Activity, 
  Download, AlertTriangle, LogOut, ChevronDown, EyeOff, Image as ImageIcon 
} from 'lucide-react';

interface FormGroupProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  isPassword?: boolean;
}

const FormGroup = ({ label, required = true, type = "text", placeholder = "", defaultValue = "", isPassword = false }: FormGroupProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] text-foreground tracking-wide">
      {label} {required && <span className="text-[#D28A4C]">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full bg-transparent border border-[#241612] rounded-md px-3 py-2.5 text-xs text-foreground placeholder:text-muted/40 focus:outline-none focus:border-[#D28A4C] transition-colors"
      />
      {isPassword && (
        <EyeOff className="absolute right-3 top-3 h-4 w-4 text-[#D28A4C] opacity-50 cursor-pointer hover:opacity-100 transition-opacity" />
      )}
    </div>
  </div>
);

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'dados' | 'carteiras'>('dados');

  const menuItems = [
    { id: 'dados', label: 'Dados do perfil', icon: User },
    { id: 'carteiras', label: 'Carteiras', icon: MapPin },
    { id: 'atividade', label: 'Atividade', icon: ShoppingCart },
    { id: 'interesse', label: 'Lista de interesse', icon: Heart },
    { id: 'ofertas', label: 'Ofertas', icon: Activity },
    { id: 'arquivos', label: 'Arquivos baixados', icon: Download },
    { id: 'suporte', label: 'Suporte', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen w-full bg-[#140D0A] font-mono pb-20">
      
      {/* Container Principal */}
      <div className="container mx-auto px-6 lg:px-16 pt-12 max-w-[1400px] flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR ESQUERDA */}
        <div className="w-full md:w-[280px] bg-[#241612] flex flex-col pt-8 pb-4 border border-[#241612]/50 shrink-0 h-fit">
          <h2 className="text-[15px] font-bold text-foreground px-8 mb-6 tracking-wide">Meu perfil</h2>
          
          <nav className="flex flex-col w-full">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => (item.id === 'dados' || item.id === 'carteiras') && setActiveTab(item.id)}
                  className={`flex items-center gap-4 px-8 py-3.5 text-xs tracking-wide transition-colors relative
                    ${isActive ? 'text-[#D28A4C] font-bold' : 'text-[#D28A4C] hover:bg-[#241612]/50'}`}
                >
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D28A4C]"></div>}
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2.5 : 1.5} />
                  {item.label}
                </button>
              );
            })}

            <div className="w-full h-px bg-[#38220F] my-2"></div>
            
            <button className="flex items-center gap-4 px-8 py-3.5 text-xs text-[#D28A4C] hover:bg-[#241612]/50 tracking-wide transition-colors">
              <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              Sair
            </button>
          </nav>
        </div>

        {/* ÁREA DE CONTEÚDO DIREITA */}
        <div className="flex-1 flex flex-col pt-2">
          
          {activeTab === 'dados' && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-[15px] font-bold text-foreground mb-8 tracking-wide">Perfil do colecionador</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                <FormGroup label="Nome de exibição" />
                <FormGroup label="Nome de usuário" />
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

                <FormGroup label="Apelido da carteira" />

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] text-foreground tracking-wide">Avatar</label>
                  <div className="flex items-center gap-4">
                    <div className="w-[42px] h-[42px] rounded-full border border-[#3F2319] flex items-center justify-center bg-[#2F1D15]">
                      <ImageIcon className="h-4 w-4 text-[#D28A4C]" strokeWidth={1.5} />
                    </div>
                    <button className="bg-[#D28A4C] text-[#140D0A] font-bold text-[11px] px-6 py-2.5 rounded-md hover:bg-[#D28A4C]/80 transition-colors tracking-wide">
                      Alterar
                    </button>
                    <button className="text-[11px] text-foreground hover:text-[#D28A4C] transition-colors tracking-wide">
                      Remover
                    </button>
                  </div>
                </div>
              </div>

              <h2 className="text-[13px] font-bold text-foreground mb-6 tracking-wide">Alterar senha</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
                <FormGroup label="Senha atual" type="password" isPassword />
                <div className="hidden md:block"></div>
                <FormGroup label="Nova senha" type="password" isPassword />
                <div className="hidden md:block"></div>
                <FormGroup label="Confirmar nova senha" type="password" isPassword />
              </div>

              <button className="bg-[#D28A4C] text-[#140D0A] font-bold text-[11px] px-10 py-2.5 rounded-md hover:bg-[#D28A4C]/80 transition-colors tracking-wide">
                Salvar
              </button>
            </div>
          )}

          {/* TAB 2: CARTEIRAS */}
          {activeTab === 'carteiras' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-end mb-2">
                <h1 className="text-[15px] font-bold text-foreground tracking-wide">Carteira principal</h1>
                <button className="text-[#D28A4C] text-[11px] hover:opacity-80 transition-opacity tracking-wide">Adicionar</button>
              </div>
              <p className="text-[11px] text-muted mb-8 tracking-wide">
                Estas carteiras ficam disponíveis no pagamento e para receber NFTs comprados.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                <FormGroup label="Nome de exibição" />
                <FormGroup label="Apelido da carteira" />
                
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] text-foreground tracking-wide">Rede <span className="text-[#D28A4C]">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-transparent border border-[#38220F] rounded-md px-3 py-2.5 text-xs text-muted focus:outline-none focus:border-[#D28A4C] appearance-none cursor-pointer">
                      <option>Selecione uma rede</option>
                      <option>Ethereum</option>
                      <option>Polygon</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-[#D28A4C] pointer-events-none" />
                  </div>
                </div>

                <FormGroup label="Nome do perfil" />
                
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] text-foreground tracking-wide">Endereço da carteira <span className="text-[#D28A4C]">*</span></label>
                  <input type="text" placeholder="Endereço 0x da carteira" className="w-full bg-transparent border border-[#38220F] rounded-md px-3 py-2.5 text-xs text-muted focus:outline-none focus:border-[#D28A4C]" />
                </div>

                <div className="flex flex-col justify-end">
                  <input type="text" placeholder="ENS ou carteira secundária (opcional)" className="w-full bg-transparent border border-[#38220F] rounded-md px-3 py-2.5 text-xs text-muted focus:outline-none focus:border-[#D28A4C]" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] text-foreground tracking-wide">Tipo de carteira <span className="text-[#D28A4C]">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-transparent border border-[#38220F] rounded-md px-3 py-2.5 text-xs text-muted focus:outline-none focus:border-[#D28A4C] appearance-none cursor-pointer">
                      <option>Selecione uma carteira</option>
                      <option>MetaMask</option>
                      <option>Coinbase</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-[#D28A4C] pointer-events-none" />
                  </div>
                </div>

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
              </div>

              <div className="mb-14">
                <button className="bg-[#D28A4C] text-[#140D0A] font-bold text-[11px] px-6 py-2.5 rounded-md hover:bg-[#D28A4C]/80 transition-colors tracking-wide">
                  Salvar carteira
                </button>
              </div>

              {/* Carteira Secundária */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-[13px] font-bold text-foreground tracking-wide mb-2">Carteira secundária</h2>
                  <p className="text-[11px] text-muted tracking-wide">
                    Você ainda não adicionou uma carteira secundária.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-3.5 h-3.5 rounded-full border border-[#D28A4C]"></div>
                    <span className="text-[11px] text-foreground tracking-wide">Igual à carteira principal</span>
                  </div>
                  <button className="text-[#D28A4C] text-[11px] hover:opacity-80 transition-opacity tracking-wide">
                    Adicionar
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}