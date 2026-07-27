import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  strong?: boolean;
};

export function PlatformTag({ icon: Icon, label, strong = false }: Props) {
  return (
    <span
      className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
        strong
          ? "border-white/15 bg-white/5 text-blue-50 hover:bg-white/10"
          : "border-brand-100 bg-white text-brand-700 hover:bg-brand-50"
      }`}
    >
      <Icon className="size-4 shrink-0 sm:size-[18px]" strokeWidth={1.9} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
