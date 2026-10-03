// src/features/catalog/types.ts

/**
 * Representação principal do NFT no catálogo.
 */
export interface NFT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  // Valores em ETH devem trafegar como strings decimais para manter a precisão
  price: string; 
  // Quantidades devem ser tratadas como números inteiros
  availableQuantity: number; 
  creator: {
    id: string;
    name: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  collectionName: string;
  createdAt: string;
}

/**
 * Contrato padrão para respostas paginadas da API (Mock/MSW).
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

/**
 * Estado dos filtros que irá para a URL via TanStack Router.
 */
export interface CatalogFilters {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'recent' | 'popular';
  page?: number;
}

/**
 * Contrato do evento Socket.IO (nft.updated)
 */
export interface NftUpdatedEvent {
  nftId: string;
  newPrice: string;
  newAvailableQuantity: number;
  version: number; 
}

// src/features/catalog/types.ts
export interface NFT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string; 
  availableQuantity: number; 
  creator: {
    id: string;
    name: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  collectionName: string;
  network: 'Ethereum' | 'Polygon' | 'Solana';
  createdAt: string;
}