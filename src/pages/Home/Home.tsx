import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboardStore} from "../../store/dashboardStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "./ui/ProductCard";
import StatCard from "./ui/StatCard";
import OrderRow from "./ui/OrderRow";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, stats, topProducts, recentOrders } = useDashboardStore();
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[--background] font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[--foreground]">
          {t("welcome")}, {user.name}! 👋
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          {t("home_header_description")}
        </p>
      </div>

      {/* Stats Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat:any) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Main content: Top Products, Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        {/* Top Products */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between pb-2 px-5 pt-5">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">
                {t("top_products")}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("top_products_description")}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-primary  border-[#F47B2530] bg-[#F47B2520] hover:bg-accent hover:text-primary text-xs h-8 gap-1"
            >
              {t("see_all")}
            </Button>
          </CardHeader>

          <CardContent className="px-3 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topProducts.map((product:any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent orders */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-5 pt-5">
            <CardTitle className="text-base font-semibold text-foreground">
              {t("recent_orders")}
            </CardTitle>
            <button className="text-xs text-primary font-semibold hover:underline outline-none">
              {t("all")}
            </button>
          </CardHeader>

          <CardContent className="px-5 pb-4">
            <div>
              {recentOrders.map((order:any) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full text-sm text-foreground border-border hover:bg-accent gap-2 h-9"
            >
              <Download className="w-4 h-4" />
              {t("download_report")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Yangi mahsulot */}
      <Button 
        onClick={()=>{navigate("/add-product")}}
        className="fixed bottom-6 right-6 bg-primary hover:opacity-90 text-primary-foreground shadow-lg gap-2 h-11 px-5 rounded-full font-semibold text-sm"
      >
        <Plus className="w-4 h-4" />
        {t("new_product")}
      </Button>
    </div>
  );
}