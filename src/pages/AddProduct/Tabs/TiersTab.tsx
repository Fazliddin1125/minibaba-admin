import { useFieldArray, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useAddProductStore } from "../../../store/addProductStore";
import FooterNavigation from "../ui/FooterNavigation";
import { cn } from "../../../lib/utils";

// Sxema

const tierSchema = z.object({
  minQty: z.string().min(1, "Kiriting"),
  maxQty: z.string().optional(),
  price:  z.string().min(1, "Kiriting"),
});

const schema = z.object({
  tiers: z.array(tierSchema).min(1),
});

type FormValues = z.infer<typeof schema>;

// Propslar

interface PricesTabProps {
  onNext: () => void;
  onSaveDraft: () => void;
}

// Inputning stylelari

const inputCls = cn(
  "w-full px-3 py-2.5 rounded-[var(--radius-md)] border text-sm outline-none transition-all bg-transparent bg-card",
  "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
  "border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
);

// Tiers Tab component ==============================================================================================

export default function TiersTab({ onNext, onSaveDraft }: PricesTabProps) {
  const { prices, setPrices, markTabCompleted } = useAddProductStore();

  const { register, control, handleSubmit, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        tiers: prices.tiers.length > 0
          ? prices.tiers.map((t) => ({
              minQty: t.minQty > 0 ? String(t.minQty) : "",
              maxQty: t.maxQty > 0 ? String(t.maxQty) : "",
              price:  t.price  > 0 ? String(t.price)  : "",
            }))
          : [{ minQty: "", maxQty: "", price: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({ control, name: "tiers" });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setPrices({
      tiers: data.tiers.map((t) => ({
        minQty: Number(t.minQty) || 0,
        maxQty: Number(t.maxQty) || 0,
        price:  Number(t.price)  || 0,
      })),
    });
    markTabCompleted("prices");
    onNext();
  };

  const addTier = () => append({ minQty: "", maxQty: "", price: "" });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="p-4 sm:p-6 space-y-5">

          {/* Tab header */}
          <div>
            <h3 className="text-base font-bold text-foreground">
              Ulgurji narxlar darajalari
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Xaridor ko'proq sotib olsa, narx shuncha arzonlashadi
            </p>
          </div>

          {/* Desktop ustunlar headeri */}
          <div className="hidden sm:grid grid-cols-[1fr_1fr_1.2fr_auto] gap-3 items-center px-1 ">
            {["MINIMAL MIQDOR", "MAKSIMAL MIQDOR", "NARX (DONA UZS)"].map((h) => (
              <span key={h} className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                {h}
              </span>
            ))}
            <span />
          </div>

          {/* Narxlar qatori */}
          <div className="space-y-3">
            {fields.map((field, i) => {
              const isLast = i === fields.length - 1;
              const err = errors.tiers?.[i];

              return (
                <div
                  key={field.id}
                  className={cn(
                    "rounded-lg border border-border bg-muted",
                    /* Mobile */
                    "flex flex-col gap-3 p-4",
                    /* Desktop */
                    "sm:grid sm:grid-cols-[1fr_1fr_1.2fr_auto] sm:items-center sm:gap-3 sm:px-4 sm:py-3 "
                  )}
                >
                  {/* Minimal miqdor */}
                  <div className="space-y-1 sm:space-y-0">
                    <label className="text-xs font-semibold text-muted-foreground sm:hidden">
                      Minimal miqdor
                    </label>
                    <input
                      {...register(`tiers.${i}.minQty`)}
                      type="number"
                      placeholder="Masalan: 10"
                      className={cn(inputCls, err?.minQty && "border-destructive")}
                    />
                    {err?.minQty && (
                      <p className="text-xs text-destructive mt-0.5 sm:hidden">
                        {err.minQty.message}
                      </p>
                    )}
                  </div>

                  {/* Maksimal miqdor */}
                  <div className="space-y-1 sm:space-y-0">
                    <label className="text-xs font-semibold text-muted-foreground sm:hidden">
                      Maksimal miqdor
                    </label>
                    <input
                      {...register(`tiers.${i}.maxQty`)}
                      type="number"
                      placeholder={isLast ? "Maksimal" : "Masalan: 50"}
                      className={inputCls}
                    />
                  </div>

                  {/* Narx + suffix + delete */}
                  <div className="space-y-1 sm:space-y-0">
                    <label className="text-xs font-semibold text-muted-foreground sm:hidden">
                      Narx (UZS)
                    </label>
                    <div className="flex items-center gap-2">
                      {/* Narx input bilan suffix */}
                      <div className={cn(
                        "flex-1 flex items-center rounded-(--radius-md) border overflow-hidden transition-all",
                        "focus-within:border-primary focus-within:ring-2 focus-within:ring-(--primary)/20",
                        err?.price ? "border-destructive" : "border-border"
                      )}>
                        <input
                          {...register(`tiers.${i}.price`)}
                          type="number"
                          placeholder="Masalan: 45000"
                          className={cn(
                            "flex-1 px-3 py-2.5 text-sm outline-none bg-card",
                            "text-foreground placeholder:text-muted-foreground",
                            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          )}
                        />
                        <span className="px-2.5 py-2.5 text-xs font-medium text-muted-foreground bg-muted border-l border-border select-none">
                          UZS
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => fields.length > 1 && remove(i)}
                        className={cn(
                          "shrink-0 w-9 h-9 rounded-(--radius-md) flex items-center justify-center transition-colors",
                          fields.length > 1
                            ? "text-muted-foreground hover:text-destructive hover:bg-red-50"
                            : "text-muted-foreground/30 cursor-not-allowed"
                        )}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {err?.price && (
                      <p className="text-xs text-destructive mt-0.5 sm:hidden">
                        {err.price.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Narx qo'shish buttoni*/}
          <button
            type="button"
            onClick={addTier}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-lg",
              "border-2 border-dashed border-(--primary)/40 text-primary text-sm font-semibold",
              "hover:border-(--primary)/70 hover:bg-(--primary)/5 transition-all"
            )}
          >
            <Plus size={16} />
            Daraja qo'shish
          </button>
        </div>

        {/* Footer navigation */}
        <FooterNavigation
          onNext={handleSubmit(onSubmit)}
          onSaveDraft={onSaveDraft}
        />
      </form>

      {/* Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-10">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 active:scale-[0.98] transition-all"
          )}
        >
          Saqlash
        </button>
      </div>
    </div>
  );
}