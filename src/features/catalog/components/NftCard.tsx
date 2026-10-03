// src/features/catalog/components/NftCard.tsx
import type { NFT } from '../types';

interface NftCardProps {
  nft: NFT;
  onSelect: (nft: NFT) => void;
  onAddToCart: (nft: NFT) => void;
}

export function NftCard({ nft, onSelect, onAddToCart }: NftCardProps) {
  return (
    <div 
      onClick={() => onSelect(nft)}
      className="group flex flex-col justify-between rounded-xl bg-surface p-4 transition-all hover:-translate-y-1 hover:shadow-xl border border-surface cursor-pointer relative overflow-hidden"
    >
      <div>
        <div className="aspect-square overflow-hidden rounded-lg bg-[#140D0A] mb-3">
          <img
            src={nft.imageUrl}
            alt={nft.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
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