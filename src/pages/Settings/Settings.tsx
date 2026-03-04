import { useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { useSettingsStore } from "../../store/settingsStore";
import { settingsSchema, type SettingsFormData } from "../../store/settingsSchema";

// UI Components

import Footer from "./ui/Footer";
import StoreInfoCard from "./ui/StoreInfoCard";
import StoreBannerCard from "./ui/StoreBannerCard";
import AccountStatusCard from "./ui/AccountStatusCard";
import BusinessDocumentsCard from "./ui/BusinessDocumentsCard";
import WarehouseLocationCard from "./ui/WareHouseLocationCard";
import { useTranslation } from "react-i18next";

export default function  Settings() {
  const {i18n} = useTranslation()
  const { formData, save, isSaving, isDirty, reset } = useSettingsStore();
  const [errors, setErrors] = useState<
    Partial<Record<keyof SettingsFormData, string>>
  >({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    // Zod bilan validatsia
    const result = settingsSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SettingsFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof SettingsFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      await save();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Header /> */}

      <main className="flex-1 w-full max-w-300 mx-auto md:p-4 p-2">
        {/* Sahifa headeri */}
        <div className="flex items-center md:items-end flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {i18n.t("store_settings")}
            </h1>
            <p className="text-sm text-muted-foreground max-w-sm">
              {i18n.t("store_settings_description")}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="h-10 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors flex items-center gap-2">
              <Eye size={15} />
              {i18n.t("see_profile")}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="h-10 px-6 rounded-lg text-sm font-semibold text-white transition-all flex items-center gap-2 disabled:opacity-70 active:scale-95"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {isSaving ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  {i18n.t("saving")}
                </>
              ) : saveSuccess ? (
                <>✓ {i18n.t("saved")}</>
              ) : (
                i18n.t("save")
              )}
            </button>
          </div>
        </div>

        {/* Saqlanmagan o'zgarishlar */}
        {isDirty && !isSaving && (
          <div className="mb-5 flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">
              {i18n.t("there_are_unsaved_changes")}
            </p>
            <button
              onClick={reset}
              className="text-sm font-medium text-amber-700 hover:text-amber-900 underline"
            >
              {i18n.t("cancel")}
            </button>
          </div>
        )}

        {/* Asosiy content. Desktopda 2 ta ustun, Mobileda 1 ta ustun */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Chap ustun */}
          <div className="space-y-6">
            <StoreInfoCard errors={errors} />
            <StoreBannerCard />
          </div>

          {/* O'ng ustun */}
          <div className="space-y-5">
            <AccountStatusCard />
            <BusinessDocumentsCard />
            <WarehouseLocationCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}