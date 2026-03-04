import type { RFQStatus } from "@/store/rfqSchema";
import { useRFQStore } from "@/store/rfqStore";
import { SlidersHorizontal } from "lucide-react";

const filters: { label: string; value: RFQStatus | "ALL" }[] = [
  { label: "Barchasi", value: "ALL" },
  { label: "Yangi", value: "YANGI" },
  { label: "Taklif yuborildi", value: "TAKLIF_YUBORILDI" },
  { label: "Rad etildi", value: "RAD_ETILDI" },
  { label: "Yakunlangan", value: "YAKUNLANGAN" },
];

export default function RFQFilterBar() {
  const { filterStatus, setFilterStatus } = useRFQStore();

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterStatus(f.value)}
            className={`h-9 px-4 rounded-lg text-sm font-medium transition-colors border ${
              filterStatus === f.value
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-card"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button className="h-9 px-4 rounded-lg text-sm font-medium border border-border text-foreground bg-card hover:bg-secondary transition-colors flex items-center gap-2">
        <SlidersHorizontal size={15} />
        Saralash
      </button>
    </div>
  );
}