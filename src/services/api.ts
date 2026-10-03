// src/services/api.ts
import axios from 'axios';
import type { NFT } from '../features/catalog/types';

export const api = axios.create({
  baseURL: '/api',
});

export async function fetchNfts(): Promise<NFT[]> {
  // A chamada agora faz apenas o pedido GET. 
  // O MSW vai intercetar este pedido no navegador, simular o tempo de resposta e devolver os NFTs já com as imagens aleatórias!
  const response = await api.get<NFT[]>('/nfts');
  
  return response.data;
}