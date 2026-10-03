# 🎨 KURIO - NFT Marketplace

![KURIO Banner](https://placehold.co/1200x400/140D0A/D28A4C?text=KURIO+NFT+Marketplace)

> Um marketplace de NFTs moderno, responsivo e de alta fidelidade visual (Pixel-Perfect). Construído para proporcionar uma experiência premium tanto em Desktop como em dispositivos Mobile (App-like feel).

## 💻 Sobre o Projeto

O **KURIO** é uma aplicação Frontend em React que simula um marketplace completo de artes digitais e NFTs. O foco principal deste projeto foi a construção de interfaces complexas, garantindo uma transição fluida entre uma experiência web tradicional em desktop e uma interface nativa (tipo aplicação móvel) em smartphones.

Este projeto demonstra fortes conhecimentos em **React**, **TypeScript**, **Roteamento moderno**, **Gestão de Estado** e **Estilização Avançada com Tailwind CSS**.

## ✨ Funcionalidades Principais

* **Design Responsivo Avançado (Mobile-First):** Layouts que se adaptam drasticamente dependendo do dispositivo. Uso de `BottomNav` fixo e `Bottom Sheets` em mobile, contrastando com tabelas dinâmicas e modais em desktop.
* **Catálogo de NFTs:** Listagem de NFTs com sistema de filtros e pesquisa.
* **Detalhes do Produto (NFT):** Páginas dinâmicas com visualização de atributos, edição, e adição ao carrinho com seletor de quantidades.
* **Carrinho de Compras:** Gestão de estado global com Context API. Cálculos em tempo real de subtotais e simulação de taxas de rede (Gas fees).
* **Fluxo de Checkout/Pagamento:** Interface imersiva de seleção de carteira (MetaMask, WalletConnect, Coinbase) e um modal de recibo transacional detalhado.
* **Autenticação UI:** Telas de Login e Registo responsivas.
* **Perfil do Colecionador:** Dashboard com navegação em abas para gestão de dados do utilizador e carteiras conectadas.

## 🛠️ Tecnologias Utilizadas

A stack foi escolhida para garantir performance, tipagem estática e escalabilidade:

* **React (v18)** - Biblioteca principal para construção da UI.
* **TypeScript** - Para tipagem forte, prevenindo erros em tempo de desenvolvimento.
* **Vite** - Build tool ultrarrápido para ambiente de desenvolvimento.
* **Tailwind CSS** - Framework utilitário para estilização ágil, manutenção de Design System (cores globais) e layouts responsivos (`md:hidden`, `hidden md:flex`).
* **TanStack Router** - Roteamento moderno, type-safe e performático para a navegação de páginas (SPA).
* **TanStack Query (React Query)** - Gestão do estado do servidor, cache e consumo da API simulada.
* **Axios** - Cliente HTTP para requisições.
* **Lucide React** - Biblioteca de ícones SVG leves e customizáveis.

## 📐 Arquitetura e Decisões Técnicas

1. **Pixel-Perfect & Design System:** As cores (`#140D0A` fundo escuro principal, `#D28A4C` cor de destaque/laranja) e os espaçamentos foram rigorosamente implementados seguindo o protótipo de design, utilizando extensamente configurações personalizadas do Tailwind.
2. **Context API para o Carrinho:** Utilizado para fornecer acesso global aos itens selecionados, manipulação de quantidades (`addToCart`, `removeFromCart`) e persistência temporária durante o fluxo de checkout.
3. **App-Like Mobile Experience:** Em vez de simplesmente "espremer" o layout desktop, a versão mobile utiliza elementos de UI nativos de telemóveis (Bottom Navigation Bar, Sticky Action Buttons, Modal expansível) maximizando a área de ecrã e usabilidade.

## 📂 Estrutura do Projeto

```text
src/
├── assets/          # Imagens, SVGs e recursos estáticos (NFTs)
├── components/      # Componentes globais e reutilizáveis (Navbar, BottomNav)
├── context/         # Gestão de estado global (CartContext)
├── features/        # Componentes isolados por domínio (ex: catalog/NftCard)
├── pages/           # Componentes de roteamento principal (Home, Cart, Payment, etc.)
├── services/        # Configurações de API e chamadas assíncronas (Axios)
├── App.tsx          # Configuração do TanStack Router e Layout Base
├── index.css        # Configurações globais do Tailwind CSS
└── main.tsx         # Ponto de entrada do React


🚀 Como Executar o Projeto Localmente
Siga os passos abaixo para rodar a aplicação na sua máquina:

1. Clone o repositório

Bash
git clone [https://github.com/SEU_USUARIO/kurio-nft-marketplace.git](https://github.com/SEU_USUARIO/kurio-nft-marketplace.git)
2. Aceda à pasta do projeto

Bash
cd kurio-nft-marketplace
3. Instale as dependências

Bash
npm install
# ou
yarn install
4. Inicie o servidor de desenvolvimento

Bash
npm run dev
# ou
yarn dev
Aceda a http://localhost:5173 no seu navegador para ver o projeto.

👨‍💻 Autor
Willian Rafael de Oliveira

Desenvolvedor Frontend / Estudante de Ciência da Computação

LinkedIn : https://www.linkedin.com/in/willian-rafael-0a6526263/

GitHub : https://github.com/Wiiur

E-mail : Will.rafael6262@gmail.com

Se tiveres alguma dúvida sobre a implementação ou o código, não hesites em entrar em contacto! Estou ativamente à procura de oportunidades (Júnior/Estágio) na área de Frontend.


### O que tem de ajustar antes de publicar:
No fim do código, certifique-se de substituir `SEU_USUARIO` (no link do git clone), bem como preencher os links reais do seu **LinkedIn**, **GitHub** e **E-mail**. 

Este documento demonstra profissionalismo absoluto, valorizando não só o seu código,