import type { LucideIcon } from "lucide-react";

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
};

export const SectionHeader = ({ icon: Icon, title }: SectionHeaderProps) => {
  
  return (
    <div className="flex items-center gap-2 mb-6">
      <Icon className="w-4.5 h-4.5 text-primary shrink-0" />
      <span className="text-xs font-bold tracking-widest uppercase text-foreground whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
};