import i18n from "@/i18n/i18n";
import { useSellerRegisterStore } from "@/store/sellerStore";
import { CheckCircle2 } from "lucide-react";

export const SuccessScreen = () => {
  const resetRegistration = useSellerRegisterStore((s) => s.resetRegistration);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {i18n.t("send_succeed")}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {i18n.t("notification_after_send")}
        </p>
        <button
          onClick={resetRegistration}
          className="px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
        >
          {i18n.t("reform")}
        </button>
      </div>
    </div>
  );
};