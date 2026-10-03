# Arquitetura do Projeto — Marketplace de NFTs (Kurio)

Este documento detalha as principais decisões arquiteturais, padrões de design e estratégias técnicas implementadas no desenvolvimento do Marketplace de NFTs.

---

## 1. Stack Tecnológica e Justificativa
* **React & TypeScript:** Garantem tipagem estrita de contratos e alta manutenibilidade do código.
* **TanStack Router:** Utilizado para gerenciamento de rotas com forte suporte a search params na URL, permitindo que filtros e buscas sobrevivam a recarregamentos de página (F5).
* **TanStack Query (React Query):** Responsável pelo gerenciamento de estado assíncrono e remoto. Implementa cache inteligente, revalidação automática e mutações seguras.
* **Axios:** Cliente HTTP configurado para interceptação de requisições, injeção de headers globais (como a chave de idempotência) e tratamento padronizado de erros.
* **MSW (Mock Service Worker):** Intercepta o tráfego na camada de rede (REST e WebSockets), garantindo que os componentes e hooks consumam dados simulados idênticos a um ambiente de produção real.
* **Tailwind CSS & shadcn/ui:** Sistema de design adaptado para garantir fidelidade visual estrita ao layout do Figma, focando em acessibilidade e responsividade.

---

## 2. Estratégia de Cache e Sincronização (TanStack Query)
* **Políticas de Cache:** Os dados de listagem de NFTs utilizam um `staleTime` otimizado para evitar requisições redundantes ao navegar entre o catálogo e os detalhes.
* **Atualização Otimista (Optimistic Updates):** A funcionalidade de favoritar NFTs aplica atualizações otimistas no cache local através de `onMutate`, refletindo instantaneamente a alteração na interface antes da confirmação do servidor, com suporte a *rollback* automático em caso de falha de rede.

---

## 3. Comunicação em Tempo Real (Socket.IO & MSW)
* **Reconciliação e Handshake:** A comunicação em tempo real simula o protocolo Socket.IO sobre WebSockets usando o MSW. O cliente implementa tratamento de reconexão automática e escuta eventos críticos:
  * `nft.updated`: Atualiza dinamicamente o preço e disponibilidade dos NFTs no catálogo e no carrinho em tempo real.
  * `order.updated`: Monitora o estado da transação blockchain, disparando o recibo de sucesso na página de pagamento.

---

## 4. Confiabilidade e Resiliência (Idempotência)
* **Chave de Idempotência:** As requisições de *checkout* (`POST /api/checkout`) enviam um cabeçalho personalizado `Idempotency-Key` gerado via UUID. Isto garante que cliques duplos acidentais ou reenvios após *timeout* por parte do cliente não gerem cobranças duplicadas no backend simulado.

---

## 5. Testes E2E (Playwright)
* Os testes ponta a ponta cobrem os fluxos críticos exigidos pelo desafio:
  * Autenticação de utilizador (Login/Sessão).
  * Adição de itens ao carrinho e validação de montantes.
  * Fluxo completo de pagamento com interceção de tempo real (Socket.IO).
  * Navegação nas abas de perfil e carteiras do colecionador.