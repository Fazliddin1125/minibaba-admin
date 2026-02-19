import { create } from "zustand";
import mockData from "./pages/Home/mock.json";

export type OrderStatus = "new" | "on_the_way" | "delivered" | "cancelled";

export interface Stat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  icon: string;
  color: "blue" | "green" | "orange" | "yellow";
  trend: string | null;
  trendValue: string | null;
}

export interface Product {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  sold: number;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  avatar: string | null;
  time: string;
  status: OrderStatus;
  statusLabel: string;
}

interface DashboardStore {
  user: typeof mockData.user;
  stats: Stat[];
  topProducts: Product[];
  recentOrders: Order[];
  dateRange: string;
  setDateRange: (range: string) => void;
}

export const useDashboardStore = create<DashboardStore>(() => ({
  user: mockData.user,
  stats: mockData.stats as Stat[],
  topProducts: mockData.topProducts,
  recentOrders: mockData.recentOrders as Order[],
  dateRange: "1-iyul, 2024 – 30-iyul, 2024",
  setDateRange: (range) =>
    useDashboardStore.setState({ dateRange: range }),
}));