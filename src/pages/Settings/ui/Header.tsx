import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSettingsStore } from "../../../store/settingsStore";

const navItems = [
  { label: "Asosiy", href: "/" },
  { label: "Buyurtmalar", href: "/orders" },
  { label: "Mahsulotlar", href: "/products" },
  { label: "Sozlamalar", href: "/settings", active: true },
];

export default function Header() {
  const { storeId } = useSettingsStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-300 mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex gap-4">        
          {/* Logo */}
          <a href="/">
            <img src="/logo.png" alt="logo" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.active
                    ? "text-primary border-b-2 border-primary rounded-none pb-1.5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        {/* Headerning o'ng tomoni */}
        <div className="flex items-center gap-3">
          {/* Bildirishnomalar */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors relative">
            <Bell size={18} className="text-foreground" />
          </button>

          {/* User info (faqat desktop uchun) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground leading-tight">
                Premium Global Trade
              </p>
              <p className="text-xs text-muted-foreground">ID: {storeId}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-background text-xs font-bold">P</span>
            </div>
          </div>

          {/* User avatar */}
          <div className="md:hidden w-9 h-9 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-background text-xs font-bold">P</span>
          </div>

          {/* Menu buton (faqat mobile uchun) */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobileda chiqadigan menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute right-0 border-t border-border bg-background px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  item.active
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-sm font-semibold">Premium Global Trade</p>
            <p className="text-xs text-muted-foreground">ID: {storeId}</p>
          </div>
        </div>
      )}
    </header>
  );
}