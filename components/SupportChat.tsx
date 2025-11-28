import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Send, Cpu } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Identity Verified. Oracle System Online. How may I assist your transaction?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error: Link unstable. Retrying handshake...' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-40 bg-[#0f172a] border border-cyan-500/50 hover:bg-cyan-900/30 text-cyan-400 p-3.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Terminal size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-4 w-80 max-w-[calc(100vw-32px)] h-96 bg-[#030712]/95 border border-cyan-900 rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right backdrop-blur-xl ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-3 border-b border-cyan-900/50 flex justify-between items-center bg-[#0f172a]/80 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-cyan-900/50 rounded border border-cyan-500/30">
              <Cpu size={14} className="text-cyan-400" />
            </div>
            <div>
               <h3 className="text-sm font-bold text-cyan-50 font-mono tracking-wide">ORACLE_V2.1</h3>
               <span className="text-[9px] text-green-500 font-mono flex items-center gap-1">
                 <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> SYSTEM ACTIVE
               </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-cyan-400">
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar font-mono">
           {messages.map((msg, idx) => (
             <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[85%] p-2.5 text-[10px] sm:text-xs leading-relaxed ${msg.role === 'user' ? 'bg-cyan-900/30 text-cyan-50 border border-cyan-800 rounded-tl-lg rounded-tr-lg rounded-bl-lg' : 'text-slate-300 border-l-2 border-cyan-500 pl-3'}`}>
                 {msg.role === 'model' && <span className="block text-[8px] text-cyan-600 mb-1">>>> RESPONSE:</span>}
                 {msg.text}
               </div>
             </div>
           ))}
           {isLoading && (
             <div className="flex justify-start pl-3">
               <div className="text-cyan-500 text-xs animate-pulse font-mono">
                 Processing block...
               </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-cyan-900/50 flex gap-2 bg-[#02040a]">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter command..."
            className="flex-1 bg-slate-900/50 border border-slate-800 rounded-sm px-3 py-2 text-xs text-cyan-50 font-mono focus:outline-none focus:border-cyan-500/50 placeholder:text-slate-600"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-cyan-900/20 border border-cyan-800 text-cyan-400 rounded-sm disabled:opacity-50 hover:bg-cyan-900/40"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SupportChat;