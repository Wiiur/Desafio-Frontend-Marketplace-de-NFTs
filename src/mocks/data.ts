// src/mocks/data.ts
import nft1 from '../assets/NFT1.png';
import nft2 from '../assets/NFT2.png';
import nft3 from '../assets/NFT3.png';
import nft4 from '../assets/NFT4.png';
import type { NFT } from '../features/catalog/types';

const localImages = [nft1, nft2, nft3, nft4];
const getRandomImage = () => localImages[Math.floor(Math.random() * localImages.length)];

export const mockNfts: NFT[] = [
  {
    id: '1',
    title: 'Emerald Ape #042',
    collectionName: 'Kurio Apes',
    price: '1.19',
    imageUrl: getRandomImage(),
    network: 'Ethereum',
    categoria: 'Arte',
    description: 'Um colecionável digital finalizado à mão da coleção Kurio Editions.',
    availableQuantity: 50,
    createdAt: '2026-07-29T10:00:00Z',
    // Correção: creator agora é um objeto
    creator: {
      id: 'c1',
      name: 'Nova Sato',
      isVerified: true
    }
  },
  {
    id: '2',
    title: 'Violet Nomad #314',
    collectionName: 'Nomad Syndicate',
    price: '1.39',
    imageUrl: getRandomImage(),
    network: 'Ethereum',
    categoria: 'Arte',
    description: 'Obra digital rara e verificada na blockchain.',
    availableQuantity: 1,
    createdAt: '2026-08-01T12:30:00Z',
    creator: {
      id: 'c2',
      name: 'Nomad Labs',
      isVerified: true
    }
  },
  {
    id: '3',
    title: 'Ivory Baron #088',
    collectionName: 'Baron Club',
    price: '3.58',
    imageUrl: getRandomImage(),
    network: 'Ethereum',
    categoria: 'Arte',
    description: 'Arte exclusiva com acesso a clube privado de colecionadores.',
    availableQuantity: 10,
    createdAt: '2026-08-05T09:15:00Z',
    creator: {
      id: 'c3',
      name: 'Baron Society',
      isVerified: false
    }
  },
  {
    id: '4',
    title: 'Golden Beat #207',
    collectionName: 'Beat Makers',
    price: '1.98',
    imageUrl: getRandomImage(),
    network: 'Ethereum',
    categoria: 'Música',
    description: 'Item colecionável focado no universo musical digital.',
    availableQuantity: 50,
    createdAt: '2026-08-10T14:20:00Z',
    creator: {
      id: 'c4',
      name: 'Beat Studios',
      isVerified: true
    }
  },
  {
    id: '5',
    title: 'Cosmic Bloon #118',
    collectionName: 'Bloon Universe',
    price: '1.29',
    imageUrl: getRandomImage(),
    network: 'Polygon',
    categoria: 'Arte 3D',
    description: 'Exploração espacial 3D renderizada em alta qualidade.',
    availableQuantity: 100,
    createdAt: '2026-08-12T16:45:00Z',
    creator: {
      id: 'c5',
      name: 'Cosmic Art',
      isVerified: true
    }
  },
];