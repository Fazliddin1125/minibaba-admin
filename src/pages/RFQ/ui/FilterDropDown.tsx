import type { RFQStatus } from "@/store/rfqSchema";
import { useRFQStore } from "@/store/rfqStore";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const OPTIONS: { label: string; value: RFQStatus | "ALL" }[] = [
  { label: "Barchasi", value: "ALL" },
  { label: "Yangi", value: "YANGI" },
  { label: "Taklif yuborildi", value: "TAKLIF_YUBORILDI" },
  { label: "Rad etildi", value: "RAD_ETILDI" },
  { label: "Yakunlangan", value: "YAKUNLANGAN" },
];

export default function RFQFilterDropdown() {
  const { filterStatus, setFilterStatus } = useRFQStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-9 px-4 flex items-center gap-2 rounded-lg border border-border text-sm font-medium text-foreground bg-card hover:bg-secondary transition-colors"
      >
        <SlidersHorizontal size={15} className="text-muted-foreground" />
        Saralash
        {filterStatus !== "ALL" && (
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: "var(--primary)" }}
          />
        )}
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border border-border rounded-xl shadow-lg z-30 py-1 overflow-hidden">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setFilterStatus(opt.value);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
            >
              <span className={filterStatus === opt.value ? "font-semibold" : ""}>
                {opt.label}
              </span>
              {filterStatus === opt.value && (
                <Check size={15} style={{ color: "var(--primary)" }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}