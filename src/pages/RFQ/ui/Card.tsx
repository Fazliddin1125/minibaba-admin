import type { RFQItem } from "@/store/rfqSchema";
import { Eye } from "lucide-react";
import RFQStatusBadge from "./StatusBadge";
import { useRFQStore } from "@/store/rfqStore";

function BuyerAvatar({ initials, index }: { initials: string; index: number }) {
  const colors = [
    "bg-orange-100 text-orange-600",
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
  ];
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${colors[index % colors.length]}`}>
      {initials}
    </div>
  );
}

function RFQCardItem({ item, index, onView }: { item: RFQItem; index: number; onView: (item: RFQItem) => void }) {
  return (
    <div className="p-4 border-b border-border last:border-none">
      {/* Top: image + name + badge */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-14 h-14 rounded-lg bg-linear-to-br from-secondary to-border shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-foreground leading-snug">{item.productName}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide">{item.categories.join(" • ")}</p>
            </div>
            <RFQStatusBadge status={item.status} />
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-y-2 mb-3">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Xaridor</p>
          <div className="flex items-center gap-1.5 mt-1">
            <BuyerAvatar initials={item.buyer.initials} index={index} />
            <p className="text-sm text-foreground">{item.buyer.name}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Miqdor</p>
          <p className="text-sm font-semibold text-foreground mt-1">{item.quantity.toLocaleString()} dona</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Sana</p>
          <p className="text-sm text-foreground mt-1">{item.date}</p>
        </div>
      </div>

      {/* Ko'rish button */}
      <div className="flex justify-end">
        <button
          onClick={() => onView(item)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          <Eye size={14} style={{ color: "var(--primary)" }} />
          Ko'rish
        </button>
      </div>
    </div>
  );
}

export default function RFQCard() {
  const { paginatedItems, openModal } = useRFQStore();
  const items = paginatedItems();

  if (items.length === 0) {
    return <div className="text-center py-12 text-muted-foreground text-sm">So'rovlar topilmadi</div>;
  }

  return (
    <div>
      {items.map((item, i) => (
        <RFQCardItem key={item.id} item={item} index={i} onView={openModal} />
      ))}
    </div>
  );
}