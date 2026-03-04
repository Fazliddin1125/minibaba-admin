import { Send } from "lucide-react";

const EmptyChatState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gray-50/50">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Send className="w-8 h-8 text-gray-300" />
    </div>
    <h3 className="text-lg font-bold text-gray-800">Xabarlar</h3>
    <p className="text-sm text-gray-400 max-w-xs mt-2">Muloqotni boshlash uchun chap tarafdagi ro'yxatdan chatni tanlang.</p>
  </div>
);

export default EmptyChatState;