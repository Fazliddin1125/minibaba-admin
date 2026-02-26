import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ChevronDown, Save } from "lucide-react";
import { useAddProductStore } from "../../../store/addProductStore";
import { cn } from "../../../lib/utils";
import FooterNavigation from "../ui/FooterNavigation";
import i18n from "@/i18n/i18n";



const basicSchema = z.object({
  name: z.string().min(1, i18n.t("enter_product_name")),
  description: z.string().refine(
    (val) => val.replace(/<[^>]*>/g, "").trim().length > 0,
    { message: i18n.t("enter_description") }
  ),
  categoryId: z.string().min(1, i18n.t("select_category")),
  moq: z
    .string()
    .min(1, i18n.t("enter_moq"))
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: i18n.t("there_is_at_least_one"),
    }),
});

type BasicFormValues = z.infer<typeof basicSchema>;

// Statik kategoriyalar
const CATEGORIES = [
  { id: "1", label: "Kiyim-kechak" },
  { id: "2", label: "Elektronika" },
  { id: "3", label: "Oziq-ovqat" },
  { id: "4", label: "Sport jihozlari" },
  { id: "5", label: "Uy-ro'zg'or buyumlari" },
  { id: "6", label: "Kosmetika" },
  { id: "7", label: "Kitoblar" },
  { id: "8", label: "O'yinchoqlar" },
];

// Quill sozlamalari. Rich text uchun Quill kutubxonasidan foydalandim. 

const QUILL_MODULES = {
  toolbar: [
    ["bold", "italic"],
    [{ list: "bullet" }, { list: "ordered" }],
    ["link", "image"],
  ],
};

const QUILL_FORMATS = ["bold", "italic", "list", "link", "image"];

// ASOSIY COMPONENT. Basic Tab =========================================================================================

export interface TabProps {
  onNext: () => void;
  onSaveDraft: () => void;
}

export default function BasicTab({ onNext, onSaveDraft }: TabProps) {
  const { basic, setBasic, markTabCompleted } = useAddProductStore();

  const {register, control, handleSubmit, watch, formState: { errors }} = useForm<BasicFormValues>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: basic.name,
      description: basic.description,
      categoryId: basic.categoryId,
      moq: basic.moq > 0 ? String(basic.moq) : "",
    },
    mode: "onTouched",
  });

  // O'zgarishlarni Zustand store'ga saqlovhii funksya
  useEffect(() => {
    const subscription = watch((values) => {
      setBasic({
        name: values.name ?? "",
        description: values.description ?? "",
        categoryId: values.categoryId ?? "",
        moq: Number(values.moq) || 0,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setBasic]);

  // onSubmit: moq stringni numberga aylantirish
  const onSubmit: SubmitHandler<BasicFormValues> = (data) => {
    setBasic({
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      moq: Number(data.moq),
    });
    markTabCompleted("basic");
    onNext();
  };

  return (
    <div>
      {/* Form card*/}
      <div className="bg-card rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="p-6 space-y-6">

            {/* Mahsulot nomi */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                {i18n.t("product_name")} <span className="text-destructive">*</span>
              </label>
              <input
                {...register("name")}
                placeholder={i18n.t("example_cotton_premium_shirt")}
                className={cn(
                  "w-full px-4 py-3 rounded-(--radius-md) border text-sm transition-all outline-none",
                  "bg-transparent text-foreground placeholder:text-muted-foreground",
                  "focus:border-primary focus:ring-2 focus:ring-(--primary)/20",
                  errors.name
                    ? "border-destructive focus:ring-(--destructive)/20"
                    : "border-border"
                )}
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Tavsif (Rich text). React Quill kutubxonasidan foydalandim */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                {i18n.t("description")} (Rich Text) <span className="text-destructive">*</span>
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <div
                    className={cn(
                      "rounded-(--radius-md) border overflow-hidden transition-all",
                      "[&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-border",
                      "[&_.ql-toolbar]:bg-muted",
                      "[&_.ql-container]:border-0 [&_.ql-container]:min-h-40",
                      "[&_.ql-editor]:min-h-40 [&_.ql-editor]:text-sm [&_.ql-editor]:text-foreground",
                      "[&_.ql-editor.ql-blank::before]:text-muted-foreground [&_.ql-editor.ql-blank::before]:not-italic",
                      errors.description
                        ? "border-destructive"
                        : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-(--primary)/20"
                    )}
                  >
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      modules={QUILL_MODULES}
                      formats={QUILL_FORMATS}
                      placeholder={i18n.t("enter_more_information_about_product")}
                    />
                  </div>
                )}
              />
              {errors.description && (
                <p className="text-xs text-destructive mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Kategoriya va MOQ qatori */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kategoriya */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  {i18n.t("category")} <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("categoryId")}
                    className={cn(
                      "w-full appearance-none px-4 py-3 pr-10 rounded-(--radius-md) border text-sm transition-all outline-none cursor-pointer",
                      "bg-card text-foreground",
                      "focus:border-primary focus:ring-2 focus:ring-(--primary)/20",
                      errors.categoryId
                        ? "border-destructive focus:ring-(--destructive)/20"
                        : "border-border"
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled className="text-muted-foreground">
                      {i18n.t("select_category")}
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                </div>
                {errors.categoryId && (
                  <p className="text-xs text-destructive mt-1">{errors.categoryId.message}</p>
                )}
              </div>

              {/* MOQ */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  {i18n.t("moq_minimum_order")} <span className="text-destructive">*</span>
                </label>
                <div
                  className={cn(
                    "flex items-center rounded-(--radius-md) border transition-all overflow-hidden",
                    "focus-within:border-primary focus-within:ring-2 focus-within:ring-(--primary)/20",
                    errors.moq
                      ? "border-destructive focus-within:ring-(--destructive)/20"
                      : "border-border"
                  )}
                >
                  <input
                    {...register("moq")}
                    type="number"
                    min={1}
                    placeholder="10"
                    className={cn(
                      "flex-1 px-4 py-3 text-sm outline-none bg-transparent",
                      "text-foreground placeholder:text-muted-foreground",
                      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    )}
                  />
                  <span className="px-3 py-3 text-sm text-muted-foreground bg-muted border-l border-border select-none">
                    {i18n.t("x_number")}
                  </span>
                </div>
                {errors.moq && (
                  <p className="text-xs text-destructive mt-1">{errors.moq.message}</p>
                )}
              </div>
            </div>
          </div>

        </form>
        
        {/* Footer navigation*/}
        <FooterNavigation onSaveDraft={onSaveDraft} onNext={onNext}/>
      </div>


      {/* Mobile'da pastda chiqaddigan button */}
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
          {i18n.t("save_product")}
        </button>
      </div>
    </div>
  );
}