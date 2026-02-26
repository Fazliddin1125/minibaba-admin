import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Plus, ChevronDown } from "lucide-react";
import { useAddProductStore } from "../../../store/addProductStore";
import { cn } from "../../../lib/utils";
import type { TabProps } from "./BasicTab";
import FooterNavigation from "../ui/FooterNavigation";
import i18n from "@/i18n/i18n";

// Sxema

const schema = z.object({
  material:        z.string().optional(),
  akumlyator:      z.string().optional(),
  uzunligi:        z.string().optional(),
  standart:        z.string().optional(),
  brend:           z.string().optional(),
  mamlakat:        z.string().optional(),
  ranglarSoni:     z.string().optional(),
  kafolatMuddati:  z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// Davlatlar

const COUNTRIES = [
  i18n.t("uzbekistan"), 
  i18n.t("china"), 
  i18n.t("russia"), 
  i18n.t("germany"),
  i18n.t("usa"), 
  i18n.t("turkey"), 
  i18n.t("south_korea"), 
  i18n.t("japan"),
  i18n.t("italy"), 
  i18n.t("india"),
];

// Field config

type FieldType = "text" | "number" | "select";

interface FieldConfig {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type: FieldType;
  suffix?: string;
  options?: string[];
}

const FIELDS: FieldConfig[] = [
  { name: "material",       label: i18n.t("material"),          type: "text",   placeholder: i18n.t("material_placeholder")  },
  { name: "akumlyator",     label: i18n.t("accumulator_power"), type: "number", placeholder: i18n.t("accumulator_power_placeholder"),  suffix: i18n.t("accumulatory_power_suffix") },
  { name: "uzunligi",       label: i18n.t("distance"),          type: "number", placeholder: i18n.t("distance_placeholder"),   suffix: i18n.t("distance_suffix")  },
  { name: "standart",       label: i18n.t("standart"),          type: "text",   placeholder: i18n.t("standart_placeholder") },
  { name: "brend",          label: i18n.t("brand"),             type: "text",   placeholder: i18n.t("brand_placeholder") },
  { name: "mamlakat",       label: i18n.t("made_in_country"),   type: "select", placeholder: i18n.t("made_in_country_placeholder"), options: COUNTRIES },
  { name: "ranglarSoni",    label: i18n.t("number_of_color"),   type: "text",   placeholder: i18n.t("number_of_color_placeholder") },
  { name: "kafolatMuddati", label: i18n.t("warranty_period"),   type: "number", placeholder: i18n.t("warranty_period_placeholder"),    suffix: i18n.t("warranty_period_suffix")  },
];

// Characteristics Tab component =======================================================================================

export default function CharacteristicsTab({ onNext, onSaveDraft }: TabProps) {
  const { characteristics, setCharacteristics, markTabCompleted } = useAddProductStore();

  // Initial valuelar
  const attrMap = Object.fromEntries(
    characteristics.attributes.map((a) => [a.key, a.value])
  );

  const { register, control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      material:        attrMap["material"]       ?? "",
      akumlyator:      attrMap["akumlyator"]     ?? "",
      uzunligi:        attrMap["uzunligi"]       ?? "",
      standart:        attrMap["standart"]       ?? "",
      brend:           attrMap["brend"]          ?? "",
      mamlakat:        attrMap["mamlakat"]       ?? "",
      ranglarSoni:     attrMap["ranglarSoni"]    ?? "",
      kafolatMuddati:  attrMap["kafolatMuddati"] ?? "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Formani store'ga saqlash
    const attributes = Object.entries(data)
      .filter(([, v]) => v && v.trim() !== "")
      .map(([key, value]) => ({ key, value: value as string }));

    setCharacteristics({ attributes });
    markTabCompleted("characteristics");
    onNext();
  };

  const inputBase = cn(
    "w-full px-4 py-3 rounded-radius-md border text-sm transition-all outline-none",
    "bg-transparent text-foreground placeholder:text-[var(--muted-foreground)]",
    "border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* Kontent */}
        <div className="p-4 sm:p-6 space-y-6">

          {/* Tab headeri */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-foreground">
                {i18n.t("product_characteristics")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {i18n.t("enter_required_technical_indicators")}
              </p>
            </div>

            {/* Yangi qo'shish */}
            <button
              type="button"
              className={cn(
                "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-md) text-xs font-semibold",
                "border border-(--primary)/40 text-primary bg-primary/5",
                "hover:bg-primary/10 transition-colors"
              )}
            >
              <Plus size={13} />
              {i18n.t("add_new")}
            </button>
          </div>

          {/* Formalarning layouti */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {FIELDS.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <div className="relative">
                    <Controller
                      name={field.name}
                      control={control}
                      render={({ field: f }) => (
                        <select
                          {...f}
                          className={cn(
                            inputBase,
                            "appearance-none pr-10 cursor-pointer bg-card",
                            !f.value && "text-muted-foreground"
                          )}
                          defaultValue=""
                        >
                          <option value="" disabled>{field.placeholder}</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      )}
                    />
                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                  </div>

                ) : field.suffix ? (
                  <div className={cn(
                    "flex items-center rounded-(--radius-md) border overflow-hidden transition-all",
                    "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-(--primary)/20"
                  )}>
                    <input
                      {...register(field.name)}
                      type={field.type}
                      placeholder={field.placeholder}
                      className={cn(
                        "flex-1 px-4 py-3 text-sm outline-none bg-transparent",
                        "text-foreground placeholder:text-muted-foreground",
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      )}
                    />
                    <span className="px-3 py-3 text-sm text-muted-foreground bg-muted border-l border-border select-none">
                      {field.suffix}
                    </span>
                  </div>

                ) : (
                  <input
                    {...register(field.name)}
                    type="text"
                    placeholder={field.placeholder}
                    className={inputBase}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

      </form>
      {/* Foooter navigation*/}
      <FooterNavigation onNext={onNext} onSaveDraft={onSaveDraft}/>

      {/* Mobile'da chiquvchi pastdagi button */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-10">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 active:scale-[0.98] transition-all"
          )}
        >
          <Save size={16} />
          {i18n.t("next")}
        </button>
      </div>
    </div>
  );
}