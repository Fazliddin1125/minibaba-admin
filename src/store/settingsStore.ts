import { create } from "zustand";
import { type SettingsFormData } from "./settingsSchema"

interface Document {
  id: string;
  name: string;
  filename: string;
  verified: boolean;
}

interface SettingsState {
  // Form data
  formData: SettingsFormData;
  initialData: SettingsFormData;
  isDirty: boolean;
  isSaving: boolean;

  // Store profile
  storeLogo: string | null;
  storeBanner: string | null;
  isVerified: boolean;
  storeId: string;
  registrationNumber: string;

  // Documents
  documents: Document[];

  // Actions
  setField: <K extends keyof SettingsFormData>(
    key: K,
    value: SettingsFormData[K]
  ) => void;
  setStoreLogo: (url: string | null) => void;
  setStoreBanner: (url: string | null) => void;
  addDocument: (doc: Document) => void;
  removeDocument: (id: string) => void;
  save: () => Promise<void>;
  reset: () => void;
}

const defaultFormData: SettingsFormData = {
  storeName: "Premium Global Trade",
  location: "Toshkent, Sergeli tumani, 4-daha",
  description:
    "Biz O'zbekistondagi eng yirik to'qimachilik mahsulotlari ulgurji yetkazib beruvchisimiz. 10 yillik tajriba va 500 dan ortiq hamkorlarimiz mavjud.",
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  formData: { ...defaultFormData },
  initialData: { ...defaultFormData },
  isDirty: false,
  isSaving: false,

  storeLogo: null,
  storeBanner: null,
  isVerified: true,
  storeId: "8849201",
  registrationNumber: "#UZ-8849201",

  documents: [
    {
      id: "1",
      name: "Guvohnoma (INN)",
      filename: "inn_scan_v2.pdf",
      verified: true,
    },
    {
      id: "2",
      name: "Litsenziya",
      filename: "license_2024.jpg",
      verified: true,
    },
  ],

  setField: (key, value) => {
    set((state) => {
      const newFormData = { ...state.formData, [key]: value };
      const isDirty =
        JSON.stringify(newFormData) !== JSON.stringify(state.initialData);
      return { formData: newFormData, isDirty };
    });
  },

  setStoreLogo: (url) => set({ storeLogo: url }),
  setStoreBanner: (url) => set({ storeBanner: url }),

  addDocument: (doc) =>
    set((state) => ({ documents: [...state.documents, doc] })),

  removeDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((d) => d.id !== id),
    })),

  save: async () => {
    set({ isSaving: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    set((state) => ({
      isSaving: false,
      isDirty: false,
      initialData: { ...state.formData },
    }));
  },

  reset: () => {
    const { initialData } = get();
    set({ formData: { ...initialData }, isDirty: false });
  },
}));