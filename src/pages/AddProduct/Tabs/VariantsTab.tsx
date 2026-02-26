import { useState, useRef } from "react";
import { Plus, Trash2, Upload, ChevronDown } from "lucide-react";
import { useAddProductStore } from "../../../store/addProductStore";
import FooterNavigation from "../ui/FooterNavigation";
import { cn } from "../../../lib/utils";
import i18n from "@/i18n/i18n";
import type { TabProps } from "./BasicTab";

// Types

type Status = "faol" | "nofaol";

interface Variant {
  id: string;
  image: File | null;
  imagePreview: string | null;
  color: string;
  size: string;
  stock: string;
  price: string;
  status: Status;
}

// Yordamchi funksiyalari

let idCounter = 0;
const genId = () => `v-${++idCounter}`;

const createVariant = (): Variant => ({
  id: genId(),
  image: null,
  imagePreview: null,
  color: "",
  size: "",
  stock: "",
  price: "",
  status: "faol",
});

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: "faol",   label: i18n.t("active")  },
  { value: "nofaol", label: i18n.t("inactive") },
];

// Shared input class

const inputCls = cn(
  "w-full px-2.5 py-2 rounded-[var(--radius-md)] border text-sm outline-none transition-all bg-transparent",
  "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
  "border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
);

// Rasm yuklash 

function ImageCell({
  preview,
  onChange,
}: {
  preview: string | null;
  onChange: (file: File) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => ref.current?.click()}
      className={cn(
        "w-10 h-10 rounded-(--radius-md) border-2 border-dashed flex items-center justify-center cursor-pointer transition-all shrink-0 overflow-hidden",
        preview
          ? "border-(--primary)/40"
          : "border-(--primary)/40 bg-primary/5 hover:bg-primary/10"
      )}
    >
      {preview ? (
        <img src={preview} alt="" className="w-full h-full object-cover" />
      ) : (
        <Upload size={14} className="text-(--primary)/60" />
      )}
      <input
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onChange(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// Status badge

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase",
        status === "faol"
          ? "bg-emerald-50 text-emerald-600"
          : "bg-muted text-muted-foreground"
      )}
    >
      {status === "faol" ? i18n.t("active").toUpperCase() : i18n.t("inactive").toUpperCase()}
    </span>
  );
}

// Asosiy compoennt

