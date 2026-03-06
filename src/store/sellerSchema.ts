import { z } from "zod";

export const sellerRegisterSchema = z.object({
  companyName: z
    .string()
    .min(2, "Kompaniya nomi kamida 2 ta belgidan iborat bo'lishi kerak"),

  activityType: z.string().min(1, "Faoliyat turini tanlang"),

  address: z.string().min(5, "Manzilni to'liq kiriting"),

  zipCode: z
    .string()
    .regex(/^\d{6}$/, "Pochta indeksi 6 ta raqamdan iborat bo'lishi kerak"),

  innLicense: z
    .string()
    .min(9, "Litsenziya yoki INN raqamini to'liq kiriting"),

  licenseFile: z
    .instanceof(File, { message: "Litsenziya faylini yuklang" })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "Fayl hajmi 10MB dan oshmasligi kerak"
    )
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(
          file.type
        ),
      "Faqat PDF yoki JPG/PNG formatda yuklang"
    ),

  phone: z
    .string()
    .min(17, "To'liq telefon raqamini kiriting"),

  email: z.string().email("To'g'ri email manzilini kiriting"),

  password: z
    .string()
    .min(8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak"),

  agreeTerms: z.literal(true, {
    message: "Foydalanish shartlariga rozilik bildirish shart",
  }),
});

export type SellerRegisterFormData = z.infer<typeof sellerRegisterSchema>;