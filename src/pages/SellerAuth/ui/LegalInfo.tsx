import { Scale } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Label, FieldError } from "./FormElements";
import { FileUpload } from "./FileUpload";
import { SectionHeader } from "./Header";
import type { SellerRegisterFormData } from "@/store/sellerSchema";
import i18n from "@/i18n/i18n";

export const LegalInfoSection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SellerRegisterFormData>();

  return (
    <section>
      <SectionHeader icon={Scale} title={i18n.t("legal_informations")} />

      <div className="space-y-4">
        {/* INN / Litsenziya */}
        <div>
          <Label htmlFor="innLicense">{i18n.t("license_or_inn")}</Label>
          <Input
            id="innLicense"
            placeholder="000 000 000"
            hasError={!!errors.innLicense}
            {...register("innLicense")}
          />
          <FieldError message={errors.innLicense?.message} />
        </div>

        {/* Fayl yuklash */}
        <div>
          <Label>{i18n.t("license_file")} (.pdf, .jpg)</Label>
          <Controller
            name="licenseFile"
            control={control}
            render={({ field }) => (
              <FileUpload
                value={field.value ?? null}
                onChange={(file) => field.onChange(file)}
                error={errors.licenseFile?.message as string | undefined}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
};