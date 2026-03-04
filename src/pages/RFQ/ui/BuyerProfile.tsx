import type { RFQItem } from "@/store/rfqSchema";
import { MapPin, Calendar, Star } from "lucide-react";

export default function RFQBuyerProfile({ item }: { item: RFQItem }) {
  const { buyer, deliveryAddress, expectedDeadline } = item;
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
        Xaridor profili
      </p>
      <div className="flex items-center gap-3 pb-3 border-b border-border mb-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-orange-50 text-orange-600">
          {buyer.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{buyer.name}</p>
          <p className="text-xs text-muted-foreground">{buyer.company}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium">{buyer.rating}</span>
            <span className="text-xs text-muted-foreground">({buyer.reviews} bitim)</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-orange-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Yetkazib berish manzili</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{deliveryAddress}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
            <Calendar size={16} className="text-orange-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kutilayotgan muddat</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{expectedDeadline}</p>
          </div>
        </div>
      </div>
    </div>
  );
}