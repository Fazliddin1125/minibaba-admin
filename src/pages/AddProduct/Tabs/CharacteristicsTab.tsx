import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Plus, ChevronDown } from "lucide-react";
import { useAddProductStore } from "../../../store/addProductStore";
import { cn } from "../../../lib/utils";
import type { TabProps } from "./BasicTab";
import FooterNavigation from "../ui/FooterNavigation";

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
  "O'zbekiston", "Xitoy", "Rossiya", "Germaniya",
  "AQSH", "Turkiya", "Janubiy Koreya", "Yaponiya",
  "Italiya", "Hindiston",
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
  { name: "material",       label: "Material",                type: "text",   placeholder: "Premium Paxta"  },
  { name: "akumlyator",     label: "Akumlyator quvvati",      type: "number", placeholder: "Masalan: 5000",  suffix: "mAh" },
  { name: "uzunligi",       label: "Uzunligi",                type: "number", placeholder: "Masalan: 120",   suffix: "sm"  },
  { name: "standart",       label: "Standart",                type: "text",   placeholder: "Masalan: ISO 9001" },
  { name: "brend",          label: "Brend",                   type: "text",   placeholder: "Brend nomini kiriting" },
  { name: "mamlakat",       label: "Kelib chiqish mamlakati", type: "select", placeholder: "Tanlang", options: COUNTRIES },
  { name: "ranglarSoni",    label: "Ranglar soni",            type: "text",   placeholder: "Masalan: 4 xil" },
  { name: "kafolatMuddati", label: "Kafolat muddati",        type: "number", placeholder: "Masalan: 12",    suffix: "oy"  },
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
                Mahsulot xususiyatlari
              </h3>
              <p className="text-sm text-muted-foreground">
                Kategoriya bo'yicha tavsiya etilgan texnik ko'rsatkichlarni to'ldiring
              </p>
            </div>

            {/* Yangi qo'shish */}
            <button
              type="button"
              className={cn(
                "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-md) text-xs font-semibold",
                "border border-(--primary)/40 text-primary bg-(--primary)/5",
                "hover:bg-(--primary)/10 transition-colors"
              )}
            >
              <Plus size={13} />
              Yangi qo'shish
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
          Keyingi
        </button>
      </div>
    </div>
  );
}