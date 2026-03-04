import { offerFormSchema, type OfferFormData, type RFQItem } from "@/store/rfqSchema";
import { useRFQStore } from "@/store/rfqStore";
import { X, CheckCircle2, ArrowRight, MapPin, Calendar, Star } from "lucide-react";
import { useState } from "react";
import RFQStatusBadge from "./StatusBadge";

// Klent profili
function BuyerProfile({ item }: { item: RFQItem }) {
  const { buyer, deliveryAddress, expectedDeadline } = item;
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
        Xaridor profili
      </p>

      {/* Klent */}
      <div className="flex items-center gap-3 pb-3 border-b border-border mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ backgroundColor: "oklch(0.95 0.05 45)", color: "var(--primary)" }}
        >
          {buyer.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">{buyer.name}</p>
          <p className="text-xs text-muted-foreground">{buyer.company}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-foreground">{buyer.rating}</span>
            <span className="text-xs text-muted-foreground">({buyer.reviews} bitim)</span>
          </div>
        </div>
      </div>

      {/* Yetkazbi berish manzili */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "oklch(0.95 0.05 45)" }}
        >
          <MapPin size={14} style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Yetkazib berish manzili
          </p>
          <p className="text-sm font-semibold text-foreground mt-0.5">{deliveryAddress}</p>
        </div>
      </div>

      {/* Dedlayn */}
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "oklch(0.95 0.05 45)" }}
        >
          <Calendar size={14} style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Kutilayotgan muddat
          </p>
          <p className="text-sm font-semibold text-foreground mt-0.5">{expectedDeadline}</p>
        </div>
      </div>
    </div>
  );
}

// Offer form 
interface OfferFormProps {
  form: OfferFormData;
  errors: Partial<Record<keyof OfferFormData, string>>;
  onChange: (key: keyof OfferFormData, value: string) => void;
}

function OfferForm({ form, errors, onChange }: OfferFormProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-4">Sizning taklifingiz</h3>

      {/* Narx, muddat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Narx */}
        <div>
          <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
            Taklif qilinayotgan narx (1 dona uchun, UZS)
          </label>
          <div
            className={`flex items-center border rounded-lg bg-background overflow-hidden transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${
              errors.price ? "border-destructive" : "border-input"
            }`}
          >
            <input
              type="text"
              value={form.price}
              onChange={(e) => onChange("price", e.target.value)}
              placeholder="Masalan: 450,000"
              className="flex-1 h-11 px-3 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <span className="px-3 text-sm font-medium text-muted-foreground border-l border-input h-full flex items-center">
              UZS
            </span>
          </div>
          {errors.price && (
            <p className="text-xs text-destructive mt-1">{errors.price}</p>
          )}
        </div>

        {/* Muddat */}
        <div>
          <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
            Yetkazib berish muddati (kunlarda)
          </label>
          <input
            type="text"
            value={form.deliveryDays}
            onChange={(e) => onChange("deliveryDays", e.target.value)}
            placeholder="Masalan: 3-5 kun"
            className={`w-full h-11 px-3 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              errors.deliveryDays ? "border-destructive" : "border-input"
            }`}
          />
          {errors.deliveryDays && (
            <p className="text-xs text-destructive mt-1">{errors.deliveryDays}</p>
          )}
        </div>
      </div>

      {/* deskription */}
      <div>
        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
          Izoh
        </label>
        <textarea
          value={form.comment}
          onChange={(e) => onChange("comment", e.target.value)}
          placeholder="Taklifingizga qo'shimcha ma'lumotlar qo'shing..."
          rows={4}
          className="w-full px-3 py-2.5 rounded-lg border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>
    </div>
  );
}

// Asosiy component =========================================================================================================
export default function RFQDetailModal() {
  const { isModalOpen, selectedItem, closeModal, submitOffer, rejectRFQ } =
    useRFQStore();

  const [form, setForm] = useState<OfferFormData>({
    price: "",
    deliveryDays: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OfferFormData, string>>>({});

  if (!isModalOpen || !selectedItem) return null;

  const canAct = selectedItem.status === "YANGI";

  const handleChange = (key: keyof OfferFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = () => {
    const result = offerFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof OfferFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof OfferFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    submitOffer(selectedItem.id);
    setForm({ price: "", deliveryDays: "", comment: "" });
    setErrors({});
  };

  const handleReject = () => {
    rejectRFQ(selectedItem.id);
    setForm({ price: "", deliveryDays: "", comment: "" });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Orqadagi xira qismi */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden">

        {/* Modal headeri*/}
        <div className="flex items-start justify-between px-6 py-5 border-b border-border shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-foreground pr-4">
            RFQ Tafsilotlari - #{selectedItem.id}
          </h2>
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-muted-foreground shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scroll bo'ladigan body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

          {/* Yuqoridagi qismi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* LEFT: Product info + Tavsif + Maxsus talablar */}
            <div className="space-y-4">
              {/* Product */}
              <div className="flex items-start gap-3">
                <div className="w-20 h-20 rounded-xl bg-linear-to-br from-secondary to-border shrink-0" />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
                    style={{ color: "var(--primary)" }}
                  >
                    {selectedItem.categories.join(" • ")}
                  </p>
                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {selectedItem.productName}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Miqdor:{" "}
                    <span className="font-semibold text-foreground">
                      {selectedItem.quantity.toLocaleString()} dona
                    </span>
                  </p>
                </div>
              </div>

              {/* Tavsif */}
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Tavsif
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Maxsus talablar */}
              {selectedItem.specialRequirements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Maxsus talablar
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedItem.specialRequirements.map((req) => (
                      <li key={req} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT: Buyer profile */}
            <div className="hidden md:block">
              <BuyerProfile item={selectedItem} />
            </div>
          </div>

          {/* Mobiledagi Buyer profile */}
          <div className="md:hidden">
            <BuyerProfile item={selectedItem} />
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Offer form, faqatgina YANGI bo'lganda */}
          {canAct ? (
            <OfferForm form={form} errors={errors} onChange={handleChange} />
          ) : (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-secondary border border-border">
              <RFQStatusBadge status={selectedItem.status} />
              <p className="text-sm text-muted-foreground">
                Bu so'rov bo'yicha taklif yuborish imkoni yo'q.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border shrink-0">
          {canAct ? (
            <>
              <button
                onClick={handleReject}
                className="h-11 px-5 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Rad etish
              </button>
              <button
                onClick={handleSubmit}
                className="h-11 px-6 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all active:scale-95"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <ArrowRight size={15} />
                Taklif yuborish
              </button>
            </>
          ) : (
            <button
              onClick={closeModal}
              className="h-11 px-6 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Yopish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}