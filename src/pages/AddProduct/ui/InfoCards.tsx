import i18n from "@/i18n/i18n";
import { cn } from "@/lib/utils"
import {BadgeCheck, NotebookPen, TrendingDown} from "lucide-react"


const InfoCards = () => {
  const INFO_CARDS = [
    {
      icon: <BadgeCheck color="#E57E37"/>,
      color: "text-[var(--primary)]",
      bg: "bg-orange-50",
      title: i18n.t("infocards_title_tavsif"),
      desc: i18n.t("infocards_desc_tavsif"),
    },
    {
      icon: <TrendingDown color="#2563EB"/>,
      color: "text-blue-600",
      bg: "bg-blue-50",
      title: i18n.t("infocards_title_narxlar"),
      desc: i18n.t("infocards_desc_narxlar"),
    },
    {
      icon: <NotebookPen color="#059669"/>,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      title: i18n.t("infocards_title_matrix"),
      desc: i18n.t("infocards_desc_matrix"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {INFO_CARDS.map((card) => (
      <div
        key={card.title}
        className="bg-card rounded-lg border border-border p-4 flex gap-3"
      >
        <div
          className={cn(
            "w-10 h-10 rounded-(--radius-md) flex items-center justify-center shrink-0 text-lg",
            card.bg
          )}
        >
          {card.icon}
        </div>
        <div className="space-y-1">
          <p className={cn("text-sm font-semibold", card.color)}>{card.title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default InfoCards
