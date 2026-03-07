import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getSellerRegisterSchema, type SellerRegisterFormData } from "@/store/sellerSchema";
import { useSellerRegisterStore } from "@/store/sellerStore";
import { SuccessScreen } from "./ui/SuccessScreen";
import { CompanyInfoSection } from "./ui/CompanyInfo";
import { LegalInfoSection } from "./ui/LegalInfo";
import { ContactSection } from "./ui/Contact";
import { AccountInfoSection } from "./ui/AccountInfo";
import { Sidebar } from "./ui/Sidebar";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  {
    label: "O'zbekcha",
    code: "uz",
  },
  {
    label: "Русский",
    code: "ru",
  },
  {
    label: "English",
    code: "en",
  },
];

export const SellerRegisterPage = () => {
  const { isSubmitted, submitRegistration } = useSellerRegisterStore();
  const { i18n } = useTranslation();

  const methods = useForm<SellerRegisterFormData>({
    resolver: zodResolver(getSellerRegisterSchema()),
    defaultValues: {
      companyName: "",
      activityType: "",
      address: "",
      zipCode: "",
      innLicense: "",
      licenseFile: undefined,
      phone: "+998",
      email: "",
      password: "",
      agreeTerms: undefined,
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const agreeTerms = watch("agreeTerms");

  const onSubmit = (data: SellerRegisterFormData) => {
    const { licenseFile: _file, ...rest } = data;
    submitRegistration(rest);
  };

  if (isSubmitted) return <SuccessScreen />;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-background" style={{ fontFamily: "var(--font-sans, 'Manrope', sans-serif)" }}>
        {/* Sidebar, scroll bo'lmaydi */}
        <Sidebar />

        {/* Content*/}
        <main className="md:ml-85 lg:ml-100 xl:ml-110 min-h-screen">
          <div className="mx-auto px-6 py-8 sm:px-8 lg:px-12 lg:py-12">

            {/* Sarlavhalar */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5">
                {i18n.t("register_as_seller")}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {i18n.t("start_improving_ur_business_with_us")}
              </p>
            </div>

            {/* Formalar */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
              <CompanyInfoSection />
              <LegalInfoSection />
              <ContactSection />
              <AccountInfoSection />

              {/* Terms'ga rozi bo'lish, submit */}
              <div className="space-y-5">
                {/* Checkbox */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={agreeTerms === true}
                        onChange={(e) =>
                          setValue(
                            "agreeTerms",
                            e.target.checked ? true : (false as unknown as true),
                            { shouldValidate: true }
                          )
                        }
                      />
                      {/* Custom checkbox */}
                      <div
                        className={[
                          "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
                          agreeTerms
                            ? "bg-primary border-primary"
                            : errors.agreeTerms
                            ? "border-destructive"
                            : "border-border",
                        ].join(" ")}
                      >
                        {agreeTerms && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 10 8"
                          >
                            <path
                              d="M1 4l2.5 2.5L9 1"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">
                      {i18n.t("i")}{" "}
                      <a
                        href="/terms"
                        className="text-primary font-medium hover:underline underline-offset-2"
                      >
                        {i18n.t("usage_terms")}
                      </a>{" "}
                      {i18n.t("and")}{" "}
                      <a
                        href="/privacy"
                        className="text-primary font-medium hover:underline underline-offset-2"
                      >
                        {i18n.t("privacy_policy")}
                      </a>{" "}
                      {i18n.t("i_agree")}
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="mt-1.5 text-xs text-destructive pl-6">
                      {errors.agreeTerms.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-lg bg-primary text-primary-foreground text-base font-semibold transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? i18n.t("sending") : i18n.t("register")}
                </button>
              </div>
            </form>

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-muted-foreground">
                {i18n.t("copyright")}
              </p>
              <div className="flex items-center gap-4">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    type="button"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </footer>
          </div>
        </main>
      </div>
    </FormProvider>
  );
};

export default SellerRegisterPage;