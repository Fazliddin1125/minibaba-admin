import i18n from "@/i18n/i18n";
import { z } from "zod";

export const getSellerRegisterSchema = () => z.object({
  companyName: z
    .string()
    .min(2, i18n.t("error_company_name")),

  activityType: z.string().min(1, i18n.t("error_type_of_activity")),

  address: z.string().min(5, i18n.t("error_address")),

  zipCode: z
    .string()
    .regex(/^\d{6}$/, i18n.t("error_zip_code")),

  innLicense: z
    .string()
    .min(9, i18n.t("error_license_inn")),

  licenseFile: z
    .instanceof(File, { message: i18n.t("error_license_file") })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      i18n.t("error_file_size_10mb")
    )
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(
          file.type
        ),
      i18n.t("error_file_type")
    ),

  phone: z
    .string()
    .min(17, i18n.t("error_phone_number")),

  email: z.string().email(i18n.t("error_email")),

  password: z
    .string()
    .min(8, i18n.t("error_password")),

  agreeTerms: z.boolean().refine(val => val === true, {
    message: i18n.t("error_terms_agreement"),
  }),
});

export type SellerRegisterFormData = z.infer<ReturnType<typeof getSellerRegisterSchema>>;