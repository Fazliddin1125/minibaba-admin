import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type Stat } from "@/store/dashboardStore";
import { t } from "i18next";
import { MessageSquare, Package, ShoppingBag, Wallet, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Package,
  ShoppingBag,
  MessageSquare,
  Wallet,
};

const colorMap: Record<
  "blue" | "green" | "orange" | "yellow",
  { bg: string; icon: string; badge: string; badgeText: string }
> = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-500",
    badge: "bg-orange-100",
    badgeText: "text-orange-500",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-500",
    badge: "bg-green-100",
    badgeText: "text-green-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-500",
    badge: "bg-orange-500",
    badgeText: "text-white",
  },
  yellow: {
    bg: "bg-yellow-50",
    icon: "text-yellow-500",
    badge: "bg-yellow-100",
    badgeText: "text-yellow-600",
  },
};

function StatCard({ stat }: { stat: Stat }) {
  const Icon = iconMap[stat.icon] ?? Package;
  const colors = colorMap[stat.color];

  return (
  <Card className="relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
    <CardContent>
      <div className="flex items-center justify-between mb-4">
        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            colors.bg
          )}
        >
          <Icon className={cn("w-5 h-5", colors.icon)} />
        </div>

        {/* Badge top-right */}
        {stat.trendValue && (
          <span
            className={cn(
              "h-6 flex justify-center items-center text-xs font-semibold px-2.5 py-0.5 rounded-full",
              stat.trend === "up"
                ? "bg-green-100 text-green-600"
                : stat.trend === "new_msg"
                ? cn(colors.badge, colors.badgeText) :""
            )}
          >
            {stat.trendValue}
            {stat.trend === "new_msg" && " " + t("new").toLowerCase()}
          </span>
        )}
      </div>
        {/* Label */}
        <p className="text-sm text-gray-500 mb-1">{t(stat.label)}</p>

        {/* Value */}
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {stat.value}
          {stat.suffix && (
            <span className="text-base font-semibold text-gray-400 ml-1">
              {stat.suffix}
            </span>
          )}
        </p>
    </CardContent>
  </Card>
  );
}

export default StatCard