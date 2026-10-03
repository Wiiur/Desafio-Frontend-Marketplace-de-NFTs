import type { NFT } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../services/api';

interface NftCardProps {
  nft: NFT;
  onSelect: (nft: NFT) => void;
  onAddToCart: (nft: NFT) => void;
}

export function NftCard({ nft, onSelect, onAddToCart }: NftCardProps) {
  const queryClient = useQueryClient();

  // Mutação para favoritar com Atualização Otimista e Rollback
  const favoriteMutation = useMutation({
    mutationFn: async () => {
      if (nft.isFavorite) {
        return api.delete(`/api/favorites/${nft.id}`);
      } else {
        return api.post('/api/favorites', { nftId: nft.id });
      }
    },
    onMutate: async () => {
      // 1. Cancela queries ativas para não sobrescreverem o estado otimista
      await queryClient.cancelQueries({ queryKey: ['nfts'] });
      
      // 2. Guarda o estado anterior para caso ocorra erro (Rollback)
      const previousNfts = queryClient.getQueryData(['nfts']);

      // 3. Atualiza o cache imediatamente na interface de forma otimista
      queryClient.setQueryData(['nfts'], (old: NFT[] | undefined) => {
        if (!old) return old;
        if (Array.isArray(old)) {
          return old.map((item: NFT) =>
            item.id === nft.id ? { ...item, isFavorite: !item.isFavorite } : item
          );
        }
        return old;
      });

      return { previousNfts };
    },
    onError: (_err, _variables, context) => {
      // 4. Se a API falhar, reverte para o estado anterior exato
      if (context?.previousNfts) {
        queryClient.setQueryData(['nfts'], context.previousNfts);
      }
    },
    onSettled: () => {
      // 5. Revalida os dados com o servidor após concluir
      queryClient.invalidateQueries({ queryKey: ['nfts'] });
    },
  });

  return (
    <div 
      onClick={() => onSelect(nft)}
      className="group flex flex-col justify-between rounded-xl bg-surface p-4 transition-all hover:-translate-y-1 hover:shadow-xl border border-surface cursor-pointer relative overflow-hidden"
    >
      <div>
        <div className="aspect-square overflow-hidden rounded-lg bg-[#140D0A] mb-3 relative">
          <img
            src={nft.imageUrl}
            alt={nft.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Botão de Favorito com Atualização Otimista */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita abrir os detalhes do NFT ao clicar no coração
              favoriteMutation.mutate();
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors z-10"
            aria-label="Favoritar NFT"
          >
            <svg
              className={`w-4 h-4 transition-colors ${nft.isFavorite ? 'text-red-500 fill-red-500' : 'text-white fill-none'}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        
        <h3 className="truncate font-mono text-sm font-bold text-foreground">{nft.title}</h3>
        <p className="font-mono text-xs text-muted mt-1">{nft.collectionName}</p>
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-surface/50">
        <div>
          <span className="text-[10px] uppercase text-muted block font-mono">PREÇO</span>
          <p className="font-mono text-sm font-bold text-primary">{nft.price} ETH</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que abra a página de detalhes ao clicar no botão
            onAddToCart(nft);
          }}
          className="font-mono text-xs text-primary hover:underline font-bold py-1 px-2 rounded transition-colors hover:bg-primary/10"
        >
          Adicionar +
        </button>
      </div>
    </div>
  );
}