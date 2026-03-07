import { useState } from "react";
import { CircleUser, Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input, Label, FieldError } from "./FormElements";
import type { SellerRegisterFormData } from "@/store/sellerSchema";
import { SectionHeader } from "./Header";
import i18n from "@/i18n/i18n";

export const AccountInfoSection = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext<SellerRegisterFormData>();

  return (
    <section>
      <SectionHeader icon={CircleUser} title={i18n.t("account_informations")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <Label htmlFor="email">{i18n.t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={i18n.t("email_register_placeholder")}
            hasError={!!errors.email}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Parol */}
        <div>
          <Label htmlFor="password">{i18n.t("password")}</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              hasError={!!errors.password}
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? i18n.t("hide_password") : i18n.t("show_password")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
        </div>
      </div>
    </section>
  );
};