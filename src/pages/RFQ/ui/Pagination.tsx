import { useRFQStore } from "@/store/rfqStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RFQPagination() {
  const { currentPage, setPage, totalPages, filteredItems, itemsPerPage } =
    useRFQStore();

  const total = filteredItems().length;
  const pages = totalPages();
  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, total);

  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between px-1 border-border mt-2">
      <p className="text-sm text-muted-foreground">
        Jami {total} ta so'rovdan {from}-{to} ko'rsatilmoqda
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? "text-white"
                : "border border-border text-foreground hover:bg-secondary"
            }`}
            style={
              page === currentPage
                ? { backgroundColor: "var(--primary)" }
                : undefined
            }
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setPage(Math.min(pages, currentPage + 1))}
          disabled={currentPage === pages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}