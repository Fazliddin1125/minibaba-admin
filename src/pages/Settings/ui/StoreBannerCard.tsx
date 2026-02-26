import { useRef } from "react";
import { useSettingsStore } from "../../../store/settingsStore";
import i18n from "@/i18n/i18n";

export default function StoreBannerCard() {
  const { storeBanner, setStoreBanner } = useSettingsStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setStoreBanner(url);
  };

  // Yuklangan bannerdan foydalanish
  const bannerSrc = storeBanner || null;

  return (
    <div className="bg-card rounded-xl border border-border p-5 md:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">
          {i18n.t("store_banner")}
        </h3>
        <button
          onClick={() => inputRef.current?.click()}
          className="text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: "var(--primary)" }}
        >
          {i18n.t("change_image")}
        </button>
      </div>

      {/* Banner image */}
      <div className="rounded-lg overflow-hidden bg-secondary border border-border aspect-1920/480 relative">
        {bannerSrc ? (
          <img
            src={bannerSrc}
            alt="Store banner"
            className="w-full h-full object-cover"
          />
        ) : (
          /* Banner placeholder image */
          <div className="w-full h-full bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-0.5 bg-slate-400"
                  style={{ top: `${25 + i * 20}%` }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-full bg-slate-400"
                  style={{ left: `${8 + i * 12}%` }}
                />
              ))}
            </div>
            <div className="relative text-center">
              <p className="text-white/40 text-sm">{i18n.t("banner_image")}</p>
            </div>
          </div>
        )}

        {/* Rasmni almashtirish */}
        <button
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
        >
          <span className="bg-black/60 text-white text-sm px-4 py-2 rounded-lg font-medium">
            {i18n.t("change_image")}
          </span>
        </button>
      </div>
      {/* Banner rasm pastidagi ko'rsatmalar */}
      <p className="text-xs text-muted-foreground mt-2">
        {i18n.t("recommend_size")}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBannerChange}
      />
    </div>
  );
}