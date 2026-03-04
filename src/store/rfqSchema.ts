import { z } from "zod";

export const rfqStatusSchema = z.enum([
  "YANGI",
  "TAKLIF_YUBORILDI",
  "RAD_ETILDI",
  "YAKUNLANGAN",
]);

export type RFQStatus = z.infer<typeof rfqStatusSchema>;

export const rfqBuyerSchema = z.object({
  id: z.string(),
  name: z.string(),
  initials: z.string().max(2),
  company: z.string(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  city: z.string(),
  country: z.string(),
});

export const rfqItemSchema = z.object({
  id: z.string(),
  productName: z.string(),
  productImage: z.string().optional(),
  categories: z.array(z.string()),
  buyer: rfqBuyerSchema,
  quantity: z.number().int().positive(),
  date: z.string(),
  status: rfqStatusSchema,
  description: z.string(),
  specialRequirements: z.array(z.string()),
  deliveryAddress: z.string(),
  expectedDeadline: z.string(),
});

export const offerFormSchema = z.object({
  price: z
    .string()
    .min(1, "Narx kiritilishi shart")
    .refine(
      (v) => !isNaN(Number(v.replace(/\s/g, ""))) && Number(v.replace(/\s/g, "")) > 0,
      { message: "To'g'ri narx kiriting" }
    ),
  deliveryDays: z
    .string()
    .min(1, "Muddat kiritilishi shart")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "To'g'ri kun soni kiriting",
    }),
  comment: z.string().optional(),
});

export type RFQItem = z.infer<typeof rfqItemSchema>;
export type RFQBuyer = z.infer<typeof rfqBuyerSchema>;
export type OfferFormData = z.infer<typeof offerFormSchema>;