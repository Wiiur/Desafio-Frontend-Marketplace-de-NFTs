// src/mocks/handlers.ts
import { http, HttpResponse, delay, ws } from 'msw';
import { mockNfts } from './data';

const socketLink = ws.link('ws://localhost:9999');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectedClients = new Set<any>();

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
    // Removemos o 'e' e adicionámos o comentário para passar no ESLint
    try { client.send(payload); } catch { /* ignora erro */ }
  });
  
  console.log(`[MSW] 🎲 Preço do NFT #${randomId} mudou para ${randomPrice} ETH!`);
}, 8000);


export const handlers = [
  http.get('*/api/nfts', async () => {
    await delay(800);
    return HttpResponse.json(mockNfts);
  }),

  http.get('*/api/nfts/:id', async ({ params }) => {
    await delay(500);
    const nft = mockNfts.find((n) => n.id === String(params.id));
    if (!nft) return new HttpResponse('NFT não encontrado', { status: 404 });
    return HttpResponse.json(nft);
  }),

  http.post('*/api/checkout', async () => {
    await delay(2000); 

    const payload = '42' + JSON.stringify([
      'order.updated',
      { status: 'confirmed', transactionId: '0xA91F...E82C' }
    ]);
    
    connectedClients.forEach(client => {
      // Removemos o 'e' e adicionámos o comentário para passar no ESLint
      try { client.send(payload); } catch { /* ignora erro */ }
    });
    
    return HttpResponse.json({ success: true });
  }),

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