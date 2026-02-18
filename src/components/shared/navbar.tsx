import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between sticky top-0 z-50">

      <div className="flex items-center gap-6"> 
        <div className="text-[20px] f tracking-tight text-[#0F172A] antialiased">
          Mahsulotlar
        </div>

  
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            className="pl-10 bg-[#f4f7f9] border-none h-10 rounded-lg placeholder:text-gray-400 text-[14px]"
            placeholder="Mahsulot nomi bo'yicha qidiruv..."
          />
        </div>
      </div>

  
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-gray-500" />
   
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}