import { create } from "zustand";
import type { SellerRegisterFormData } from "./sellerSchema";

type StoredData = Omit<SellerRegisterFormData, "licenseFile">;

type SellerRegisterState = {
  registrationData: StoredData | null;
  isSubmitted: boolean;
  submitRegistration: (data: StoredData) => void;
  resetRegistration: () => void;
};

export const useSellerRegisterStore = create<SellerRegisterState>((set) => ({
  registrationData: null,
  isSubmitted: false,
  submitRegistration: (data) => set({ registrationData: data, isSubmitted: true }),
  resetRegistration: () => set({ registrationData: null, isSubmitted: false }),
}));