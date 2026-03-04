import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft, User, CreditCard, Truck, CheckCircle,
  XCircle, FileText, Package, ChevronDown, AlertTriangle,
  RefreshCw, X
} from "lucide-react";

// ===== TYPES =====
export interface OrderProduct {
  id: string;
  image: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface OrderDetailType {
  id: string;
  status: "yangi" | "qabul_qilindi" | "yetkazilmoqda" | "yakunlandi";
  date: string;
  client: {
    name: string;
    phone: string;
    region: string;
    totalOrders: number;
  };
  products: OrderProduct[];
  payment: {
    method: string;
    amount: number;
    status: "tolangan" | "kutilmoqda" | "bekor";
  };
  delivery: {
    service: string;
    address: string;
  };
  history: {
    label: string;
    time: string;
    done: boolean;
    icon: "cart" | "check" | "person" | "truck";
  }[];
}

// ===== ZUSTAND STORE =====
interface OrderDetailStore {
  order: OrderDetailType | null;
  isLoading: boolean;
  error: string | null;
  setOrder: (order: OrderDetailType | null) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export const useOrderDetailStore = create<OrderDetailStore>((set) => ({
  order: null,
  isLoading: false,
  error: null,
  setOrder: (order) => set({ order }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

// ===== ZOD SCHEMAS =====
const acceptSchema = z.object({
  deliveryDate: z.string().min(1, "Muddatni tanlang"),
  note: z.string().optional(),
});

const cancelSchema = z.object({
  reason: z.string().min(1, "required"),
  comment: z.string().optional(),
});

const statusSchema = z.object({
  newStatus: z.string().min(1, "Statusni tanlang"),
});

type AcceptForm = z.infer<typeof acceptSchema>;
type CancelForm = z.infer<typeof cancelSchema>;
type StatusForm = z.infer<typeof statusSchema>;

// ===== MOCK DATA =====
const mockOrders: Record<string, OrderDetailType> = {
  "#88231": {
    id: "#88231", status: "yangi", date: "Bugun, 14:20",
    client: { name: "Shaxzod Alimov", phone: "+998 90 123 45 67", region: "Toshkent, Chilonzor", totalOrders: 12 },
    products: [
      { id: "1", image: "", name: "Smart Watch Series 8 Ultra", sku: "SKU: SW8-ULTRA-BLK", price: 1500000, quantity: 2 },
      { id: "2", image: "", name: "Bluetooth Earbuds Pro", sku: "SKU: BEP-02-WHT", price: 750000, quantity: 2 },
    ],
    payment: { method: "Payme", amount: 4500000, status: "tolangan" },
    delivery: { service: "Toshkent kuryer xizmati", address: "Chilonzor tumani, 9-kvartal, 12-uy, 45-xonadon" },
    history: [
      { label: "order_created", time: "Bugun, 14:20", done: true, icon: "cart" },
      { label: "payment_confirmed", time: "Bugun, 14:25", done: true, icon: "check" },
      { label: "in_progress", time: "Kutilmoqda...", done: false, icon: "truck" },
    ],
  },
  "#88229": {
    id: "#88229", status: "yetkazilmoqda", date: "Bugun, 11:45",
    client: { name: 'OOO "TechnoCorp"', phone: "+998 71 234 56 78", region: "Samarqand shahri", totalOrders: 5 },
    products: [
      { id: "1", image: "", name: "Laptop Lenovo ThinkPad X1", sku: "SKU: LTP-X1-BLK", price: 6400000, quantity: 2 },
    ],
    payment: { method: "Click", amount: 12800000, status: "tolangan" },
    delivery: { service: "Samarqand kuryer", address: "Samarqand, Registon ko'chasi, 5-uy" },
    history: [
      { label: "order_created", time: "Bugun, 11:45", done: true, icon: "cart" },
      { label: "payment_confirmed", time: "Bugun, 11:50", done: true, icon: "check" },
      { label: "in_progress", time: "Bugun, 12:10", done: true, icon: "truck" },
    ],
  },
  "#88225": {
    id: "#88225", status: "qabul_qilindi", date: "Kecha, 18:30",
    client: { name: "Malika Bozorova", phone: "+998 93 456 78 90", region: "Andijon viloyati", totalOrders: 3 },
    products: [
      { id: "1", image: "", name: "iPhone 15 Pro Max", sku: "SKU: IPH-15PM-BLK", price: 460000, quantity: 2 },
    ],
    payment: { method: "Uzum", amount: 920000, status: "kutilmoqda" },
    delivery: { service: "Andijon kuryer", address: "Andijon, Mustaqillik ko'chasi, 22-uy" },
    history: [
      { label: "order_created", time: "Kecha, 18:30", done: true, icon: "cart" },
      { label: "payment_confirmed", time: "Kutilmoqda...", done: false, icon: "check" },
      { label: "in_progress", time: "Kutilmoqda...", done: false, icon: "truck" },
    ],
  },
};

function fmt(n: number) {
  return n.toLocaleString("uz-UZ") + " UZS";
}

// ===== MODAL BACKDROP =====
function Backdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div className="w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// ===== ACCEPT MODAL =====
function AcceptModal({
  order,
  onClose,
  onSuccess,
}: {
  order: OrderDetailType;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { t: tModal } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<AcceptForm>({
    resolver: zodResolver(acceptSchema),
    defaultValues: { deliveryDate: "today" },
  });

  const onSubmit = (data: AcceptForm) => {
    console.log("Accept:", data);
    onSuccess();
    onClose();
  };

  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-gray-800">{tModal("modal_accept_title")}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order info */}
        <div className="mx-6 mb-5 bg-orange-50 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-0.5">{tModal("modal_accept_order_label")}</p>
            <p className="text-base font-bold text-gray-800">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-0.5">{tModal("modal_accept_total_label")}</p>
            <p className="text-base font-bold text-[#F97316]">
              {fmt(order.products.reduce((s, p) => s + p.price * p.quantity, 0))}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 flex flex-col gap-4">
          {/* Delivery date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {tModal("modal_delivery_date")}
            </label>
            <div className="relative">
              <select
                {...register("deliveryDate")}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 transition-all pr-10"
              >
                <option value="today">{tModal("modal_delivery_today")}</option>
                <option value="tomorrow">{tModal("modal_delivery_tomorrow")}</option>
                <option value="2days">{tModal("modal_delivery_2days")}</option>
                <option value="3days">{tModal("modal_delivery_3days")}</option>
                <option value="week">{tModal("modal_delivery_week")}</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.deliveryDate && <p className="text-xs text-red-500 mt-1">{errors.deliveryDate.message}</p>}
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {tModal("modal_note")} <span className="text-gray-400 font-normal">{tModal("modal_note_optional")}</span>
            </label>
            <textarea
              {...register("note")}
              rows={3}
              placeholder={tModal("modal_note_placeholder")}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300"
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#ea6c0c] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-orange-100"
          >
            <CheckCircle className="w-4 h-4" />
            {tModal("modal_confirm_accept")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all text-sm"
          >
            {tModal("cancel_order")}
          </button>
        </form>
      </div>
    </Backdrop>
  );
}

// ===== CANCEL MODAL =====
function CancelModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { t: tCancel } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<CancelForm>({
    resolver: zodResolver(cancelSchema),
  });

  const onSubmit = (data: CancelForm) => {
    console.log("Cancel:", data);
    onSuccess();
    onClose();
  };

  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold text-gray-800">{tCancel("modal_cancel_title")}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning */}
        <div className="mx-6 mt-2 mb-5 bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex gap-3 items-start">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 leading-relaxed">
            {tCancel("modal_cancel_warning")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 flex flex-col gap-4">
          {/* Reason */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              {tCancel("modal_cancel_reason_label")}
            </label>
            <div className="relative">
              <select
                {...register("reason")}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all pr-10"
                defaultValue=""
              >
                <option value="" disabled>{tCancel("modal_cancel_reason_placeholder")}</option>
                <option value="stok_yoq">{tCancel("modal_cancel_reason_no_stock")}</option>
                <option value="mijoz_rad">{tCancel("modal_cancel_reason_client")}</option>
                <option value="tolov_amalga_oshmadi">{tCancel("modal_cancel_reason_payment")}</option>
                <option value="yetkazib_berib_bolmaydi">{tCancel("modal_cancel_reason_delivery")}</option>
                <option value="boshqa">{tCancel("modal_cancel_reason_other")}</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason.message}</p>}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              {tCancel("modal_cancel_comment_label")}
            </label>
            <textarea
              {...register("comment")}
              rows={3}
              placeholder={tCancel("modal_cancel_comment_placeholder")}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all placeholder-gray-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all text-sm"
            >
              {tCancel("modal_back")}
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-all text-sm shadow-lg shadow-red-100"
            >
              {tCancel("modal_confirm_cancel")}
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  );
}

// ===== STATUS MODAL =====
const statusOptionKeys = [
  { value: "tayyorlanmoqda", labelKey: "modal_status_packing", descKey: "modal_status_packing_desc", color: "orange" },
  { value: "yetkazilmoqda", labelKey: "modal_status_shipped", descKey: "modal_status_shipped_desc", color: "blue" },
  { value: "bekor", labelKey: "modal_status_cancel", descKey: "modal_status_cancel_desc", color: "red" },
];

function StatusModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (status: string) => void;
}) {
  const { t: tStatus } = useTranslation();
  const { register, handleSubmit, watch } = useForm<StatusForm>({
    resolver: zodResolver(statusSchema),
    defaultValues: { newStatus: "tayyorlanmoqda" },
  });

  const selected = watch("newStatus");

  const onSubmit = (data: StatusForm) => {
    console.log("Status:", data);
    onSuccess(data.newStatus);
    onClose();
  };

  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5">
          <h2 className="text-lg font-bold text-gray-800">{tStatus("modal_status_title")}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 flex flex-col gap-3">
          {statusOptionKeys.map((opt) => {
            const isSelected = selected === opt.value;
            const isRed = opt.color === "red";

            const borderClass = isSelected
              ? isRed ? "border-red-400 bg-red-50" : "border-[#F97316] bg-orange-50"
              : "border-gray-200 bg-white hover:border-gray-300";

            const dotBorderClass = isSelected
              ? isRed ? "border-red-400" : "border-[#F97316]"
              : "border-gray-300";

            const dotFillClass = isSelected
              ? isRed ? "bg-red-400 scale-100" : "bg-[#F97316] scale-100"
              : "bg-transparent scale-0";

            const labelClass = isRed ? "text-red-500" : "text-gray-800";

            return (
              <label
                key={opt.value}
                className={`flex items-start gap-3 border-2 rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-150 ${borderClass}`}
              >
                <input
                  type="radio"
                  value={opt.value}
                  {...register("newStatus")}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${dotBorderClass}`}>
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-150 ${dotFillClass}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${labelClass}`}>{tStatus(opt.labelKey)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tStatus(opt.descKey)}</p>
                </div>
              </label>
            );
          })}

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 bg-[#F97316] hover:bg-[#ea6c0c] text-white font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-orange-100 text-sm"
            >
              {tStatus("modal_confirm")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all text-sm"
            >
              {tStatus("modal_close")}
            </button>
          </div>
        </form>
      </div>
    </Backdrop>
  );
}

// ===== MAIN COMPONENT =====
export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [modal, setModal] = useState<"accept" | "cancel" | "status" | null>(null);
  const [currentOrder, setCurrentOrder] = useState<OrderDetailType | null>(
    id ? mockOrders[decodeURIComponent(id)] ?? null : null
  );

  const order = currentOrder;

  const statusConfig: Record<string, { label: string; bg: string }> = {
    yangi:         { label: t("status_new"),        bg: "bg-[#F97316] text-white" },
    qabul_qilindi: { label: t("status_accepted"),   bg: "bg-blue-500 text-white" },
    yetkazilmoqda: { label: t("status_delivering"), bg: "bg-blue-500 text-white" },
    yakunlandi:    { label: t("status_done"),       bg: "bg-green-500 text-white" },
  };

  const paymentStatusConfig: Record<string, { label: string; cls: string }> = {
    tolangan:   { label: t("payment_paid"),      cls: "bg-green-100 text-green-600" },
    kutilmoqda: { label: t("payment_pending"),   cls: "bg-yellow-100 text-yellow-600" },
    bekor:      { label: t("payment_cancelled"), cls: "bg-red-100 text-red-500" },
  };

  const historyLabels: Record<string, string> = {
    order_created:     t("history_created"),
    payment_confirmed: t("history_payment"),
    order_accepted:    t("order_accepted"),
    in_progress:       t("history_progress"),
  };

  const handleAcceptSuccess = () => {
    if (!currentOrder) return;
    setCurrentOrder({
      ...currentOrder,
      status: "qabul_qilindi",
      history: [
        ...currentOrder.history.map(h => ({ ...h, done: true })),
        { label: "order_accepted", time: "Hozir", done: true, icon: "person" as const },
        { label: "in_progress", time: "Kutilmoqda...", done: false, icon: "truck" as const },
      ],
    });
  };

  if (!order) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Package className="w-12 h-12 text-gray-300" />
        <p className="text-gray-400">{t("order_not_found")}</p>
        <button onClick={() => navigate(-1)} className="text-[#F97316] hover:underline flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> {t("back")}
        </button>
      </div>
    );
  }

