import { UserRound } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Label, FieldError } from "./FormElements";
import { PhoneInput } from "./PhoneInput";
import type { SellerRegisterFormData } from "@/store/sellerSchema";
import { SectionHeader } from "./Header";
import i18n from "@/i18n/i18n";

export const ContactSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SellerRegisterFormData>();

  return (
    <section>
      <SectionHeader icon={UserRound} title={i18n.t("register_contact")} />

      <div className="max-w-65">
        <Label htmlFor="phone">{i18n.t("phone")}</Label>
        <Controller
          name="phone"
          control={control}
          defaultValue="+998"
          render={({ field }) => (
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              hasError={!!errors.phone}
            />
          )}
        />
        <FieldError message={errors.phone?.message} />
      </div>
    </section>
  );
};