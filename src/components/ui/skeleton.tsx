// src/components/ui/skeleton.tsx
import { cn } from "../../lib/utils"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#38220F]/40", className)}
      {...props}
    />
  )
}