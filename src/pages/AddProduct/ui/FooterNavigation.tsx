import { cn } from "@/lib/utils";
import { useAddProductStore } from "@/store/addProductStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { TabKey } from "@/store/addProductStore";

// ─── Tab order ────────────────────────────────────────────────────────────────

const TAB_ORDER: TabKey[] = [
  "basic",
  "images",
  "characteristics",
  "prices",
  "variants",
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface FooterNavigationProps {
  // Har doim majburiy — form submit ham shu orqali boshqariladi
  onNext: () => void;
  onSaveDraft: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const FooterNavigation = ({ onNext, onSaveDraft }: FooterNavigationProps) => {
  const { activeTab, setActiveTab } = useAddProductStore();

  const currentIndex = TAB_ORDER.indexOf(activeTab);
  const hasPrev = currentIndex > 0;

  const handlePrev = () => {
    if (hasPrev) setActiveTab(TAB_ORDER[currentIndex - 1]);
  };

  return (
    <div className="px-4 sm:px-6 py-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">

      {/* Oldingi bo'lim */}
      <button
        type="button"
        onClick={handlePrev}
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
          hasPrev
            ? "text-muted-foreground hover:text-foreground cursor-pointer"
            : "text-muted-foreground/30 cursor-not-allowed pointer-events-none"
        )}
      >
        <ArrowLeft size={16} />
        Oldingi bo'lim
      </button>

      {/* O'ng tugmalar */}
      <div className="flex items-center gap-3 flex-col sm:flex-row">

        {/* Qoralama */}
        <button
          type="button"
          onClick={onSaveDraft}
          className={cn(
            "flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium",
            "border border-border bg-transparent text-foreground",
            "hover:bg-muted transition-colors"
          )}
        >
          Qoralama sifatida saqlash
        </button>

        {/* Keyingi — har doim type="button", form submit tabning o'zida boshqariladi */}
        <button
          type="button"
          onClick={onNext}
          className={cn(
            "flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 active:scale-[0.98] transition-all",
            activeTab==="variants" && "cursor-none transition-none active:scale-none hover:opacity-70 opacity-70"
          )}
        >
          Keyingi bo'lim
          <ArrowRight size={16} />
        </button>

      </div>
    </div>
  );
};

export default FooterNavigation;