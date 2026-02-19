
import React, { useState, useEffect } from 'react';
import { getQuizQuestion } from '../services/geminiService';
import { QuizQuestion } from '../types';

type GameStatus = 'idle' | 'playing' | 'loading' | 'finished';
type QuizMode = 'ia' | 'church';

interface QuizModuleProps {
  customQuestions?: QuizQuestion[];
}

const QuizModule: React.FC<QuizModuleProps> = ({ customQuestions = [] }) => {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [mode, setMode] = useState<QuizMode>('ia');
  const [difficulty, setDifficulty] = useState('Intermédiaire');
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  
  // To track already used custom questions to avoid repetition in one session
  const [usedCustomIndices, setUsedCustomIndices] = useState<number[]>([]);

  const startQuiz = (selectedMode: QuizMode) => {
    setMode(selectedMode);
    setScore(0);
    setQuestionCount(0);
    setUsedCustomIndices([]);
    
    // Adjust total questions for church mode if not enough questions available
    if (selectedMode === 'church') {
      setTotalQuestions(Math.min(customQuestions.length, 10));
    } else {
      setTotalQuestions(10);
    }
    
    fetchNext(selectedMode);
  };

  const fetchNext = async (currentMode?: QuizMode) => {
    const activeMode = currentMode || mode;
    const currentLimit = activeMode === 'church' ? Math.min(customQuestions.length, 10) : 10;

    if (questionCount >= currentLimit) {
      setStatus('finished');
      return;
    }
    
    setStatus('loading');
    setSelected(null);
    setShowResult(false);

    try {
      if (activeMode === 'ia') {
        const q = await getQuizQuestion(difficulty);
        setQuestion(q);
      } else {
        // Pick a random custom question not used yet
        const available = customQuestions.map((_, i) => i).filter(i => !usedCustomIndices.includes(i));
        if (available.length === 0) {
           setStatus('finished');
           return;
        }
        const randomIndex = available[Math.floor(Math.random() * available.length)];
        setQuestion(customQuestions[randomIndex]);
        setUsedCustomIndices(prev => [...prev, randomIndex]);
      }
      setQuestionCount(prev => prev + 1);
      setStatus('playing');
    } catch (e) {
      console.error(e);
      setStatus('idle');
    }
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === question?.correctAnswer) {
      setScore(s => s + 10);
    }
  };

  const getEncouragement = () => {
    const percentage = (score / (totalQuestions * 10)) * 100;
    if (mode === 'ia') {
      if (percentage >= 90) return "Une sagesse divine ! Votre connaissance des écritures est un pilier pour la communauté.";
      if (percentage >= 70) return "Fidèle et perspicace ! Vous marchez avec assurance dans la Parole.";
      return "Sonder les Écritures est une force. Continuez ce beau voyage spirituel.";
    } else {
      if (percentage >= 90) return "Vrai Citoyen du Tabernacle ! Vous connaissez l'église sur le bout des doigts.";
      if (percentage >= 70) return "Impliqué et attentif. Merci de faire battre le cœur de notre communauté.";
      return "Chaque jour au Tabernacle est une occasion d'apprendre et de grandir ensemble.";
    }
  };

  return (
    <section className="pt-32 pb-24 px-4 max-w-5xl mx-auto min-h-screen flex flex-col items-center">
      {/* Quiz Header */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-6xl md:text-7xl mb-4 italic text-white">Le Défi du Scribe</h2>
        <p className="text-[#c5a059] text-xs tracking-[0.4em] font-bold uppercase mb-8">Testez votre connaissance sacrée</p>
        
        {status !== 'idle' && status !== 'finished' && (
          <div className="flex flex-col items-center space-y-4">
             <div className="flex items-center space-x-2 text-[10px] tracking-widest font-bold text-gray-500 uppercase">
               <span>Mode {mode === 'ia' ? 'BIBLIQUE' : 'VIE DE L\'ÉGLISE'}</span>
               <span className="mx-2 opacity-20">|</span>
               <span>Question {questionCount} / {totalQuestions}</span>
               <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden ml-4">
                 <div 
                   className="h-full bg-[#c5a059] transition-all duration-1000" 
                   style={{ width: `${(questionCount / totalQuestions) * 100}%` }} 
                 />
               </div>
             </div>
             <div className="text-2xl font-serif text-[#c5a059]">{score} <span className="text-[10px] uppercase font-bold tracking-widest text-gray-600">Points</span></div>
          </div>
        )}
      </div>

      <div className="w-full max-w-3xl bg-[#121212] border border-white/5 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Idle State: Introduction */}
        {status === 'idle' && (
          <div className="p-12 text-center space-y-12 animate-fade-in">
             <div className="space-y-4">
               <h3 className="font-serif text-3xl italic">Portique du Savoir</h3>
               <p className="text-gray-400 font-light leading-relaxed max-w-md mx-auto italic">
                 Choisissez votre chemin d'illumination pour aujourd'hui.
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-black/40 border border-[#c5a059]/10 rounded-sm flex flex-col justify-between items-center text-center space-y-6 hover:border-[#c5a059]/40 transition-all group">
                   <div>
                     <h4 className="font-serif text-2xl text-white mb-2">Culture Biblique</h4>
                     <p className="text-[10px] text-gray-500 uppercase tracking-widest">Généré par Intelligence Divine</p>
                   </div>
                   <div className="flex space-x-2">
                    {['Débutant', 'Intermédiaire', 'Avancé'].map(d => (
                      <button 
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`px-3 py-1 text-[8px] font-bold border transition-all ${difficulty === d && mode === 'ia' ? 'bg-[#c5a059] text-black border-[#c5a059]' : 'border-white/5 text-gray-600 hover:text-white'}`}
                      >
                        {d}
                      </button>
                    ))}
                   </div>
                   <button 
                    onClick={() => startQuiz('ia')}
                    className="w-full py-4 bg-[#c5a059]/10 text-[#c5a059] font-bold tracking-[0.3em] text-[10px] uppercase border border-[#c5a059]/30 group-hover:bg-[#c5a059] group-hover:text-black transition-all"
                   >
                     LANCER LE DÉFI
                   </button>
                </div>

                <div className="p-8 bg-black/40 border border-[#c5a059]/10 rounded-sm flex flex-col justify-between items-center text-center space-y-6 hover:border-[#c5a059]/40 transition-all group">
                   <div>
                     <h4 className="font-serif text-2xl text-white mb-2">Vie du Tabernacle</h4>
                     <p className="text-[10px] text-gray-500 uppercase tracking-widest">{customQuestions.length} Questions Administrateur</p>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                   </div>
                   <button 
                    disabled={customQuestions.length === 0}
                    onClick={() => startQuiz('church')}
                    className="w-full py-4 bg-[#c5a059]/10 text-[#c5a059] font-bold tracking-[0.3em] text-[10px] uppercase border border-[#c5a059]/30 group-hover:bg-[#c5a059] group-hover:text-black transition-all disabled:opacity-20"
                   >
                     {customQuestions.length === 0 ? 'AUCUNE QUESTION' : 'TESTER MES CONNAISSANCES'}
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* Loading State */}
        {status === 'loading' && (
          <div className="p-20 flex flex-col items-center justify-center space-y-8 min-h-[400px]">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-[#c5a059]/20 rounded-full" />
              <div className="absolute inset-0 w-16 h-16 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-[10px] tracking-[0.4em] text-gray-500 uppercase font-bold animate-pulse">
              {mode === 'ia' ? 'Inspiration du Verbe...' : 'Extraction des archives...'}
            </p>
          </div>
        )}

        {/* Playing State */}
        {status === 'playing' && question && (
          <div className="p-8 md:p-16 animate-fade-in-up">
            <h3 className="font-serif text-3xl md:text-4xl text-center mb-16 leading-relaxed text-white">
              {question.question}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((opt, i) => {
                const isCorrect = i === question.correctAnswer;
                const isSelected = selected === i;
                
                let buttonClass = "bg-black/40 border-white/5 text-gray-400 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/5";
                if (showResult) {
                  if (isCorrect) buttonClass = "bg-green-500/10 border-green-500 text-green-400";
                  else if (isSelected) buttonClass = "bg-red-500/10 border-red-500 text-red-400";
                  else buttonClass = "bg-black/20 border-white/5 text-gray-600 opacity-40";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={showResult}
                    className={`group p-6 text-sm text-left transition-all border rounded-sm flex items-center ${buttonClass}`}
                  >
                    <span className={`w-8 h-8 flex items-center justify-center rounded-sm border mr-4 font-bold text-[10px] transition-colors ${
                      showResult && isCorrect ? 'bg-green-500 border-green-500 text-black' : 
                      showResult && isSelected ? 'bg-red-500 border-red-500 text-black' : 
                      'border-white/10 text-gray-600 group-hover:text-[#c5a059]'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showResult && isCorrect && (
                      <svg className="w-5 h-5 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="mt-16 animate-scale-in">
                <div className="bg-[#1a1a1a] border-l-4 border-[#c5a059] p-8 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] tracking-[0.3em] font-bold text-[#c5a059] uppercase">
                      {mode === 'ia' ? 'Méditation Théologique' : 'Note de l\'Église'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm italic leading-relaxed font-light">
                    {question.explanation}
                  </p>
                </div>
                <button 
                  onClick={() => fetchNext()}
                  className="mt-8 w-full py-5 bg-[#c5a059] text-black font-bold tracking-[0.4em] text-[10px] hover:bg-white transition-all shadow-xl"
                >
                  {questionCount < totalQuestions ? 'CONTINUER LE CHEMIN' : 'VOIR MA RÉCOLTE'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Finished State */}
        {status === 'finished' && (
          <div className="p-16 text-center space-y-12 animate-fade-in">
             <div className="space-y-4">
               <div className="w-24 h-24 bg-[#c5a059] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-gold/30">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
               </div>
               <h3 className="font-serif text-5xl italic">Moisson de Connaissance</h3>
               <div className="text-6xl font-serif text-[#c5a059]">{score} <span className="text-xs uppercase font-bold tracking-widest text-gray-500">Points</span></div>
             </div>

             <div className="max-w-md mx-auto p-8 border border-white/5 bg-black/40 rounded-sm">
                <p className="text-gray-300 italic text-lg font-light leading-relaxed">
                  "{getEncouragement()}"
                </p>
             </div>

             <div className="flex flex-col md:flex-row gap-4">
               <button 
                 onClick={() => setStatus('idle')}
                 className="flex-1 py-5 border border-[#c5a059]/30 text-[#c5a059] font-bold tracking-[0.3em] text-[10px] hover:bg-[#c5a059] hover:text-black transition-all"
               >
                 CHANGER DE MODE
               </button>
               <button 
                 onClick={() => startQuiz(mode)}
                 className="flex-1 py-5 bg-[#c5a059] text-black font-bold tracking-[0.4em] text-[10px] hover:bg-white transition-all shadow-xl"
               >
                 RECOMMENCER LE DÉFI
               </button>
             </div>
          </div>
        )}
      </div>

      <p className="mt-12 text-[9px] text-gray-600 font-bold uppercase tracking-[0.5em] text-center">
        Propulsé par la connaissance du Tabernacle
      </p>
    </section>
  );
};

export default QuizModule;
