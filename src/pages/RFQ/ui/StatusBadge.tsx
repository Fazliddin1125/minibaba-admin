import i18n from "@/i18n/i18n";
import type { RFQStatus } from "../../../store/rfqSchema";

interface Props {
  status: RFQStatus;
}



export default function RFQStatusBadge({ status }: Props) {
  
  const statusConfig: Record<RFQStatus, { label: string; className: string }> = {
    YANGI: {
      label: i18n.t("rfq_status_new"),
      className: "bg-orange-50 text-orange-600 border border-orange-200",
    },
    TAKLIF_YUBORILDI: {
      label: i18n.t("rfq_status_offered"),
      className: "bg-green-50 text-green-600 border border-green-200",
    },
    RAD_ETILDI: {
      label: i18n.t("rfq_status_rejected" ),
      className: "bg-red-50 text-red-500 border border-red-200",
    },
    YAKUNLANGAN: {
      label: i18n.t("rfq_status_completed"),
      className: "bg-secondary text-muted-foreground border border-border",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap ${config.className}`}
    >
      {config.label}
    </span>
  );
}