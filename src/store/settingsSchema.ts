import { z } from "zod";

export const settingsSchema = z.object({
  storeName: z
    .string()
    .min(2, "Do'kon nomi kamida 2 ta belgidan iborat bo'lishi kerak")
    .max(100, "Do'kon nomi 100 ta belgidan oshmasligi kerak"),
  location: z
    .string()
    .min(3, "Joylashuv kiritilishi shart")
    .max(200, "Joylashuv 200 ta belgidan oshmasligi kerak"),
  description: z
    .string()
    .min(10, "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak")
    .max(500, "Tavsif 500 ta belgidan oshmasligi kerak"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;