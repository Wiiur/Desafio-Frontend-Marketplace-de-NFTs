
// src/features/catalog/components/CatalogFilters.tsx
interface CatalogFiltersProps {
  selectedCollection: string;
  onCollectionChange: (collection: string) => void;
  selectedNetwork: string;
  onNetworkChange: (network: string) => void;
  minPrice: string;
  maxPrice: string;
  onPriceChange: (min: string, max: string) => void;
}

const COLLECTIONS = [
  { name: 'Arte digital', count: 33 },
  { name: 'Fotografia', count: 12 },
  { name: 'Música', count: 65 },
  { name: 'Arte 3D', count: 39 },
  { name: 'Colecionáveis', count: 23 },
  { name: 'Generativa', count: 17 },
  { name: 'Jogos', count: 19 },
  { name: 'Assinaturas', count: 13 },
  { name: 'Utilidade', count: 18 },
];

const NETWORKS = [
  { name: 'Ethereum', count: 119 },
  { name: 'Polygon', count: 78 },
  { name: 'Solana', count: 86 },
];

export function CatalogFilters({
  selectedCollection,
  onCollectionChange,
  selectedNetwork,
  onNetworkChange,
  minPrice,
  maxPrice,
  onPriceChange,
}: CatalogFiltersProps) {
  const handleApplyPrice = () => {
    onPriceChange(minPrice, maxPrice);
  };

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-surface p-6 border border-surface font-mono">
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold text-foreground">Coleções</h3>
        <div className="flex flex-col gap-2.5">
          {COLLECTIONS.map((col) => {
            const isSelected = selectedCollection === col.name;
            return (
              <button
                key={col.name}
                onClick={() => onCollectionChange(isSelected ? '' : col.name)}
                className={`flex items-center justify-between text-left text-sm transition-colors ${
                  isSelected ? 'text-primary font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                <span>{col.name}</span>
                <span className="text-xs">({col.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-surface/50 pt-6">
        <h3 className="text-base font-bold text-foreground">Faixa de preço</h3>
        <div className="relative flex items-center py-2">
          <div className="h-1.5 w-full bg-[#140D0A] rounded-lg relative overflow-hidden">
            <div className="absolute left-2 right-4 h-full bg-primary/60 rounded-lg" />
          </div>
          <div className="absolute left-2 h-4 w-4 rounded-full bg-primary shadow cursor-pointer" />
          <div className="absolute right-6 h-4 w-4 rounded-full bg-primary shadow cursor-pointer" />
        </div>
        <div className="text-xs text-muted">
          Preço: <span className="text-foreground font-bold">{minPrice} - {maxPrice} ETH</span>
        </div>
        <button
          onClick={handleApplyPrice}
          className="rounded-lg bg-primary py-2 text-xs font-bold text-[#140D0A] transition-colors hover:bg-primary/80"
        >
          Aplicar
        </button>
      </div>

      <div className="flex flex-col gap-3 border-t border-surface/50 pt-6">
        <h3 className="text-base font-bold text-foreground">Rede</h3>
        <div className="flex flex-col gap-2.5">
          {NETWORKS.map((net) => {
            const isSelected = selectedNetwork === net.name;
            return (
              <button
                key={net.name}
                onClick={() => onNetworkChange(isSelected ? '' : net.name)}
                className={`flex items-center justify-between text-left text-sm transition-colors ${
                  isSelected ? 'text-primary font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                <span>{net.name}</span>
                <span className="text-xs">({net.count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}