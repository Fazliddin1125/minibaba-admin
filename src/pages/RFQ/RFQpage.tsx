import RFQCard from "./ui/Card";
import RFQDetailModal from "./ui/DetailModal";
import RFQFilterDropdown from "./ui/FilterDropDown";
import RFQPagination from "./ui/Pagination";
import RFQTable from "./ui/Table";

export default function RFQ() {
  return (
    <div className="w-full p-6">
      {/* RFQ header */}
      <div className="flex items-start justify-between mb-6 mt-14">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Kelib tushgan so'rovlar
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sizga yuborilgan ulgurji savdo so'rovlari ro'yxati
          </p>
        </div>
        <RFQFilterDropdown />
      </div>

      {/* Content */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Desktopda chiqadigan table */}
        <div className="hidden md:block">
          <RFQTable />
        </div>
        {/* Mobileda cardlar chiqadi */}
        <div className="md:hidden">
          <RFQCard />
        </div>
        {/* Pagination */}
        <div className="px-4 pb-4 pt-2">
          <RFQPagination />
        </div>
      </div>

      <RFQDetailModal />
    </div>
  );
}