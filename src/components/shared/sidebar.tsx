import { NavLink } from "react-router-dom"; // Link o'rniga NavLink
import { LayoutDashboard, Box, ShoppingCart, MessageSquare, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Asosiy panel", href: "/" },
  { icon: Box, label: "Mahsulotlar", href: "/products" },
  { icon: ShoppingCart, label: "Buyurtmalar", href: "/orders" },
  { icon: MessageSquare, label: "Xabarlar", href: "/messages" },
  { icon: BarChart3, label: "Statistika", href: "/statistics" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col py-6 px-4">
      {/* Logo qismi */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-[#f47b25] rounded-xl flex items-center justify-center shadow-lg">
          <Box className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-[#1a2233] leading-tight font-sans">Minibaba Seller</h2>
          <p className="text-[12px] text-gray-400 font-sans">Wholesale Panel</p>
        </div>
      </div>

      {/* Menyu elementlari */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) => 
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group font-sans",
                isActive 
                  ? "bg-[#fff5ed] text-[#f47b25]" // Active bo'lganda sarg'ish fon
                  : "text-[#5c6b89] hover:bg-gray-50" // Active bo'lmaganda oddiy holat
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-[#f47b25]" : "text-[#5c6b89] group-hover:text-[#1a2233]"
                )} />
                <span className={cn(
                  "text-[14px] font-medium",
                  isActive ? "font-semibold" : ""
                )}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}