  const total = order.products.reduce((s, p) => s + p.price * p.quantity, 0);
  const isNew = order.status === "yangi";

  return (
    <div className="p-4 md:p-6 bg-[#f8f9fa] min-h-screen pb-28">

      {/* Modals */}
      {modal === "accept" && (
        <AcceptModal
          order={order}
          onClose={() => setModal(null)}
          onSuccess={handleAcceptSuccess}
        />
      )}
      {modal === "cancel" && (
        <CancelModal
          onClose={() => setModal(null)}
          onSuccess={() => {
            if (currentOrder) setCurrentOrder({ ...currentOrder, status: "yakunlandi" });
          }}
        />
      )}
      {modal === "status" && (
        <StatusModal
          onClose={() => setModal(null)}
          onSuccess={(s) => {
            if (!currentOrder) return;
            const map: Record<string, OrderDetailType["status"]> = {
              tayyorlanmoqda: "qabul_qilindi",
              yetkazilmoqda: "yetkazilmoqda",
              bekor: "yakunlandi",
            };
            if (map[s]) setCurrentOrder({ ...currentOrder, status: map[s] });
          }}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            {t("order_title")} {order.id}
          </h1>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusConfig[order.status]?.bg ?? "bg-gray-200 text-gray-600"}`}>
            {statusConfig[order.status]?.label ?? order.status}
          </span>
        </div>
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-gray-600">{t("order_date")}:</span> {order.date}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-5">

        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-5">

          {/* Products table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">{t("products_title")}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {[t("col_image"), t("col_product_name"), t("col_price"), t("col_qty"), t("col_total")].map((h, i) => (
                      <th key={i} className={`text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3 ${i === 4 ? "text-right" : i === 3 ? "text-center" : "text-left"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                          {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : null}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{p.sku}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{fmt(p.price)}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">{p.quantity}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#F97316] text-right whitespace-nowrap">
                        {fmt(p.price * p.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-100">
                    <td colSpan={4} className="px-6 py-4 text-right text-sm font-semibold text-gray-500">
                      {t("total_sum")}:
                    </td>
                    <td className="px-6 py-4 text-right text-lg font-bold text-[#F97316]">{fmt(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Order history */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">{t("order_history")}</h2>
            <div className="flex flex-col">
              {order.history.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${step.done ? "bg-[#F97316]" : "bg-gray-100"}`}>
                      {step.icon === "cart"   && <span className="text-base">🛒</span>}
                      {step.icon === "check"  && <CheckCircle className={`w-4 h-4 ${step.done ? "text-white" : "text-gray-300"}`} />}
                      {step.icon === "person" && <User className={`w-4 h-4 ${step.done ? "text-white" : "text-gray-300"}`} />}
                      {step.icon === "truck"  && <Truck className={`w-4 h-4 ${step.done ? "text-white" : "text-gray-300"}`} />}
                    </div>
                    {idx < order.history.length - 1 && (
                      <div className={`w-0.5 h-8 mt-1 ${step.done ? "bg-orange-200" : "bg-gray-100"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-semibold ${step.done ? "text-gray-800" : "text-gray-400"}`}>
                      {historyLabels[step.label] ?? step.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-72 flex flex-col gap-5">

          {/* Client */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-[#F97316]" />
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("client")}</h2>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center text-[#F97316] font-bold text-base shrink-0">
                {order.client.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{order.client.name}</p>
                <p className="text-xs text-gray-400">{order.client.phone}</p>
              </div>
            </div>
            <div className="border-t border-gray-50 pt-4 flex flex-col gap-2.5">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">{t("region")}:</span>
                <span className="text-xs font-medium text-gray-700">{order.client.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">{t("orders_count")}:</span>
                <span className="text-xs font-medium text-gray-700">{order.client.totalOrders} {t("pcs")}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-4 h-4 text-[#F97316]" />
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("payment")}</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{t("payment_method")}:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-gray-700">{order.payment.method}</span>
                  <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{t("amount")}:</span>
                <span className="text-sm font-bold text-[#F97316]">{fmt(order.payment.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{t("col_status")}:</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${paymentStatusConfig[order.payment.status]?.cls}`}>
                  {paymentStatusConfig[order.payment.status]?.label}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-[#F97316]" />
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("delivery")}</h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">{t("courier_service")}:</p>
              <p className="text-sm font-semibold text-gray-800">{order.delivery.service}</p>
              <p className="text-xs text-gray-400 mt-2">{t("address")}:</p>
              <p className="text-sm text-gray-700 leading-relaxed">{order.delivery.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar — fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 md:left-64">
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          {isNew ? (
            <button
              onClick={() => setModal("accept")}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#ea6c0c] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-100"
            >
              <CheckCircle className="w-4 h-4" />
              {t("accept_order")}
            </button>
          ) : (
            <button
              onClick={() => setModal("status")}
              className="flex items-center gap-2 bg-[#F97316] hover:bg-[#ea6c0c] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-100"
            >
              <RefreshCw className="w-4 h-4" />
              {t("modal_change_status")}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => alert(t("invoice_downloaded"))}
            className="flex items-center gap-2 border border-[#F97316] text-[#F97316] hover:bg-orange-50 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            {t("download_invoice")}
          </button>
        </div>

        <button
          onClick={() => setModal("cancel")}
          className="flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-600 transition-colors"
        >
          <XCircle className="w-4 h-4" />
          {t("cancel_order")}
        </button>
      </div>
    </div>
  );
}