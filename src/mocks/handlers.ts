// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

const collections = ['Arte digital', 'Fotografia', 'Música', 'Arte 3D', 'Colecionáveis'];
const networks: ('Ethereum' | 'Polygon' | 'Solana')[] = ['Ethereum', 'Polygon', 'Solana'];

const mockNfts = Array.from({ length: 12 }).map((_, index) => ({
  id: String(index + 1),
  title: `Digital Piece #${100 + index}`,
  description: `Obra exclusiva número #${index + 1} do marketplace Kurio.`,
  imageUrl: `https://placehold.co/400x400/140D0A/D28A4C?text=NFT+${index + 1}`,
  price: (0.5 + index * 0.9).toFixed(2),
  availableQuantity: 1,
  creator: {
    id: `creator-${index}`,
    name: index % 2 === 0 ? 'Kurio Studio' : 'Ape Art',
    isVerified: true,
  },
  collectionName: collections[index % collections.length],
  network: networks[index % networks.length],
  createdAt: new Date().toISOString(),
}));

export const handlers = [
  http.get('/api/nfts', () => {
    return HttpResponse.json(mockNfts);
  }),
];