
import React, { useState, useEffect } from 'react';
import { generateMeditation } from '../services/geminiService';
import SocialShare from './SocialShare';

const DailyVerse: React.FC = () => {
  const [meditation, setMeditation] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);
  
  const verseLabel = "Jean 8:12";
  const verseText = "Je suis la lumière du monde; celui qui me suit ne marchera pas dans les ténèbres.";

  useEffect(() => {
    const fetchMeditation = async () => {
      try {
        const text = await generateMeditation(`${verseLabel} - ${verseText}`);
        setMeditation(text);
      } catch (e) {
        setMeditation("Que la paix du Seigneur soit avec vous aujourd'hui au Tabernacle.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeditation();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-20">
      <div className="bg-[#121212] border border-[#c5a059]/30 p-8 md:p-12 rounded-sm shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="text-[10px] tracking-[0.3em] text-[#c5a059] font-bold uppercase mb-4 block">Parole de Vie</span>
            <h2 className="font-serif text-2xl md:text-3xl italic mb-6 leading-relaxed">
              "{verseText}"
            </h2>
            <p className="text-[#c5a059] font-bold text-xs tracking-widest uppercase">{verseLabel}</p>
          </div>
          <div className="w-[1px] h-24 bg-white/10 hidden md:block" />
          <div className="flex-1">
             <p className="text-gray-400 text-sm leading-relaxed italic font-light">
               {loading ? "L'IA du Tabernacle prépare votre méditation..." : meditation}
             </p>
             <div className="mt-6 flex items-center space-x-6 justify-center md:justify-start">
               {!showShare ? (
                 <button 
                  onClick={() => setShowShare(true)}
                  className="text-[10px] tracking-widest font-bold text-white/40 hover:text-[#c5a059] transition-colors uppercase flex items-center"
                 >
                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                   </svg>
                   Partager
                 </button>
               ) : (
                 <div className="animate-fade-in flex items-center space-x-4">
                   <SocialShare title="Méditation du Tabernacle" text={`${verseLabel}: "${verseText}" - ${meditation}`} />
                   <button onClick={() => setShowShare(false)} className="text-[8px] font-bold text-gray-500 hover:text-white uppercase tracking-tighter">Fermer</button>
                 </div>
               )}
               <button className="text-[10px] tracking-widest font-bold text-white/40 hover:text-[#c5a059] transition-colors uppercase">Enregistrer</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyVerse;
