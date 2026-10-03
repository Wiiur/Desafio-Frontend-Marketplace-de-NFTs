// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { mockNfts } from './data';

export const handlers = [
  // O asterisco (*) garante que ele interceta a chamada seja em localhost, vercel, etc.
  http.get('*/api/nfts', async () => {
    // Simula lentidão de rede (ex: 800ms) - EXIGÊNCIA DO DESAFIO
    await delay(800);
    
    // Retorna a lista de NFTs com status 200 (Sucesso)
    return HttpResponse.json(mockNfts);
  }),

  // Preparando para buscar apenas 1 NFT no futuro
  http.get('*/api/nfts/:id', async ({ params }) => {
    await delay(500);
    const { id } = params;
    
    // String(id) garante que a comparação não falha por diferenças de tipo
    const nft = mockNfts.find((n) => n.id === String(id));

    if (!nft) {
      return new HttpResponse('NFT não encontrado', { status: 404 });
    }

    return HttpResponse.json(nft);
  }),
];