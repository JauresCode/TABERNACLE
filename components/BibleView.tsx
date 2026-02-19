
import React, { useState, useEffect, useRef } from 'react';
import { getBibleChapterText, getBibleAudio, getChapterExplanation } from '../services/geminiService';

const BibleView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'selection' | 'reading'>('selection');
  const [testament, setTestament] = useState<'old' | 'new'>('old');
  const [book, setBook] = useState('Genèse');
  const [chapter, setChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [verses, setVerses] = useState<{number: number, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  const oldTestament = [
    'Genèse', 'Exode', 'Lévitique', 'Nombres', 'Deutéronome', 'Josué', 'Juges', 'Ruth', 
    '1 Samuel', '2 Samuel', '1 Rois', '2 Rois', '1 Chroniques', '2 Chroniques', 'Esdras', 'Néhémie', 'Esther', 'Job',
    'Psaumes', 'Proverbes', 'Ecclésiaste', 'Cantique des Cantiques', 'Ésaïe', 'Jérémie', 
    'Lamentations', 'Ézéchiel', 'Daniel', 'Osée', 'Joël', 'Amos', 'Abdias', 'Jonas', 
    'Michée', 'Nahum', 'Habacuc', 'Sophonie', 'Aggée', 'Zacharie', 'Malachie'
  ];

  const newTestament = [
    'Matthieu', 'Marc', 'Luc', 'Jean', 'Actes', 'Romains', '1 Corinthiens', '2 Corinthiens',
    'Galates', 'Éphésiens', 'Philippiens', 'Colossiens', '1 Thessaloniciens', '2 Thessaloniciens',
    '1 Timothée', '2 Timothée', 'Tite', 'Philémon', 'Hébreux', 'Jacques', '1 Pierre', 
    '2 Pierre', '1 Jean', '2 Jean', '3 Jean', 'Jude', 'Apocalypse'
  ];

  // Load chapter text only when entering reading mode
  const loadChapter = async () => {
    setLoading(true);
    try {
      const data = await getBibleChapterText(book, chapter);
      setVerses(data.verses);
      setViewMode('reading');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const decodeAudioData = async (base64: string, ctx: AudioContext) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    const dataInt16 = new Int16Array(bytes.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
    return buffer;
  };

  const handleListen = async () => {
    if (isReading) {
      audioSourceRef.current?.stop();
      setIsReading(false);
      return;
    }
    setIsReading(true);
    try {
      const fullText = verses.map(v => v.text).join(' ');
      const base64Audio = await getBibleAudio(fullText);
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buffer = await decodeAudioData(base64Audio, audioContextRef.current);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => setIsReading(false);
      source.start();
      audioSourceRef.current = source;
    } catch (e) {
      setIsReading(false);
    }
  };

  const activeBooks = testament === 'old' ? oldTestament : newTestament;

  // Render Selection View
  if (viewMode === 'selection') {
    return (
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen animate-fade-in">
        <div className="text-center mb-16">
          <h2 className="font-serif text-6xl md:text-7xl mb-4 italic">Le Verbe Sacré</h2>
          <p className="text-gray-500 font-light tracking-[0.2em] uppercase text-xs">Sélectionnez votre chemin spirituel</p>
        </div>

        <div className="bg-[#121212] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
          {/* Testament Switcher */}
          <div className="flex border-b border-white/5 bg-black">
            <button 
              onClick={() => { setTestament('old'); setBook(oldTestament[0]); setChapter(1); }}
              className={`flex-1 py-6 text-xs font-bold tracking-[0.3em] transition-all ${testament === 'old' ? 'bg-[#c5a059] text-black shadow-inner' : 'text-gray-500 hover:text-white'}`}
            >
              ANCIEN TESTAMENT
            </button>
            <button 
              onClick={() => { setTestament('new'); setBook(newTestament[0]); setChapter(1); }}
              className={`flex-1 py-6 text-xs font-bold tracking-[0.3em] transition-all ${testament === 'new' ? 'bg-[#c5a059] text-black shadow-inner' : 'text-gray-500 hover:text-white'}`}
            >
              NOUVEAU TESTAMENT
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 h-[60vh]">
            {/* Books List */}
            <div className="border-r border-white/5 flex flex-col h-full overflow-hidden">
              <div className="p-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Choisissez un Livre</span>
                <span className="text-[10px] text-[#c5a059] font-bold">{activeBooks.length} LIVRES</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 grid grid-cols-2 gap-2 content-start">
                {activeBooks.map(b => (
                  <button 
                    key={b}
                    onClick={() => { setBook(b); setChapter(1); }}
                    className={`text-left p-4 text-[11px] transition-all border rounded-sm uppercase tracking-tighter ${book === b ? 'bg-[#c5a059]/10 border-[#c5a059]/50 text-[#c5a059] font-bold' : 'border-white/5 text-gray-400 hover:border-white/20 hover:text-white'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapters Selection */}
            <div className="flex flex-col h-full overflow-hidden bg-black/20">
              <div className="p-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Choisissez un Chapitre</span>
                <span className="text-[10px] text-[#c5a059] font-bold uppercase">{book}</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-6 gap-3">
                  {[...Array(150)].map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setChapter(i + 1)}
                      className={`aspect-square flex items-center justify-center text-xs font-bold transition-all border rounded-sm ${chapter === i + 1 ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-lg shadow-gold/20 scale-110' : 'border-white/5 text-gray-600 hover:border-white/20 hover:text-white'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-8 bg-black border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
               <div className="w-12 h-12 bg-[#c5a059] flex items-center justify-center rounded-sm rotate-45">
                 <span className="text-black font-serif text-2xl font-bold -rotate-45">B</span>
               </div>
               <div>
                  <h4 className="font-serif text-2xl text-white italic">{book} {chapter}</h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Prêt pour la méditation divine</p>
               </div>
            </div>
            <button 
              onClick={loadChapter}
              disabled={loading}
              className="bg-[#c5a059] text-black px-12 py-5 font-bold tracking-[0.3em] text-xs hover:bg-white transition-all shadow-2xl shadow-gold/20 flex items-center space-x-4"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>OUVERTURE...</span>
                </>
              ) : (
                <>
                  <span>COMMENCER LA LECTURE</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={2} /></svg>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Render Reading View
  return (
    <section className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto min-h-screen animate-fade-in-up">
      {/* Top Floating Navigation */}
      <div className="sticky top-24 z-50 mb-12 flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-sm shadow-2xl">
         <button 
          onClick={() => {
            setViewMode('selection');
            setExplanation(null);
            audioSourceRef.current?.stop();
            setIsReading(false);
          }}
          className="flex items-center space-x-3 text-[10px] font-bold text-gray-500 hover:text-[#c5a059] transition-all uppercase tracking-widest"
         >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg>
           <span>Retour à la sélection</span>
         </button>

         <div className="flex items-center space-x-6">
            <span className="text-[10px] font-bold text-[#c5a059] tracking-widest uppercase">{book} {chapter}</span>
            <div className="h-4 w-[1px] bg-white/10" />
            <button 
              onClick={handleListen} 
              className={`flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase transition-all ${isReading ? 'text-red-500' : 'text-white hover:text-[#c5a059]'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                {isReading ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/> : <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>}
              </svg>
              <span>{isReading ? 'ARRÊTER AUDIO' : 'ÉCOUTER'}</span>
            </button>
         </div>
      </div>

      {/* Focused Content Area */}
      <div className="space-y-16">
        <div className="text-center border-b border-white/5 pb-12">
          <h1 className="font-serif text-7xl md:text-9xl italic text-[#c5a059] mb-4 tracking-tighter">{book}</h1>
          <div className="flex items-center justify-center space-x-4">
             <div className="h-[1px] w-12 bg-[#c5a059]/30" />
             <span className="text-gray-500 tracking-[0.6em] uppercase text-xs font-bold">Chapitre {chapter}</span>
             <div className="h-[1px] w-12 bg-[#c5a059]/30" />
          </div>
        </div>

        <div className="max-w-none space-y-12">
          {verses.map((v) => (
            <div 
              key={v.number} 
              className={`group transition-all duration-700 ${selectedVerse === v.number ? 'bg-[#c5a059]/5 -mx-8 px-8 py-4 rounded-sm' : ''}`}
            >
              <p 
                onClick={() => setSelectedVerse(selectedVerse === v.number ? null : v.number)}
                className={`text-2xl md:text-4xl font-serif leading-relaxed cursor-pointer transition-all ${selectedVerse === v.number ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'} ${v.number === 1 ? 'first-letter:text-9xl first-letter:text-[#c5a059] first-letter:float-left first-letter:mr-6 first-letter:font-bold first-letter:leading-[0.8]' : ''}`}
              >
                <span className={`text-[12px] font-bold mr-6 transition-colors ${selectedVerse === v.number ? 'text-[#c5a059]' : 'text-gray-700'}`}>{v.number}</span>
                {v.text}
              </p>
            </div>
          ))}
        </div>
        
        {/* Meditation Footer Section */}
        <div className="mt-32 pt-20 border-t border-white/5">
          {!explanation ? (
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-8 italic">Besoin d'un éclairage spirituel sur ce chapitre ?</p>
              <button 
                onClick={async () => {
                  setLoading(true);
                  const exp = await getChapterExplanation(book, chapter);
                  setExplanation(exp);
                  setLoading(false);
                }}
                disabled={loading}
                className="text-[10px] tracking-[0.4em] font-bold text-[#c5a059] hover:text-white transition-all uppercase border border-[#c5a059]/30 px-12 py-6 group"
              >
                {loading ? 'SYNTHÈSE DIVINE...' : 'DEMANDER UNE MÉDITATION'}
              </button>
            </div>
          ) : (
            <div className="bg-[#121212] p-12 rounded-sm border border-[#c5a059]/20 animate-fade-in-up relative shadow-2xl">
               <div className="absolute top-0 right-12 -translate-y-1/2 bg-[#c5a059] text-black px-6 py-2 text-[10px] font-bold uppercase tracking-widest">TABERNACLE AI</div>
               <h4 className="font-serif text-4xl italic mb-8 text-white">Éclairage de la Parole</h4>
               <p className="text-xl md:text-2xl italic leading-relaxed text-gray-400 font-light">{explanation}</p>
               <button 
                onClick={() => setExplanation(null)}
                className="mt-12 text-[9px] font-bold text-gray-600 hover:text-white uppercase tracking-widest"
               >
                 Masquer l'explication
               </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BibleView;
