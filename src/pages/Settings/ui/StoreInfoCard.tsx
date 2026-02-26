import { Camera, MapPin, CheckCircle } from "lucide-react";
import { useRef } from "react";
import { useSettingsStore } from "../../../store/settingsStore";

interface FieldError {
  storeName?: string;
  location?: string;
  description?: string;
}

interface StoreInfoCardProps {
  errors?: FieldError;
}

export default function StoreInfoCard({ errors }: StoreInfoCardProps) {
  const {
    formData,
    setField,
    storeLogo,
    setStoreLogo,
    isVerified,
    registrationNumber,
  } = useSettingsStore();

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setStoreLogo(url);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 md:p-6 shadow-sm">
      {/* Store profile header */}
      <div className="flex items-start gap-4 mb-6">
        {/* Profile rasmi */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-border bg-secondary overflow-hidden flex items-center justify-center shadow-xs">
            {storeLogo ? (
              <img
                src={storeLogo}
                alt="Store logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                <span className="text-[9px] text-muted-foreground text-center leading-tight">
                  Main Store
                </span>
              </div>
            )}
          </div>
          {/* Camera button */}
          <button
            onClick={() => logoInputRef.current?.click()}
            className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-card"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Camera size={12} color="white" />
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-base font-bold text-foreground truncate">
              {formData.storeName || "Do'kon nomi"}
            </h2>
            {isVerified && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-green-700 text-xs font-semibold shrink-0">
                <CheckCircle size={11} />
                TASDIQLANGAN
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            O'zbekiston, Toshkent viloyati
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            REG: {registrationNumber}
          </p>
        </div>
      </div>

      {/* Forma inputlari */}
      <div className="space-y-4">
        {/* Store name, location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Do'kon nomi */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Do'kon nomi
            </label>
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => setField("storeName", e.target.value)}
              className={`w-full h-10 px-3 rounded-lg border text-sm bg-background text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                errors?.storeName ? "border-destructive" : "border-input"
              }`}
              placeholder="Do'kon nomini kiriting"
            />
            {errors?.storeName && (
              <p className="text-xs text-destructive">{errors.storeName}</p>
            )}
          </div>

          {/* Joylashuv */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Joylashuv
            </label>
            <div className="relative">
              <MapPin
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setField("location", e.target.value)}
                className={`w-full h-10 pl-9 pr-3 rounded-lg border text-sm bg-background text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                  errors?.location ? "border-destructive" : "border-input"
                }`}
                placeholder="Joylashuvni kiriting"
              />
            </div>
            {errors?.location && (
              <p className="text-xs text-destructive">{errors.location}</p>
            )}
          </div>
        </div>

        {/* Do'kon tavsifi */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Do'kon tavsifi
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={4}
            className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-background text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none ${
              errors?.description ? "border-destructive" : "border-input"
            }`}
            placeholder="Do'koningiz haqida qisqacha ma'lumot..."
          />
          <div className="flex justify-between items-center">
            {errors?.description ? (
              <p className="text-xs text-destructive">{errors.description}</p>
            ) : (
              <span />
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {formData.description.length}/500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}