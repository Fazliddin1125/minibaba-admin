import { ArrowLeft, Store, Download, Plus, Smile, Send, MoreVertical, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/messages')} className="md:hidden p-1 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center">
             <Store className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1">Tashkent Textile Group <CheckCircle2 className="w-3 h-3 text-blue-500" /></h3>
            <span className="text-[10px] text-green-500 font-medium">ONLINE</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-1 px-4 py-1.5 border rounded-lg text-xs font-medium hover:bg-gray-50"><Store className="w-4 h-4" /> Visit Store</button>
           <button className="p-2 bg-orange-500 text-white rounded-lg shadow-md"><FileText className="w-4 h-4" /></button>
           <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-6 bg-[#F8F9FB]">
        <div className="text-center"><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Today</span></div>
 
        <div className="flex gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=User" alt="" />
          </div>
          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
            <p className="text-sm text-gray-700 leading-relaxed">Hello! Thank you for contacting Tashkent Textile Group. We have received your bulk order inquiry for 100% organic cotton fabric (200gsm).</p>
            <span className="text-[10px] text-gray-400 mt-1 block text-right">10:42 AM</span>
          </div>
        </div>

        {/* PDF Attachment */}
        <div className="flex gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 overflow-hidden opacity-0"></div>
          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex flex-col gap-3">
            <p className="text-sm text-gray-700">I have attached our current wholesale price list for Q4. Please note that for orders over 5,000 meters, we offer a 12% discount.</p>
            <div className="flex items-center justify-between gap-12 p-3 bg-red-50 rounded-xl border border-red-100">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg"><FileText className="w-5 h-5 text-red-500" /></div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-800">Q4_Price_List_Organic_Cotton.pdf</p>
                    <p className="text-[10px] text-gray-400 uppercase">1.2 MB • PDF</p>
                  </div>
               </div>
               <Download className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Outgoing Message */}
        <div className="flex justify-end gap-3">
          <div className="bg-orange-500 p-3 rounded-2xl rounded-tr-none shadow-sm text-white max-w-[80%]">
            <p className="text-sm leading-relaxed">Great, thanks for the quick reply. Could you confirm if the lead time for 5,000 meters is still 14 business days to Tashkent?</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px] opacity-80 text-right">10:45 AM</span>
              <CheckCircle2 className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>


      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 mb-3">
           {['Send Sample Request', 'Request Quote', 'Availability'].map(btn => (
             <button key={btn} className="px-3 py-1 border rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50">{btn}</button>
           ))}
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2 px-4">
          <Plus className="w-5 h-5 text-gray-400 cursor-pointer" />
          <Smile className="w-5 h-5 text-gray-400 cursor-pointer" />
          <input type="text" placeholder="Type your message to the supplier..." className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700" />
          <button className="p-2 bg-orange-500 text-white rounded-xl shadow-md"><Send className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;