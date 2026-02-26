import { ExternalLink } from "lucide-react";

export default function WarehouseLocationCard() {
  const editUrl =
    "https://www.google.com/maps/search/Toshkent,+Sergeli+tumani";

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      {/* Joylashuv cardi headeri */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-base font-semibold text-foreground">
          Ombor joylashuvi
        </h3>
      </div>

      {/* Map placeholder */}
      <div className="relative w-full h-52 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div key={`h${i}`} className="absolute w-full h-px bg-foreground" style={{ top: `${i * 20}%` }} />
          ))}
          {[...Array(8)].map((_, i) => (
            <div key={`v${i}`} className="absolute h-full w-px bg-foreground" style={{ left: `${i * 14}%` }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "var(--primary)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-foreground bg-card px-2 py-0.5 rounded shadow">Punkt</span>
          </div>
        </div>
      </div>

      {/* Tahrirlash buttoni */}
      <div className="px-5 pb-5 pt-3">
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-10 flex items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          <ExternalLink size={15} className="text-muted-foreground" />
          Xaritada tahrirlash
        </a>
      </div>
    </div>
  );
}