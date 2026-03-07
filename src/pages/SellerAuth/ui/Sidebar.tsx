import i18n from "@/i18n/i18n";
import { TrendingUp, LayoutDashboard, ShieldCheck } from "lucide-react";



export const Sidebar = () => {

  const FEATURES = [
    {
      icon: TrendingUp,
      title: i18n.t("features_title1"),
      desc: i18n.t("features_description1"),
    },
    {
      icon: LayoutDashboard,
      title: i18n.t("features_title2"),
      desc: i18n.t("features_description2"),
    },
    {
      icon: ShieldCheck,
      title: i18n.t("features_title3"),
      desc: i18n.t("features_description3"),
    },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-85 lg:w-90 xl:w-100 bg-primary z-10 overflow-hidden">
      {/* Logo */}
      <div className="px-8 pt-8">
        <div className="flex items-center gap-2.5">
          <a href="/">
            <img src="/logo.png" alt="logo" />
          </a>
          <span className="text-white font-bold text-lg tracking-tight">Minibaba</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-between px-8 pb-8 overflow-hidden">
        <div>
          <h2 className="text-white text-2xl lg:text-[26px] font-bold leading-snug mt-12 mb-8">
            {i18n.t("slogan_call_to_join")}
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
          <p className="text-white/55 text-sm mb-1">{i18n.t("already_registered")}</p>
          <a href="/login" className="text-white font-bold text-sm hover:underline underline-offset-2">
            {i18n.t("sign_in")}
          </a>
        </div>
      </div>
    </aside>
  );
};