import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SupportChatModal: React.FC = () => {
  const { isSupportModalOpen, setIsSupportModalOpen } = useApp();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello John! Welcome to 24/7 Nova Cart Support. How can we help you today?' },
    { sender: 'bot', text: 'You can ask about recent orders, return pickup, SuperCoins, or refund status.' }
  ]);
  const [input, setInput] = useState('');

  if (!isSupportModalOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let reply = "Our representative has noted your request. We've verified your active shipment for Boat Rockerz 450; it is out for delivery today by 4:00 PM.";
      if (userText.toLowerCase().includes('return') || userText.toLowerCase().includes('refund')) {
        reply = 'We offer hassle-free 7-day doorstep returns with instant refunds initiated upon pickup.';
      } else if (userText.toLowerCase().includes('coin') || userText.toLowerCase().includes('super')) {
        reply = 'You currently have 1,250 SuperCoins! You can apply them at checkout for an extra discount.';
      }
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 flex flex-col h-[520px]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0056c3] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">24/7 Customer Helpdesk</h3>
              <p className="text-[11px] text-blue-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online now
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f7f9fc]">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#0056c3] text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#0056c3]"
          />
          <button
            type="submit"
            className="w-10 h-10 bg-[#0056c3] text-white rounded-xl flex items-center justify-center hover:bg-[#004299]"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
