// src/services/api.ts
import axios from 'axios';
import type { NFT } from '../features/catalog/types';

// 1. Importar as suas imagens da pasta assets
import nft1 from '../assets/NFT1.png';
import nft2 from '../assets/NFT2.png';
import nft3 from '../assets/NFT3.png';
import nft4 from '../assets/NFT4.png';

// 2. Colocá-las num array
const localImages = [nft1, nft2, nft3, nft4];

// 3. Função auxiliar para escolher uma imagem aleatória
const getRandomImage = () => localImages[Math.floor(Math.random() * localImages.length)];

export const api = axios.create({
  baseURL: '/api',
});

export async function fetchNfts(): Promise<NFT[]> {
  const response = await api.get<NFT[]>('/nfts');
  
  // 4. Intercetar os dados e trocar a imagem original pela nossa aleatória
  const nftsComImagensLocais = response.data.map(nft => ({
    ...nft,
    imageUrl: getRandomImage()
  }));

  // Devolvemos a nova lista. Assim o Carrinho, Detalhes e Catálogo atualizam sozinhos!
  return nftsComImagensLocais;
}