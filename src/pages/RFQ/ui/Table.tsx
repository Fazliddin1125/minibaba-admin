import type { RFQItem } from "@/store/rfqSchema";
import { Eye } from "lucide-react";
import RFQStatusBadge from "./StatusBadge";
import { useRFQStore } from "@/store/rfqStore";
import i18n from "@/i18n/i18n";

function BuyerAvatar({ initials, index }: { initials: string; index: number }) {
  const colors = [
    "bg-orange-100 text-orange-600",
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
  ];
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${colors[index % colors.length]}`}>
      {initials}
    </div>
  );
}

function ProductThumb() {
  return (
    <div className="w-14 h-14 rounded-lg bg-linear-to-br from-secondary to-border shrink-0" />
  );
}

function RFQRow({ item, index, onView }: { item: RFQItem; index: number; onView: (item: RFQItem) => void }) {
  return (
    <tr className="border-b border-border hover:bg-secondary/30 transition-colors">
      <td className="py-4 pl-5 pr-3"><ProductThumb /></td>
      <td className="py-4 px-3">
        <p className="text-sm font-semibold text-foreground">{item.productName}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide">{item.categories.join(" • ")}</p>
      </td>
      <td className="py-4 px-3">
        <div className="flex items-center gap-2.5">
          <BuyerAvatar initials={item.buyer.initials} index={index} />
          <div>
            <p className="text-sm font-medium text-foreground">{item.buyer.name}</p>
            <p className="text-xs text-muted-foreground">{item.buyer.city}, {item.buyer.country}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-3">
        <p className="text-sm font-semibold text-foreground">{item.quantity.toLocaleString()} {i18n.t("rfq_items")}</p>
      </td>
      <td className="py-4 px-3">
        <p className="text-sm text-foreground">{item.date}</p>
      </td>
      <td className="py-4 px-3">
        <RFQStatusBadge status={item.status} />
      </td>
      <td className="py-4 pl-3 pr-5">
        <button onClick={() => onView(item)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          <Eye size={17} style={{ color: "var(--primary)" }} />
        </button>
      </td>
    </tr>
  );
}

export default function RFQTable() {
  const { paginatedItems, openModal } = useRFQStore();
  const items = paginatedItems();

  if (items.length === 0) {
    return <div className="text-center py-16 text-muted-foreground text-sm">{i18n.t("no_rfqs_found")}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {[
              i18n.t("rfq_column_image"),
              i18n.t("rfq_column_product"),
              i18n.t("rfq_column_buyer"),
              i18n.t("rfq_column_qty"),
              i18n.t("rfq_column_date"),
              i18n.t("rfq_column_status"),
              i18n.t("rfq_column_action")
            ].map((col) => (
              <th key={col} className={`text-[11px] font-semibold text-muted-foreground tracking-wider uppercase p-4 pb-3 text-left ${col === i18n.t("rfq_column_image") ? "pl-5 pr-3" : col ===  i18n.t("rfq_column_action") ? "pl-3 pr-5" : "px-3"}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <RFQRow key={item.id} item={item} index={i} onView={openModal} />
          ))}
        </tbody>
      </table>
    </div>
  );
}