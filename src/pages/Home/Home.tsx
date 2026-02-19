import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboardStore} from "../../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "./ui/ProductCard";
import StatCard from "./ui/StatCard";
import OrderRow from "./ui/OrderRow";

export default function Home() {
  const { user, stats, topProducts, recentOrders } = useDashboardStore();

  return (
    <div className="min-h-screen bg-[--background] font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[--foreground]">
          Xush kelibsiz, {user.name}! 👋
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Bugungi ko'rsatkichlaringiz va eng ko'p sotilgan mahsulotlaringiz.
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
                Top mahsulotlar
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Eng yuqori sotuv ko'rsatkichiga ega tovarlar
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-primary  border-[#F47B2530] bg-[#F47B2520] hover:bg-accent hover:text-primary text-xs h-8 gap-1"
            >
              Barchasini ko'rish
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
              So'nggi buyurtmalar
            </CardTitle>
            <button className="text-xs text-primary font-semibold hover:underline outline-none">
              Barchasi
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
              Hisobotni yuklab olish
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Yangi mahsulot */}
      <Button
        className="fixed bottom-6 right-6 bg-primary hover:opacity-90 text-primary-foreground shadow-lg gap-2 h-11 px-5 rounded-full font-semibold text-sm"
      >
        <Plus className="w-4 h-4" />
        Yangi mahsulot
      </Button>
    </div>
  );
}