import React, { useState, useRef, useEffect } from 'react';
import { INITIAL_MESSAGES, IMAGE_ASSETS } from '../constants';
import { ChatMessage } from '../types';
import { Send, Megaphone, User } from 'lucide-react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: '나 (Me)', // Simulating current user
      content: newMessage,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const notices = messages.filter(m => m.isNotice);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
       <div className="relative h-48 bg-primary flex-shrink-0">
         <img src={IMAGE_ASSETS.SUB_BG} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
         <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-6">
           <h1 className="text-2xl font-bold text-white">팀 대화방</h1>
           <p className="text-blue-100 text-sm mt-1">공지사항 확인 및 자유로운 소통 공간</p>
         </div>
       </div>

       <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-[calc(100vh-12rem)]">
         
         {/* Notices Area */}
         {notices.length > 0 && (
           <div className="bg-white border-l-4 border-accent p-4 mb-4 rounded shadow-sm flex-shrink-0">
             <div className="flex items-start">
               <Megaphone className="h-5 w-5 text-accent mr-3 mt-0.5" />
               <div>
                 <h3 className="font-bold text-gray-900 text-sm">필독 공지사항</h3>
                 {notices.map(notice => (
                    <p key={notice.id} className="text-sm text-gray-600 mt-1">{notice.content}</p>
                 ))}
               </div>
             </div>
           </div>
         )}

         {/* Chat Area */}
         <div className="flex-grow bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
           
           {/* Message List */}
           <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
             {messages.map((msg) => {
               const isMe = msg.sender === '나 (Me)';
               return (
                 <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                   {!isMe && (
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 mt-1">
                       <User size={16} className="text-gray-600"/>
                     </div>
                   )}
                   <div className={`max-w-[70%] rounded-lg px-4 py-2 shadow-sm ${
                     isMe 
                       ? 'bg-primary text-white rounded-tr-none' 
                       : msg.isNotice 
                         ? 'bg-red-50 border border-red-100 text-gray-800 w-full max-w-full'
                         : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                   }`}>
                     {!isMe && !msg.isNotice && <p className="text-xs font-bold text-gray-500 mb-1">{msg.sender}</p>}
                     <p className="text-sm leading-relaxed">{msg.content}</p>
                     <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>{msg.timestamp}</p>
                   </div>
                 </div>
               );
             })}
             <div ref={messagesEndRef} />
           </div>

           {/* Input Area */}
           <div className="p-4 bg-white border-t border-gray-100">
             <form onSubmit={handleSendMessage} className="flex gap-2">
               <input
                 type="text"
                 value={newMessage}
                 onChange={(e) => setNewMessage(e.target.value)}
                 placeholder="메시지를 입력하세요..."
                 className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
               />
               <button
                 type="submit"
                 className="bg-primary text-white rounded-full p-2 hover:bg-blue-700 transition-colors shadow-sm w-10 h-10 flex items-center justify-center flex-shrink-0"
               >
                 <Send size={18} />
               </button>
             </form>
           </div>
         </div>

       </div>
    </div>
  );
};

export default Chat;