
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChatResponse } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getInitialGreeting = () => {
    const hour = new Date().getHours();
    const churchName = "Le Tabernacle de la Foi";
    if (hour < 12) return `Bonjour et bienvenue au ${churchName}. Comment puis-je vous accompagner spirituellement aujourd'hui ?`;
    if (hour < 18) return `Bon après-midi. Que la grâce du ${churchName} soit avec vous. En quoi puis-je vous aider ?`;
    return `Bonsoir. Que la paix du Seigneur repose sur vous au sein du ${churchName}. Avez-vous besoin d'une prière ?`;
  };

  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: getInitialGreeting() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
      const response = await getGeminiChatResponse(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Désolé, je rencontre une difficulté. Prions pour que mon système se rétablisse vite !" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {isOpen ? (
        <div className="bg-[#121212] w-[90vw] sm:w-[400px] h-[600px] rounded-sm border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          <div className="p-4 bg-[#c5a059] flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center"><span className="text-white text-xs font-bold">AI</span></div>
              <span className="text-black font-bold tracking-widest text-[9px] uppercase">ASSISTANT DU TABERNACLE</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-sm text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20' : 'bg-white/5 text-gray-300 border border-white/5'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="flex justify-start"><div className="bg-white/5 p-4 rounded-sm flex space-x-1 border border-white/5"><div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:0.2s]" /><div className="w-1.5 h-1.5 bg-[#c5a059] rounded-full animate-bounce [animation-delay:0.4s]" /></div></div>}
          </div>
          <div className="p-4 bg-black border-t border-white/5 flex space-x-2">
            <input type="text" placeholder="Posez votre question..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:border-[#c5a059] outline-none text-white" />
            <button onClick={handleSend} className="bg-[#c5a059] text-black px-4 rounded-sm hover:bg-white transition-all disabled:opacity-50" disabled={isLoading}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-16 h-16 bg-[#c5a059] rounded-full flex items-center justify-center shadow-2xl shadow-gold/40 hover:scale-110 active:scale-95 transition-all transform animate-bounce-slow">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
