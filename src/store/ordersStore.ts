import { create } from "zustand";

export type OrderStatus = "yangi" | "qabul_qilindi" | "yetkazilmoqda" | "yakunlandi";

export interface Order {
  id: string;
  client: string;
  company: string;
  date: string;
  amount: number;
  status: OrderStatus;
}

interface OrdersState {
  orders: Order[];
  activeTab: OrderStatus | "all";
  currentPage: number;
  setActiveTab: (tab: OrderStatus | "all") => void;
  setCurrentPage: (page: number) => void;
}

const mockOrders: Order[] = [
  { id: "#88231", client: "Shaxzod Alimov", company: "Toshkent, Chilonzor", date: "Bugun, 14:20", amount: 4500000, status: "yangi" },
  { id: "#88229", client: 'OOO "TechnoCorp"', company: "Samarqand shahri", date: "Bugun, 11:45", amount: 12800000, status: "yetkazilmoqda" },
  { id: "#88225", client: "Malika Bozorova", company: "Andijon viloyati", date: "Kecha, 18:30", amount: 920000, status: "qabul_qilindi" },
  { id: "#88210", client: "Akbar Toshkentov", company: "Toshkent, Yunusobod", date: "12.05.2024", amount: 1200000, status: "yakunlandi" },
  { id: "#88205", client: "Sardor Nazarov", company: "Buxoro shahri", date: "11.05.2024", amount: 3400000, status: "yangi" },
  { id: "#88200", client: "Dilnoza Yusupova", company: "Toshkent, Mirzo Ulug'bek", date: "11.05.2024", amount: 780000, status: "yakunlandi" },
  { id: "#88198", client: "Bobur Karimov", company: "Namangan viloyati", date: "10.05.2024", amount: 5600000, status: "qabul_qilindi" },
  { id: "#88190", client: "Zulfiya Rashidova", company: "Farg'ona shahri", date: "10.05.2024", amount: 2100000, status: "yetkazilmoqda" },
  { id: "#88185", client: "Ulugbek Mirzayev", company: "Toshkent, Shayxontohur", date: "09.05.2024", amount: 890000, status: "yangi" },
  { id: "#88180", client: "Kamola Ergasheva", company: "Samarqand viloyati", date: "09.05.2024", amount: 4200000, status: "yakunlandi" },
];

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: mockOrders,
  activeTab: "all",
  currentPage: 1,
  setActiveTab: (tab) => set({ activeTab: tab, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));