export default function VariantsTab({ onNext, onSaveDraft }: TabProps) {
  const { markTabCompleted } = useAddProductStore();

  const [variants, setVariants] = useState<Variant[]>([
    { ...createVariant(), color: "Qora", size: "XL", stock: "150", price: "45000", status: "faol",   imagePreview: null, image: null },
    { ...createVariant(), color: "Oq",   size: "L",  stock: "200", price: "45000", status: "faol",   imagePreview: null, image: null },
    { ...createVariant(), color: "Ko'k", size: "M",  stock: "50",  price: "42000", status: "nofaol", imagePreview: null, image: null },
  ]);

  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Ommaviy tahrirlash state
  const [bulkPrice,  setBulkPrice]  = useState("");
  const [bulkStock,  setBulkStock]  = useState("");
  const [bulkStatus, setBulkStatus] = useState<Status>("faol");

  // Variant CRUD

  const updateVariant = (id: string, patch: Partial<Variant>) => {
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  };

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
    setSelected((prev) => { const s = new Set(prev); s.delete(id); return s; });
  };

  const addVariant = () => setVariants((prev) => [...prev, createVariant()]);

  const handleImage = (id: string, file: File) => {
    const preview = URL.createObjectURL(file);
    updateVariant(id, { image: file, imagePreview: preview });
  };

  // Selection

  const toggleAll = () => {
    if (selected.size === variants.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(variants.map((v) => v.id)));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const allChecked = variants.length > 0 && selected.size === variants.length;
  const someChecked = selected.size > 0 && !allChecked;

  // Ommaviy tahrirlash apply 

  const applyBulk = () => {
    setVariants((prev) =>
      prev.map((v) => {
        if (!selected.has(v.id)) return v;
        return {
          ...v,
          ...(bulkPrice ? { price: bulkPrice } : {}),
          ...(bulkStock ? { stock: bulkStock } : {}),
          status: bulkStatus,
        };
      })
    );
  };

  // Submit 

  const handleNext = () => {
    markTabCompleted("variants");
    onNext();
  };

  return (
    <div>
      <div className="p-4 sm:p-6 space-y-5">

        {/* Section header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground">
              {i18n.t("product_variants")} (Matrix)
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {i18n.t("price_and_stock_for_each_variant")}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={addVariant}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-(--radius-md) text-xs font-semibold",
                "border border-border bg-card text-foreground",
                "hover:bg-muted transition-colors"
              )}
            >
              <Plus size={13} /> {i18n.t("color")}
            </button>
            <button
              type="button"
              onClick={addVariant}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-(--radius-md) text-xs font-semibold",
                "border border-border bg-card text-foreground",
                "hover:bg-muted transition-colors"
              )}
            >
              <Plus size={13} /> {i18n.t("size")}
            </button>
          </div>
        </div>

        {/* Ommaviy tahrirlash panel */}
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold text-primary uppercase tracking-wide">
              {i18n.t("bulk_edit")}
            </span>
            {selected.size > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary text-white">
                {selected.size} {i18n.t("x_selected")}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
            {/* Narx */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {i18n.t("set_price")}
              </label>
              <div className="flex items-center rounded-(--radius-md) border border-border overflow-hidden bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-(--primary)/20">
                <input
                  type="number"
                  value={bulkPrice}
                  onChange={(e) => setBulkPrice(e.target.value)}
                  placeholder={i18n.t("apply_to_all")}
                  className="flex-1 px-3 py-2 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="px-2 text-xs font-medium text-muted-foreground bg-muted border-l border-border py-2 select-none">
                  UZS
                </span>
              </div>
            </div>

            {/* Zaxira */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {i18n.t("set_stock")}
              </label>
              <input
                type="number"
                value={bulkStock}
                onChange={(e) => setBulkStock(e.target.value)}
                placeholder={i18n.t("apply_to_all")}
                className="w-full px-3 py-2 rounded-(--radius-md) border border-border text-sm outline-none bg-white text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-(--primary)/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Holat */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {i18n.t("condition")}
              </label>
              <div className="relative">
                <select
                  value={bulkStatus}
                  onChange={(e) => setBulkStatus(e.target.value as Status)}
                  className="w-full appearance-none px-3 py-2 pr-8 rounded-(--radius-md) border border-border text-sm outline-none bg-white text-foreground focus:border-primary focus:ring-2 focus:ring-(--primary)/20 cursor-pointer"
                >
                  {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Qo'llash */}
            <button
              type="button"
              onClick={applyBulk}
              disabled={selected.size === 0}
              className={cn(
                "px-5 py-2 rounded-(--radius-md) text-sm font-semibold transition-all",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 active:scale-[0.98]",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              {i18n.t("apply")}
            </button>
          </div>
        </div>

        {/* Variants table */}
        <div className="rounded-lg border border-border overflow-hidden">

          {/* Table header — desktop */}
          <div className="hidden sm:grid sm:grid-cols-[auto_auto_1fr_1fr_1fr_1fr_auto_auto] gap-3 items-center px-4 py-3 bg-muted border-b border-border">
            {/* Select all checkbox */}
            <input
              type="checkbox"
              checked={allChecked}
              ref={(el) => { if (el) el.indeterminate = someChecked; }}
              onChange={toggleAll}
              className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
            />
            {[i18n.t("image"), i18n.t("color"), i18n.t("size"), i18n.t("stock")+" (QTY)", i18n.t("base_price"), i18n.t("condition"), ""].map((h) => (
              <span key={h} className="text-xs font-semibold text-muted-foreground">{h}</span>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {variants.map((v) => (
              <div key={v.id}>
                {/* Desktop row */}
                <div className="hidden sm:grid sm:grid-cols-[auto_auto_1fr_1fr_1fr_1fr_auto_auto] gap-3 items-center px-4 py-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selected.has(v.id)}
                    onChange={() => toggleOne(v.id)}
                    className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                  />
                  {/* Image */}
                  <ImageCell preview={v.imagePreview} onChange={(f) => handleImage(v.id, f)} />
                  {/* Color */}
                  <input value={v.color} onChange={(e) => updateVariant(v.id, { color: e.target.value })} placeholder={i18n.t("color")} className={inputCls} />
                  {/* Size */}
                  <input value={v.size} onChange={(e) => updateVariant(v.id, { size: e.target.value })} placeholder={i18n.t("size")} className={inputCls} />
                  {/* Stock */}
                  <input type="number" value={v.stock} onChange={(e) => updateVariant(v.id, { stock: e.target.value })} placeholder="0" className={inputCls} />
                  {/* Price */}
                  <input type="number" value={v.price} onChange={(e) => updateVariant(v.id, { price: e.target.value })} placeholder="0" className={inputCls} />
                  {/* Status badge */}
                  <button
                    type="button"
                    onClick={() => updateVariant(v.id, { status: v.status === "faol" ? "nofaol" : "faol" })}
                    title={i18n.t("change_state")}
                  >
                    <StatusBadge status={v.status} />
                  </button>
                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => removeVariant(v.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-(--radius-md) text-muted-foreground hover:text-destructive hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Mobile card */}
                <div className="sm:hidden p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selected.has(v.id)}
                      onChange={() => toggleOne(v.id)}
                      className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                    />
                    <ImageCell preview={v.imagePreview} onChange={(f) => handleImage(v.id, f)} />
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-muted-foreground font-semibold">{i18n.t("color")}</label>
                        <input value={v.color} onChange={(e) => updateVariant(v.id, { color: e.target.value })} placeholder={i18n.t("color")} className={cn(inputCls, "mt-0.5")} />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground font-semibold">{i18n.t("size")}</label>
                        <input value={v.size} onChange={(e) => updateVariant(v.id, { size: e.target.value })} placeholder={i18n.t("size")} className={cn(inputCls, "mt-0.5")} />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeVariant(v.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pl-7">
                    <div>
                      <label className="text-[10px] text-muted-foreground font-semibold">{i18n.t("stock")}</label>
                      <input type="number" value={v.stock} onChange={(e) => updateVariant(v.id, { stock: e.target.value })} placeholder="0" className={cn(inputCls, "mt-0.5")} />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground font-semibold">{i18n.t("price")}</label>
                      <input type="number" value={v.price} onChange={(e) => updateVariant(v.id, { price: e.target.value })} placeholder="0" className={cn(inputCls, "mt-0.5")} />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground font-semibold">{i18n.t("condition")}</label>
                      <button type="button" onClick={() => updateVariant(v.id, { status: v.status === "faol" ? "nofaol" : "faol" })} className="mt-0.5 block">
                        <StatusBadge status={v.status} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add variant button */}
        <button
          type="button"
          onClick={addVariant}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-lg",
            "border-2 border-dashed border-(--primary)/40 text-primary text-sm font-semibold",
            "hover:border-(--primary)/70 hover:bg-primary/5 transition-all"
          )}
        >
          <Plus size={16} />
          {i18n.t("add_new_variant")}
        </button>
      </div>

      {/* Footer */}
      <FooterNavigation onNext={handleNext} onSaveDraft={onSaveDraft} />

      {/* Mobile sticky */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-10">
        <button
          type="button"
          onClick={handleNext}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 active:scale-[0.98] transition-all"
          )}
        >
          {i18n.t("save")}
        </button>
      </div>
    </div>
  );
}