import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";


export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 px-4 md:px-6 h-16 flex items-center justify-between sticky top-0 z-50 font-sans">
      
      {/* Chap tomondagi blok: Menu + Sarlavha + Input bitta divda */}
      <div className="flex items-center gap-4 md:gap-8 flex-1">
        
        {/* Mobil menyu tugmasi (faqat sm ekranlarda) */}
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
            Mahsulotlar
          </h1>


          <div className="relative flex-1 group ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#f47b25] transition-colors" />
            <Input 
              type="text"
              placeholder="Qidiruv..."
              className="w-full pl-10 bg-[#f4f7f9] border-none focus-visible:ring-1 focus-visible:ring-orange-200 placeholder:text-gray-400 text-[14px] h-10 rounded-lg"
            />
          </div>
        </div>
      </div>


      <div className="flex items-center ml-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group">
          <Bell className="w-5 h-5 text-gray-500 group-hover:text-[#1a2233]" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>



    </header>
  );
}