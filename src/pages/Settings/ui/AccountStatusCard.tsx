import i18n from "@/i18n/i18n";
import { ShieldCheck } from "lucide-react";

export default function AccountStatusCard() {
  const lastCheckDate = "12.05.2025";

  return (
    <div
      className="rounded-xl border p-5 shadow-sm"
      style={{
        backgroundColor: "oklch(0.97 0.02 55)",
        borderColor: "oklch(0.88 0.06 55)",
      }}
    >
      {/* Status card headeri */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <ShieldCheck size={20} color="white" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {i18n.t("status_account")}
          </h3>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--primary)" }}
          >
            {i18n.t("verified_seller")}
          </p>
        </div>
      </div>

      {/* Izoh */}
      <p className="text-sm text-foreground/80 leading-relaxed mb-4">
        {i18n.t("account_status_description")}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3 border-t"
        style={{ borderColor: "oklch(0.85 0.06 55)" }}
      >
        <span className="text-sm text-foreground/70">{i18n.t("next_review")}</span>
        <span className="text-sm font-semibold text-foreground">
          {lastCheckDate}
        </span>
      </div>
    </div>
  );
}