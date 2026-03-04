import { create } from "zustand";
import type { RFQItem, RFQStatus } from "./rfqSchema";

const MOCK_DATA: RFQItem[] = [
  {
    id: "RFQ-88231",
    productName: "Smart Watch Series 8 Ultra (Oq)",
    categories: ["ELEKTRONIKA", "BILAK SOATLARI"],
    buyer: {
      id: "b1",
      name: "Shaxzod Alimov",
      initials: "SA",
      company: '"Global Tech Solutions" MCHJ',
      rating: 4.8,
      reviews: 12,
      city: "Toshkent",
      country: "UZB",
    },
    quantity: 500,
    date: "24.05.2024",
    status: "YANGI",
    description:
      "Bizga do'konimiz uchun yangi modeldagi Smart Watch soatlari kerak. Ranglari asosan oq va qora bo'lishi lozim. Mahsulotlar original qadoqda va kafolat bilan bo'lishi shart. Uzoq muddatli hamkorlikni ko'zlayapmiz.",
    specialRequirements: ["Sertifikat mavjudligi", "Bo'lib to'lash imkoniyati"],
    deliveryAddress: "Toshkent shahri, Yunusobod tumani",
    expectedDeadline: "10-iyun, 2024 gacha",
  },
  {
    id: "RFQ-88232",
    productName: "Bluetooth Earbuds Pro V2",
    categories: ["AKSESSUARLAR", "QULOQCHINLAR"],
    buyer: {
      id: "b2",
      name: "Bekzod Musayev",
      initials: "BM",
      company: '"AudioTech" MCHJ',
      rating: 4.5,
      reviews: 8,
      city: "Samarqand",
      country: "UZB",
    },
    quantity: 1200,
    date: "23.05.2024",
    status: "TAKLIF_YUBORILDI",
    description:
      "Bluetooth quloqchinlar kerak, ANC funksiyasi bo'lishi shart. Minimal buyurtma 1200 dona. Qadoqlash individual bo'lishi kerak.",
    specialRequirements: ["ANC funksiyasi", "IP54 suv o'tkazmaslik"],
    deliveryAddress: "Samarqand shahri, markaziy ombor",
    expectedDeadline: "15-iyun, 2024 gacha",
  },
  {
    id: "RFQ-88233",
    productName: "USB-C Fast Charging Cable 2m",
    categories: ["AKSESSUARLAR", "KABELLAR"],
    buyer: {
      id: "b3",
      name: "Lola Raximova",
      initials: "LR",
      company: '"Digital Store" XK',
      rating: 4.2,
      reviews: 5,
      city: "Namangan",
      country: "UZB",
    },
    quantity: 5000,
    date: "22.05.2024",
    status: "YANGI",
    description:
      "USB-C kabellar kerak, tez zaryadlash qo'llab-quvvatlashi shart. 100W dan kam bo'lmasin. Rang: qora va oq, teng miqdorda.",
    specialRequirements: ["100W quvvat qo'llab-quvvatlashi", "CE sertifikati"],
    deliveryAddress: "Namangan shahri, Uchtepa tumani",
    expectedDeadline: "20-iyun, 2024 gacha",
  },
  {
    id: "RFQ-88234",
    productName: "Wireless Gaming Mouse RGB",
    categories: ["KOMPYUTER", "SICHQONCHA"],
    buyer: {
      id: "b4",
      name: "Jasur Toshmatov",
      initials: "JT",
      company: '"GameZone" MCHJ',
      rating: 4.7,
      reviews: 20,
      city: "Toshkent",
      country: "UZB",
    },
    quantity: 300,
    date: "21.05.2024",
    status: "YAKUNLANGAN",
    description:
      "Gaming sichqoncha kerak, RGB apgaydlash imkoniyati bilan. 300 dona, qora rang.",
    specialRequirements: ["RGB yoritish", "2.4GHz simsiz"],
    deliveryAddress: "Toshkent shahri, Chilonzor tumani",
    expectedDeadline: "1-iyun, 2024 gacha",
  },
];

interface RFQStore {
  items: RFQItem[];
  selectedItem: RFQItem | null;
  isModalOpen: boolean;
  currentPage: number;
  itemsPerPage: number;
  filterStatus: RFQStatus | "ALL";

  openModal: (item: RFQItem) => void;
  closeModal: () => void;
  setPage: (page: number) => void;
  setFilterStatus: (status: RFQStatus | "ALL") => void;
  submitOffer: (id: string) => void;
  rejectRFQ: (id: string) => void;
  filteredItems: () => RFQItem[];
  totalPages: () => number;
  paginatedItems: () => RFQItem[];
}

export const useRFQStore = create<RFQStore>((set, get) => ({
  items: MOCK_DATA,
  selectedItem: null,
  isModalOpen: false,
  currentPage: 1,
  itemsPerPage: 4,
  filterStatus: "ALL",

  openModal: (item) => set({ selectedItem: item, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedItem: null }),
  setPage: (page) => set({ currentPage: page }),
  setFilterStatus: (status) => set({ filterStatus: status, currentPage: 1 }),

  submitOffer: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status: "TAKLIF_YUBORILDI" as RFQStatus } : item
      ),
      isModalOpen: false,
      selectedItem: null,
    })),

  rejectRFQ: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status: "RAD_ETILDI" as RFQStatus } : item
      ),
      isModalOpen: false,
      selectedItem: null,
    })),

  filteredItems: () => {
    const { items, filterStatus } = get();
    if (filterStatus === "ALL") return items;
    return items.filter((i) => i.status === filterStatus);
  },

  totalPages: () => {
    const { itemsPerPage } = get();
    return Math.ceil(get().filteredItems().length / itemsPerPage);
  },

  paginatedItems: () => {
    const { currentPage, itemsPerPage } = get();
    const filtered = get().filteredItems();
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  },
}));