import { useOrdersStore } from "../store/ordersStore";
import type { OrderStatus, Order } from "../store/ordersStore";
import { useTranslation } from "react-i18next";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 10;

function formatAmount(amount: number) {
  return amount.toLocaleString("uz-UZ") + " UZS";
}

function StatCard({ label, value, change }: { label: string; value: number; change: number }) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{label}</p>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {isPositive ? "+" : ""}{change}%
        </span>
      </div>
    </div>
  );
}

export default function Orders() {
  const { orders, activeTab, currentPage, setActiveTab, setCurrentPage } = useOrdersStore();
  const { t } = useTranslation();

  const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
    yangi:         { label: t("status_new"),        className: "bg-orange-100 text-orange-600" },
    qabul_qilindi: { label: t("status_accepted"),   className: "bg-yellow-100 text-yellow-700" },
    yetkazilmoqda: { label: t("status_delivering"), className: "bg-blue-100 text-blue-600" },
    yakunlandi:    { label: t("status_done"),       className: "bg-green-100 text-green-600" },
  };

  const tabs: { key: OrderStatus | "all"; label: string }[] = [
    { key: "all",           label: t("orders_tab_all") },
    { key: "yangi",         label: t("orders_tab_new") },
    { key: "qabul_qilindi", label: t("orders_tab_accepted") },
    { key: "yetkazilmoqda", label: t("orders_tab_delivering") },
    { key: "yakunlandi",    label: t("orders_tab_done") },
  ];

  const filtered: Order[] =
    activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const counts: Record<OrderStatus, number> = {
    yangi:         orders.filter((o) => o.status === "yangi").length,
    qabul_qilindi: orders.filter((o) => o.status === "qabul_qilindi").length,
    yetkazilmoqda: orders.filter((o) => o.status === "yetkazilmoqda").length,
    yakunlandi:    orders.filter((o) => o.status === "yakunlandi").length,
  };

  const from = filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(currentPage * ITEMS_PER_PAGE, filtered.length);

  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t("orders_title")}</h1>
          <p className="text-sm text-gray-400 mt-1">{t("orders_subtitle")}</p>
        </div>
        <button
          onClick={() => alert("Excel eksport qilindi!")}
          className="flex items-center gap-2 bg-[#F97316] hover:bg-[#ea6c0c] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-200"
        >
          <Download className="w-4 h-4" />
          {t("export_excel")}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label={t("stat_new")}       value={counts.yangi}         change={14} />
        <StatCard label={t("stat_accepted")}  value={counts.qabul_qilindi} change={2}  />
        <StatCard label={t("stat_delivering")}value={counts.yetkazilmoqda} change={-1} />
        <StatCard label={t("stat_done")}      value={counts.yakunlandi}    change={8}  />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-4 gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const count = tab.key === "all" ? orders.length : counts[tab.key as OrderStatus];
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 px-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? "text-[#F97316] border-[#F97316]"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-orange-50 text-orange-500" : "bg-gray-100 text-gray-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">{t("col_id")}</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">{t("col_client")}</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">{t("col_date")}</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">{t("col_amount")}</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">{t("col_status")}</th>
                <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">{t("col_action")}</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-16 text-sm">
                    {t("no_orders")}
                  </td>
                </tr>
              ) : (
                paginated.map((order: Order, idx: number) => (
                  <tr
                    key={order.id}
                    className={`border-b border-gray-50 hover:bg-orange-50/30 transition-colors ${
                      idx % 2 !== 0 ? "bg-gray-50/30" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800">{order.client}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.company}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#F97316]">
                      {formatAmount(order.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusConfig[order.status].className}`}>
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-semibold text-[#F97316] hover:underline">
                        {t("details")}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
          <p className="text-sm text-gray-400">
            {t("showing", { total: filtered.length, from, to })}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-[#F97316] hover:text-[#F97316] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-[#F97316] text-white shadow-md shadow-orange-200"
                    : "border border-gray-200 text-gray-500 hover:border-[#F97316] hover:text-[#F97316]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-[#F97316] hover:text-[#F97316] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}