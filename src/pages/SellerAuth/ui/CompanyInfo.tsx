import { Building2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input, Select, Label, FieldError } from "./FormElements";
import type { SellerRegisterFormData } from "@/store/sellerSchema";
import { SectionHeader } from "./Header";

const ACTIVITY_TYPES = [
  { value: "retail", label: "Chakana savdo" },
  { value: "wholesale", label: "Ulgurji savdo" },
  { value: "manufacturing", label: "Ishlab chiqarish" },
  { value: "services", label: "Xizmat ko'rsatish" },
  { value: "ecommerce", label: "Elektron tijorat" },
  { value: "food", label: "Oziq-ovqat" },
  { value: "other", label: "Boshqa" },
];

export const CompanyInfoSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SellerRegisterFormData>();

  return (
    <section>
      <SectionHeader icon={Building2} title="Kompaniya ma'lumotlari" />

      <div className="space-y-4">
        {/* Kompaniya nomi + Faoliyat turi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Kompaniya nomi</Label>
            <Input
              id="companyName"
              placeholder="Masalan: OOO Golden Trade"
              hasError={!!errors.companyName}
              {...register("companyName")}
            />
            <FieldError message={errors.companyName?.message} />
          </div>

          <div>
            <Label htmlFor="activityType">Faoliyat turi</Label>
            <Select
              id="activityType"
              hasError={!!errors.activityType}
              {...register("activityType")}
            >
              <option value="">Tanlang</option>
              {ACTIVITY_TYPES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <FieldError message={errors.activityType?.message} />
          </div>
        </div>

        {/* Manzil */}
        <div>
          <Label htmlFor="address">Manzil</Label>
          <Input
            id="address"
            placeholder="Toshkent sh., Yunusobod tumani, 4-kvartal"
            hasError={!!errors.address}
            {...register("address")}
          />
          <FieldError message={errors.address?.message} />
        </div>

        {/* Zip code */}
        <div className="max-w-50">
          <Label htmlFor="zipCode">Zip code (Pochta indeksi)</Label>
          <Input
            id="zipCode"
            placeholder="100000"
            maxLength={6}
            hasError={!!errors.zipCode}
            {...register("zipCode", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
              },
            })}
          />
          <FieldError message={errors.zipCode?.message} />
        </div>
      </div>
    </section>
  );
};