import { UserRound } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Label, FieldError } from "./FormElements";
import { PhoneInput } from "./PhoneInput";
import type { SellerRegisterFormData } from "@/store/sellerSchema";
import { SectionHeader } from "./Header";

export const ContactSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SellerRegisterFormData>();

  return (
    <section>
      <SectionHeader icon={UserRound} title="Aloqa" />

      <div className="max-w-65">
        <Label htmlFor="phone">Telefon</Label>
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