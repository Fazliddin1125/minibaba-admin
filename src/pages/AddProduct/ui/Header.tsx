import { NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Nav links config ──────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Asosiy", to: "/home" },
  { label: "Mahsulotlar", to: "/products" },
  { label: "Buyurtmalar", to: "/orders" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export function Header() {
  return (
    <header className="w-full bg-card border-b border-border h-14 flex items-center px-6 shrink-0">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex gap-5">
          {/* ── Logo ── */}
          <NavLink
            to="/home"
            className="flex items-center gap-2.5 shrink-0 select-none"
          >
            <div className="w-8 h-8 bg-primary rounded-(--radius-md) flex items-center justify-center shadow-sm">
              <ShoppingBag size={16} className="text-primary-foreground" />
            </div>
            <span className="text-[15px] font-bold text-foreground leading-none">
              Minibaba{" "}
              <span className="text-primary">Seller</span>
            </span>
          </NavLink>

          {/* ── Navigation ── */}
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-1.5 rounded-(--radius-md) text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* ── User avatar ── */}
        <div className="w-8 h-8 rounded-full bg-muted border-2 border-border overflow-hidden shrink-0 cursor-pointer hover:border-primary transition-colors">
          {/* Avatar placeholder — API tayyor bo'lgach <img src={user.avatar} /> bilan almashtiring */}
          <div className="w-full h-full bg-orange-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">A</span>
          </div>
        </div>

      </div>
    </header>
  );
}