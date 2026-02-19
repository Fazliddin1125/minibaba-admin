import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Order } from "@/store";
import { BadgeCheck, CheckCircle2, Clock, type LucideIcon } from "lucide-react";

const statusConfig: Record<
  Order["status"],
  { label: string; className: string; icon: LucideIcon }
> = {
  new: {
    label: "Yangi",
    className: "bg-[#DCFCE7] text-[#15803D] border-[#7ee1a2]",
    icon: BadgeCheck,
  },
  on_the_way: {
    label: "Yo'lda",
    className: "bg-blue-100 text-blue-600 border-blue-200",
    icon: Clock,
  },
  delivered: {
    label: "Yopilgan",
    className: "bg-gray-100 text-gray-500 border-gray-200",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Bekor qilingan",
    className: "bg-red-100 text-red-500 border-red-200",
    icon: CheckCircle2,
  },
};

function OrderRow({ order }: { order: Order }) {
  const cfg = statusConfig[order.status];
  const initials = order.customer
    .split(" ")
    .map((w:any) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3 py-3">
      <Avatar className="w-9 h-9 shrink-0">
        <AvatarFallback className="text-xs font-semibold bg-orange-100 text-orange-600">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-tight">
          {order.customer}
        </p>
        <p className="text-xs text-gray-400">
          #{order.id} • {order.time}
        </p>
      </div>

      <span
        className={cn(
          "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border",
          cfg.className
        )}
      >
        {cfg.label}
      </span>
    </div>
  );
}

export default OrderRow;