import { ShoppingBag, TrendingUp, LayoutDashboard, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Millionlab xaridorlar",
    desc: "Sizning mahsulotlaringizni butun O'zbekiston bo'ylab ko'rishadi.",
  },
  {
    icon: LayoutDashboard,
    title: "Oson boshqaruv",
    desc: "Sotuvchi kabineti orqali tovarlar va buyurtmalarni oson boshqaring.",
  },
  {
    icon: ShieldCheck,
    title: "Xavfsiz to'lovlar",
    desc: "Har bir tranzaksiya himoyalangan va o'z vaqtida to'lanadi.",
  },
];

export const Sidebar = () => {

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-85 lg:w-90 xl:w-100 bg-primary z-10 overflow-hidden">
      {/* Logo */}
      <div className="px-8 pt-8">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Minibaba</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-between px-8 pb-8 overflow-hidden">
        <div>
          <h2 className="text-white text-2xl lg:text-[26px] font-bold leading-snug mt-12 mb-8">
            O'zbekistondagi eng yirik ulgurji marketplacega qo'shiling
          </h2>

          <ul className="space-y-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-white/65 text-xs mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Login link */}
        <div>
          <p className="text-white/55 text-sm mb-1">Allaqachon ro'yxatdan o'tganmisiz?</p>
          <a href="/login" className="text-white font-bold text-sm hover:underline underline-offset-2">
            Tizimga kirish
          </a>
        </div>
      </div>
    </aside>
  );
};