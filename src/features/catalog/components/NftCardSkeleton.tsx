// src/features/catalog/components/NftCardSkeleton.tsx
import { Skeleton } from '../../../components/ui/skeleton';

export function NftCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-surface p-4 border border-[#38220F]/30 h-full">
      <div>
        <Skeleton className="aspect-square w-full rounded-lg mb-3" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#38220F]/30">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-2 w-10" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-20 rounded" />
      </div>
    </div>
  );
}