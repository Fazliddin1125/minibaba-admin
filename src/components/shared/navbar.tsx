import { Search, Bell, Menu, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import Sidebar from "./sidebar";

const languages = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();

  return (
    <header className="w-full  h-[8vh] bg-white border-b border-gray-100 px-4 md:px-6 flex items-center justify-center fixed top-0 z-50 font-sans">

      <div className="w-full  flex items-center justify-between  mx-auto">
        {/* Chap tomondagi blok */}
        <div className="flex items-center gap-4 md:gap-8 flex-1">

          {/* Mobil menyu tugmasi */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-none">
                <Sidebar isMobile={true} />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-6 w-full max-w-2xl">
            <h1 className="text-[18px] hidden md:block md:text-[20px] font-semibold text-[#1a2233] whitespace-nowrap antialiased">
              {t("products")}
            </h1>

            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#f47b25] transition-colors" />
              <Input
                type="text"
                placeholder={t("search")}
                className="w-full pl-10 bg-[#f4f7f9] border-none focus-visible:ring-1 focus-visible:ring-orange-200 placeholder:text-gray-400 text-[14px] h-10 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* O'ng tomondagi blok: Til + Bell */}
        <div className="flex items-center gap-2 ml-4">

          {/* Til almashtirish */}
          <div className="flex items-center bg-[#f4f7f9] rounded-lg p-1 gap-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-md transition-all duration-200 ${i18n.language === lang.code
                    ? "bg-[#F97316] text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Bell */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group">
            <Bell className="w-5 h-5 text-gray-500 group-hover:text-[#1a2233]" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <MessageSquare className="w-5 h-5 text-gray-500 hover:text-[#1a2233] cursor-pointer" />
        </div>
      </div>

    </header>
  );
}