import { create } from "zustand";

export interface BasicTabData {
  name: string;
  description: string;
  categoryId: string;
  moq: number;
}

export interface ImagesTabData {
  images: File[];
  videos: File[];
}

export interface CharacteristicsTabData {
  attributes: { key: string; value: string }[];
}

export interface PricesTabData {
  tiers: { minQty: number; maxQty: number; price: number }[];
}

export interface VariantsTabData {
  variants: {
    id: string;
    size: string;
    color: string;
    stock: number;
    images: File[];
  }[];
}

export type TabKey =
  | "basic"
  | "images"
  | "characteristics"
  | "prices"
  | "variants";

export interface AddProductStore {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;

  // Array ishlatiladi — Set Zustand re-render trigger qilmasligi mumkin
  completedTabs: TabKey[];
  markTabCompleted: (tab: TabKey) => void;

  basic: BasicTabData;
  images: ImagesTabData;
  characteristics: CharacteristicsTabData;
  prices: PricesTabData;
  variants: VariantsTabData;

  setBasic: (data: Partial<BasicTabData>) => void;
  setImages: (data: Partial<ImagesTabData>) => void;
  setCharacteristics: (data: Partial<CharacteristicsTabData>) => void;
  setPrices: (data: Partial<PricesTabData>) => void;
  setVariants: (data: Partial<VariantsTabData>) => void;

  resetStore: () => void;
}

// ─── Initial values ───────────────────────────────────────────────────────────

const initialBasic: BasicTabData = {
  name: "",
  description: "",
  categoryId: "",
  moq: 0,
};

const initialImages: ImagesTabData   = { images: [], videos: [] };
const initialCharacteristics: CharacteristicsTabData = { attributes: [{ key: "", value: "" }] };
const initialPrices: PricesTabData   = { tiers: [{ minQty: 1, maxQty: 0, price: 0 }] };
const initialVariants: VariantsTabData = { variants: [] };

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAddProductStore = create<AddProductStore>((set) => ({
  activeTab: "basic",
  setActiveTab: (tab) => set({ activeTab: tab }),

  completedTabs: [],
  markTabCompleted: (tab) =>
    set((state) => ({
      completedTabs: state.completedTabs.includes(tab)
        ? state.completedTabs
        : [...state.completedTabs, tab],
    })),

  basic: initialBasic,
  images: initialImages,
  characteristics: initialCharacteristics,
  prices: initialPrices,
  variants: initialVariants,

  setBasic: (data) => set((s) => ({ basic: { ...s.basic, ...data } })),
  setImages: (data) => set((s) => ({ images: { ...s.images, ...data } })),
  setCharacteristics: (data) =>
    set((s) => ({ characteristics: { ...s.characteristics, ...data } })),
  setPrices: (data) => set((s) => ({ prices: { ...s.prices, ...data } })),
  setVariants: (data) => set((s) => ({ variants: { ...s.variants, ...data } })),

  resetStore: () =>
    set({
      activeTab: "basic",
      completedTabs: [],
      basic: initialBasic,
      images: initialImages,
      characteristics: initialCharacteristics,
      prices: initialPrices,
      variants: initialVariants,
    }),
}));