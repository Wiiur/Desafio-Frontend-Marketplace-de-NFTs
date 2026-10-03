// src/mocks/handlers.ts
import { http, HttpResponse, delay, ws } from 'msw';
import { mockNfts } from './data';

const socketLink = ws.link('ws://localhost:9999');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectedClients = new Set<any>();

// Mock local para persistir o estado de favoritos durante a sessão
const favoritesSet = new Set<string>();

// ==========================================
// 🎲 SISTEMA DE VALORES ALEATÓRIOS DO NFT
// ==========================================
setInterval(() => {
  if (connectedClients.size === 0) return;

  const randomId = String(Math.floor(Math.random() * 4) + 1);
  const randomPrice = (Math.random() * 2.9 + 0.1).toFixed(2);

  const payload = '42' + JSON.stringify([
    'nft.updated',
    { id: randomId, price: randomPrice, availableQuantity: 10 }
  ]);

  connectedClients.forEach(client => {
    try { client.send(payload); } catch { /* ignora erro */ }
  });
  
  console.log(`[MSW] 🎲 Preço do NFT #${randomId} mudou para ${randomPrice} ETH!`);
}, 8000);


export const handlers = [
  // --- REST: LISTAGEM DE NFTS COM SUPORTE A FILTROS E BUSCA NA URL ---
  http.get('*/api/nfts', async ({ request }) => {
    await delay(800);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const category = url.searchParams.get('category');

    // Mapeia os NFTs injetando o estado atual de favoritos
    let filteredNfts = mockNfts.map(nft => ({
      ...nft,
      isFavorite: favoritesSet.has(nft.id)
    }));

    // Aplica o filtro de busca se enviado pela URL
    if (search) {
      filteredNfts = filteredNfts.filter(nft => 
        nft.title.toLowerCase().includes(search) || 
        nft.collectionName.toLowerCase().includes(search)
      );
    }

    // Aplica o filtro de categoria se enviado
    if (category && category !== 'all') {
      // Filtragem por categoria caso aplicável ao seu projeto
    }

    return HttpResponse.json(filteredNfts);
  }),

  // --- REST: DETALHE DO NFT ---
  http.get('*/api/nfts/:id', async ({ params }) => {
    await delay(500);
    const nft = mockNfts.find((n) => n.id === String(params.id));
    if (!nft) return new HttpResponse('NFT não encontrado', { status: 404 });
    return HttpResponse.json({
      ...nft,
      isFavorite: favoritesSet.has(nft.id)
    });
  }),

  // --- REST: ADICIONAR AOS FAVORITOS (Otimista) ---
  http.post('*/api/favorites', async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as { nftId?: string };
    if (body?.nftId) {
      favoritesSet.add(body.nftId);
    }
    return HttpResponse.json({ success: true });
  }),

  // --- REST: REMOVER DOS FAVORITOS (Otimista) ---
  http.delete('*/api/favorites/:id', async ({ params }) => {
    await delay(300);
    const nftId = String(params.id);
    favoritesSet.delete(nftId);
    return HttpResponse.json({ success: true });
  }),

  // --- REST: CHECKOUT COM SUPORTE A IDEMPOTÊNCIA ---
  http.post('*/api/checkout', async ({ request }) => {
    await delay(2000); 

    // Lê a chave de idempotência enviada pelos headers
    const idempotencyKey = request.headers.get('Idempotency-Key');
    console.log('[MSW] 🔐 Checkout processado com Idempotency-Key:', idempotencyKey);

    const payload = '42' + JSON.stringify([
      'order.updated',
      { status: 'confirmed', transactionId: '0xA91F...E82C' }
    ]);
    
    connectedClients.forEach(client => {
      try { client.send(payload); } catch { /* ignora erro */ }
    });
    
    return HttpResponse.json({ success: true, idempotencyKey });
  }),

  // --- WEBSOCKET (SOCKET.IO) ---
  socketLink.addEventListener('connection', ({ client }) => {
    if (String(client.url).indexOf('socket.io') === -1) return;

    console.log('[MSW] Cliente Socket.IO conectado! ID:', client.id);
    connectedClients.add(client);

    client.send(`0{"sid":"${client.id}","upgrades":[],"pingInterval":25000,"pingTimeout":20000}`);

    client.addEventListener('message', (event) => {
      if (event.data === '40') {
        client.send(`40{"sid":"${client.id}"}`);
      }
      if (event.data === '2') {
        client.send('3');
      }
    });

    client.addEventListener('close', () => {
      connectedClients.delete(client);
    });
  }),
];