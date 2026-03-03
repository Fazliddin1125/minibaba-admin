import { NavLink } from "react-router-dom";
import { LayoutDashboard, Box, ShoppingCart, MessageSquare, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Asosiy panel", href: "/" },
  { icon: Box, label: "Mahsulotlar", href: "/products" },
  { icon: ShoppingCart, label: "Buyurtmalar", href: "/orders" },
  { icon: MessageSquare, label: "Xabarlar", href: "/messages" },
  { icon: Settings, label: "Sozlamalar", href: "/settings" },
  { icon: BarChart3, label: "Statistika", href: "/statistics" },
  { icon: Box, label: "Yangi mahsulot qo'shish", href: "/add-product" },
];

type SidebarProps ={
  isMobile?: boolean;
}

export default function Sidebar({ isMobile }: SidebarProps) {
  return (
    <aside className={cn(
      "w-64 h-full flex flex-col py-6 px-4 font-sans h-100vh bg-white",
      !isMobile && "border-r border-gray-100"
    )}>

      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-[#f47b25] rounded-xl flex items-center justify-center ">
          <Box className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-[#1a2233] leading-tight">Minibaba Seller</h2>
          <p className="text-[12px] text-gray-400">Wholesale Panel</p>
        </div>
      </div>


      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) => 
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-[#fff5ed] text-[#f47b25]" 
                  : "text-[#5c6b89] hover:bg-gray-50"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-[#f47b25]" : "text-[#5c6b89] group-hover:text-[#1a2233]"
                )} />
                <span className={cn(
                  "text-[14px] font-medium transition-all",
                  isActive ? "font-bold" : "group-hover:translate-x-1"
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