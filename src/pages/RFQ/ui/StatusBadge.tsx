import type { RFQStatus } from "../../../store/rfqSchema";

interface Props {
  status: RFQStatus;
}

const statusConfig: Record<RFQStatus, { label: string; className: string }> = {
  YANGI: {
    label: "YANGI",
    className: "bg-orange-50 text-orange-600 border border-orange-200",
  },
  TAKLIF_YUBORILDI: {
    label: "TAKLIF YUBORILDI",
    className: "bg-green-50 text-green-600 border border-green-200",
  },
  RAD_ETILDI: {
    label: "RAD ETILDI",
    className: "bg-red-50 text-red-500 border border-red-200",
  },
  YAKUNLANGAN: {
    label: "YAKUNLANGAN",
    className: "bg-secondary text-muted-foreground border border-border",
  },
};

export default function RFQStatusBadge({ status }: Props) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap ${config.className}`}
    >
      {config.label}
    </span>
  );
}