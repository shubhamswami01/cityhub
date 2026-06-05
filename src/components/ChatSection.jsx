import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatSection = ({ className = '' }) => {
  const { user } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'support',
      text: "Welcome to Metropolis Live Support! How can I assist you with your municipal services today?",
      time: '09:00 AM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const text = inputValue.toLowerCase();
    setInputValue('');
    setIsTyping(true);

    // Simulate agent responding
    setTimeout(() => {
      let replyText = "Got it. I've logged this note to the Metropolis Support Desk. An official will review your query and respond shortly!";
      
      if (text.includes('water') || text.includes('leak') || text.includes('flood') || text.includes('pipe')) {
        replyText = "I see. Our municipal water utility team is currently performing repairs in Sector 4 and 5. If this is an emergency leak, please let me know your street name so I can raise its priority.";
      } else if (text.includes('garbage') || text.includes('trash') || text.includes('waste') || text.includes('clean') || text.includes('sanitation')) {
        replyText = "For missed waste pickups or sanitation complaints, I can log a rapid collection request. Could you provide your Sector and building number?";
      } else if (text.includes('light') || text.includes('street light') || text.includes('dark') || text.includes('electricity') || text.includes('power')) {
        replyText = "Streetlight maintenance is scheduled for Sector 2. If it's a new blackout, please specify the location so the Grid Services team can schedule a repair.";
      } else if (text.includes('safety') || text.includes('crime') || text.includes('police') || text.includes('emergency')) {
        replyText = "For any immediate hazards or safety concerns, please use the Emergency Contacts tab to call our direct hotlines, or dial 911 for law enforcement.";
      } else if (text.includes('complaint') || text.includes('status') || text.includes('ticket') || text.includes('report')) {
        replyText = "You can view the progress of all reported issues in the 'Reports' section in the left sidebar, or submit a new one using the 'Add Service Request' button.";
      } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
        replyText = `Hello ${user?.name || 'citizen'}! How can I help you today with Metropolis city services?`;
      }

      const supportMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'support',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, supportMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div 
      className={`rounded-[24px] border overflow-hidden transition-all duration-300 bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 flex flex-col h-[340px] shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50 dark:border-slate-850 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-450">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-white leading-none">
              Live Support Desk
            </h4>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">
              Metropolis Central Desk
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-400">
            ONLINE
          </span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                isUser ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div
                className={`px-3 py-2 text-xs rounded-[18px] leading-relaxed ${
                  isUser
                    ? 'bg-[#0b120f] text-white rounded-tr-none dark:bg-emerald-650'
                    : 'bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-200 border border-slate-100/30 dark:border-slate-800/20 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex flex-col mr-auto max-w-[85%] items-start">
            <div className="px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-850 text-slate-450 dark:text-slate-400 rounded-[18px] rounded-tl-none border border-slate-100/30 dark:border-slate-800/20">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-slate-50 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/50 flex gap-2 flex-shrink-0 items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about water, trash, lights..."
          className="flex-1 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/10 transition-all font-medium"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="p-1.5 rounded-xl bg-[#0b120f] dark:bg-emerald-600 hover:opacity-90 disabled:opacity-40 disabled:hover:opacity-40 text-white transition-all flex-shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatSection;
