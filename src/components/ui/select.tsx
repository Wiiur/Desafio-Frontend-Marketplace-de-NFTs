// Exemplo de componente Select adaptado à identidade visual (shadcn style)
import { ChevronDown } from 'lucide-react';

interface ShadcnSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export function ShadcnSelect({ label, options, ...props }: ShadcnSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-[11px] text-foreground tracking-wide">{label}</label>}
      <div className="relative">
        <select
          className="w-full bg-[#140D0A] border border-[#38220F] rounded-md px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-[#D28A4C] appearance-none cursor-pointer transition-colors"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#140D0A] text-foreground">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-[#D28A4C] pointer-events-none" />
      </div>
    </div>
  );
}