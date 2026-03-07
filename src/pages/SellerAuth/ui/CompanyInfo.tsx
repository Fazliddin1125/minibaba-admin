import { Building2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input, Select, Label, FieldError } from "./FormElements";
import type { SellerRegisterFormData } from "@/store/sellerSchema";
import { SectionHeader } from "./Header";
import i18n from "@/i18n/i18n";



export const CompanyInfoSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SellerRegisterFormData>();
  
  const ACTIVITY_TYPES = [
    { value: "retail", label: i18n.t("retail") },
    { value: "wholesale", label: i18n.t("wholesale") },
    { value: "manufacturing", label: i18n.t("manufacturing") },
    { value: "services", label: i18n.t("services") },
    { value: "ecommerce", label: i18n.t("ecommerce") },
    { value: "food", label: i18n.t("food_beverage")},
    { value: "other", label: i18n.t("other") },
  ];

  return (
    <section>
      <SectionHeader icon={Building2} title={i18n.t("company_informations")} />

      <div className="space-y-4">
        {/* Kompaniya nomi + Faoliyat turi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">{i18n.t("company_name")}</Label>
            <Input
              id="companyName"
              placeholder={i18n.t("company_name_placeholder")}
              hasError={!!errors.companyName}
              {...register("companyName")}
            />
            <FieldError message={errors.companyName?.message} />
          </div>

          <div>
            <Label htmlFor="activityType">{i18n.t("type_of_activity")}</Label>
            <Select
              id="activityType"
              hasError={!!errors.activityType}
              {...register("activityType")}
            >
              <option value="">{i18n.t("select")}</option>
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
          <Label htmlFor="address">{i18n.t("address")}</Label>
          <Input
            id="address"
            placeholder={i18n.t("company_address_placeholder")}
            hasError={!!errors.address}
            {...register("address")}
          />
          <FieldError message={errors.address?.message} />
        </div>

        {/* Zip code */}
        <div className="max-w-50">
          <Label htmlFor="zipCode">{i18n.t("zip_code")}</Label>
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