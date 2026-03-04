import i18n from "@/i18n/i18n";
import type { RFQStatus } from "@/store/rfqSchema";
import { useRFQStore } from "@/store/rfqStore";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";



export default function RFQFilterDropdown() {

  const OPTIONS: { label: string; value: RFQStatus | "ALL" }[] = [
    { label: i18n.t("rfq_filter_all"), value: "ALL" },
    { label: i18n.t("rfq_filter_new"), value: "YANGI" },
    { label: i18n.t("rfq_filter_offered"), value: "TAKLIF_YUBORILDI" },
    { label: i18n.t("rfq_filter_rejected"), value: "RAD_ETILDI" },
    { label: i18n.t("rfq_filter_finished"), value: "YAKUNLANGAN" },
  ];

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
        {i18n.t("rfq_sorting")}
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