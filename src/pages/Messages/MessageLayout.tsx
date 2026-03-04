import { Outlet, useParams,  NavLink } from 'react-router-dom';
import {  Edit3, CheckCircle2 } from 'lucide-react';

const MessagesLayout = () => {
  const { chatId } = useParams(); 
  const isChatSelected = !!chatId; 

  const chats = [
    { id: '1', name: 'Tashkent Textile Group', lastMsg: 'We have received your bulk order...', time: '10:45 AM', verified: true, unread: true },
    { id: '2', name: 'Silk Route Exports', lastMsg: 'The shipping quote has been updated...', time: 'Yesterday', verified: true },
    { id: '3', name: 'Bukhara Ceramics', lastMsg: 'Thank you for your business!', time: 'Tuesday' },
  ];

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
   
      <div className={`${isChatSelected ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-gray-100`}>
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Inbox</h2>
          <Edit3 className="w-5 h-5 text-orange-500 cursor-pointer" />
        </div>

  
        <div className="flex gap-2 p-3 overflow-x-auto">
          {['All Chats', 'Unread', 'Verified'].map((tab) => (
            <button key={tab} className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-orange-500 hover:text-white transition-all">
              {tab}
            </button>
          ))}
        </div>

  
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <NavLink
              key={chat.id}
              to={`/messages/${chat.id}`}
              className={({ isActive }) => 
                `flex items-center gap-3 p-4 border-b border-transparent hover:bg-gray-50 transition-colors ${isActive ? 'bg-orange-50 border-l-4 border-l-primary' : ''}`
              }
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${chat.name}&background=random`} alt="" />
                </div>
                {chat.unread && <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 border-2 border-white rounded-full"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-semibold truncate flex items-center gap-1">
                    {chat.name} {chat.verified && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                  </h4>
                  <span className="text-[10px] text-gray-400">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>


      <div className={`${!isChatSelected ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-gray-50/30`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MessagesLayout;