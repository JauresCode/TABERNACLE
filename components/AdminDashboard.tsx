
import React, { useState, useRef } from 'react';
import { HeroSlide } from './Hero';
import { PhotoItem, QuizQuestion } from '../types';

interface AdminDashboardProps {
  heroSlides: HeroSlide[];
  onUpdateHeroSlides: (slides: HeroSlide[]) => void;
  videos: any[];
  liveVideo: any;
  onUpdateVideos: (videos: any[], live: any) => void;
  photos: PhotoItem[];
  onUpdatePhotos: (photos: PhotoItem[]) => void;
  quizQuestions: QuizQuestion[];
  onUpdateQuiz: (questions: QuizQuestion[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  heroSlides, onUpdateHeroSlides, videos, liveVideo, onUpdateVideos, photos, onUpdatePhotos, quizQuestions, onUpdateQuiz
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'stats' | 'video' | 'gallery' | 'content' | 'quiz'>('stats');
  const [isStatsCollapsed, setIsStatsCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadIndex, setCurrentUploadIndex] = useState<{type: 'hero' | 'gallery', index: number} | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUploadIndex) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (currentUploadIndex.type === 'hero') {
          const newSlides = [...heroSlides];
          newSlides[currentUploadIndex.index].image = base64;
          onUpdateHeroSlides(newSlides);
        } else {
          const newPhotos = [...photos];
          newPhotos[currentUploadIndex.index].url = base64;
          onUpdatePhotos(newPhotos);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (type: 'hero' | 'gallery', index: number) => {
    setCurrentUploadIndex({ type, index });
    fileInputRef.current?.click();
  };

  const handleUpdateHeroField = (index: number, field: keyof HeroSlide, value: string) => {
    const newSlides = [...heroSlides];
    (newSlides[index] as any)[field] = value;
    onUpdateHeroSlides(newSlides);
  };

  const handleUpdatePhotoField = (index: number, field: keyof PhotoItem, value: string) => {
    const newPhotos = [...photos];
    (newPhotos[index] as any)[field] = value;
    onUpdatePhotos(newPhotos);
  };

  const handleUpdateQuizQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const newQuiz = [...quizQuestions];
    (newQuiz[index] as any)[field] = value;
    onUpdateQuiz(newQuiz);
  };

  const handleUpdateQuizOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuiz = [...quizQuestions];
    newQuiz[qIndex].options[oIndex] = value;
    onUpdateQuiz(newQuiz);
  };

  const addQuizQuestion = () => {
    const newQ: QuizQuestion = {
      question: "Nouvelle question sur le Tabernacle",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      explanation: "Explication de la réponse."
    };
    onUpdateQuiz([newQ, ...quizQuestions]);
  };

  const addPhotoItem = () => {
    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      url: 'https://images.unsplash.com/photo-1510519133417-2407bcaf0afd?auto=format&fit=crop&q=80&w=800',
      event: 'Événement',
      description: 'Nouvelle capture pour le Tabernacle.'
    };
    onUpdatePhotos([newPhoto, ...photos]);
  };

  const addNewHeroSlide = () => {
    const newSlide: HeroSlide = {
      image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=1920",
      title: "Nouveau Message Spirituel",
      subtitle: "Sous-titre inspirant pour la communauté."
    };
    onUpdateHeroSlides([...heroSlides, newSlide]);
  };

  return (
    <section className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in text-[var(--text-primary)]">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
      
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[var(--border-color)] pb-12">
        <div>
          <h2 className="font-serif text-5xl mb-4 italic text-white">Le Tabernacle Admin</h2>
          <p className="text-gray-500 font-light uppercase text-[9px] tracking-[0.4em] font-bold">
            Gestion Intégrale - Tabernacle de la Foi
          </p>
        </div>
        <div className="flex bg-[var(--bg-secondary)] p-1 rounded-sm border border-[var(--border-color)] overflow-x-auto">
          {['stats', 'quiz', 'video', 'gallery', 'content'].map((id) => (
            <button key={id} onClick={() => setActiveAdminTab(id as any)} className={`px-6 py-3 text-[10px] tracking-[0.2em] font-bold uppercase transition-all whitespace-nowrap ${activeAdminTab === id ? 'bg-[#c5a059] text-black' : 'text-gray-500 hover:text-white'}`}>
              {id === 'stats' ? 'ANALYTIQUES' : id === 'quiz' ? 'GÉRER LE QUIZ' : id === 'video' ? 'VIDÉO & DIRECT' : id === 'gallery' ? 'GALERIE SACRÉE' : 'ACCUEIL (CMS)'}
            </button>
          ))}
        </div>
      </div>

      {activeAdminTab === 'quiz' && (
        <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
           <div className="flex justify-between items-center border-b border-white/5 pb-8">
             <h3 className="font-serif text-3xl italic">Questions "Vie du Tabernacle"</h3>
             <button onClick={addQuizQuestion} className="bg-[#c5a059] text-black px-8 py-3 text-[10px] font-bold uppercase hover:bg-white transition-all shadow-xl">
               + NOUVELLE QUESTION
             </button>
          </div>
          <div className="space-y-10">
            {quizQuestions.map((q, qIdx) => (
              <div key={qIdx} className="bg-[#121212] border border-white/5 p-8 rounded-sm">
                 <div className="flex justify-between items-start mb-6">
                    <span className="bg-[#c5a059] text-black px-3 py-1 text-[9px] font-bold uppercase">Question {qIdx + 1}</span>
                    <button onClick={() => onUpdateQuiz(quizQuestions.filter((_, i) => i !== qIdx))} className="text-red-500/40 hover:text-red-500 transition-colors">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Énoncé de la question</label>
                      <input type="text" className="w-full bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#c5a059]" value={q.question} onChange={(e) => handleUpdateQuizQuestion(qIdx, 'question', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="space-y-2">
                          <label className={`text-[9px] font-bold uppercase tracking-widest ${q.correctAnswer === oIdx ? 'text-[#c5a059]' : 'text-gray-600'}`}>Option {String.fromCharCode(65 + oIdx)} {q.correctAnswer === oIdx && "(Correcte)"}</label>
                          <div className="flex space-x-2">
                             <input type="text" className="flex-1 bg-black border border-white/10 p-3 text-xs text-gray-300 outline-none" value={opt} onChange={(e) => handleUpdateQuizOption(qIdx, oIdx, e.target.value)} />
                             <button onClick={() => handleUpdateQuizQuestion(qIdx, 'correctAnswer', oIdx)} className={`px-3 py-1 text-[8px] font-bold border transition-all ${q.correctAnswer === oIdx ? 'bg-[#c5a059] text-black border-[#c5a059]' : 'border-white/10 text-gray-500 hover:text-white'}`}>FIXER CORRECT</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Explication (Méditation après réponse)</label>
                      <textarea className="w-full bg-black border border-white/10 p-4 text-xs text-gray-400 h-20 outline-none focus:border-[#c5a059]" value={q.explanation} onChange={(e) => handleUpdateQuizQuestion(qIdx, 'explanation', e.target.value)} />
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminTab === 'gallery' && (
        <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
          <div className="flex justify-between items-center border-b border-white/5 pb-8">
             <h3 className="font-serif text-3xl italic">Gestion de la Galerie</h3>
             <button onClick={addPhotoItem} className="bg-[#c5a059] text-black px-8 py-3 text-[10px] font-bold uppercase hover:bg-white transition-all">
               + AJOUTER UNE PHOTO
             </button>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {photos.map((photo, index) => (
              <div key={photo.id} className="bg-[#121212] border border-white/5 p-8 rounded-sm relative group">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#c5a059] text-black rounded-full flex items-center justify-center font-serif italic font-bold text-xl shadow-xl z-10">{index + 1}</div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4 space-y-4">
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Visuel</h4>
                    <div className="aspect-square bg-black rounded-sm overflow-hidden border border-white/10 relative group/img">
                      <img src={photo.url} className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition-opacity" alt="" />
                      <button onClick={() => triggerUpload('gallery', index)} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity text-[9px] font-bold text-white tracking-widest">
                        CHANGER L'IMAGE
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-8 flex flex-col justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Événement</label>
                        <input type="text" className="w-full bg-black border border-white/10 p-4 text-sm text-[#c5a059] outline-none" value={photo.event} onChange={(e) => handleUpdatePhotoField(index, 'event', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">URL Image</label>
                        <input type="text" className="w-full bg-black border border-white/10 p-4 text-sm text-white font-mono outline-none" value={photo.url} onChange={(e) => handleUpdatePhotoField(index, 'url', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Description IA du Tabernacle</label>
                      <textarea className="w-full bg-black border border-white/10 p-4 text-xs text-gray-400 h-24 italic outline-none" value={photo.description} onChange={(e) => handleUpdatePhotoField(index, 'description', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminTab === 'content' && (
        <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
          <div className="flex justify-between items-center border-b border-white/5 pb-8">
             <h3 className="font-serif text-3xl italic">Expérience d'Accueil CMS</h3>
             <button onClick={addNewHeroSlide} className="bg-[#c5a059] text-black px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-white transition-all shadow-xl">
               + AJOUTER DIAPO
             </button>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {heroSlides.map((slide, index) => (
              <div key={index} className="bg-[#121212] border border-white/5 p-8 rounded-sm relative group">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#c5a059] text-black rounded-full flex items-center justify-center font-serif italic font-bold text-xl shadow-xl z-10">{index + 1}</div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4 space-y-4">
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Image de Fond</h4>
                    <div className="aspect-video bg-black rounded-sm overflow-hidden border border-white/10 relative group/heroimg">
                      <img src={slide.image} className="w-full h-full object-cover opacity-60 group-hover/heroimg:opacity-100 transition-opacity" alt="" />
                      <button onClick={() => triggerUpload('hero', index)} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/heroimg:opacity-100 transition-opacity text-[9px] font-bold text-white tracking-widest">
                        CHANGER L'IMAGE
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-8 flex flex-col space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Titre</label>
                      <input type="text" className="w-full bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#c5a059]" value={slide.title} onChange={(e) => handleUpdateHeroField(index, 'title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Sous-titre inspirant</label>
                      <textarea className="w-full bg-black border border-white/10 p-4 text-xs text-gray-400 h-24 outline-none focus:border-[#c5a059]" value={slide.subtitle} onChange={(e) => handleUpdateHeroField(index, 'subtitle', e.target.value)} />
                    </div>
                    <div className="flex justify-end pt-4">
                      <button onClick={() => onUpdateHeroSlides(heroSlides.filter((_, i) => i !== index))} className="text-red-500/40 hover:text-red-500 text-[9px] font-bold uppercase tracking-widest">Supprimer Diapo</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminTab === 'stats' && (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setIsStatsCollapsed(!isStatsCollapsed)}
              className="text-[9px] font-bold text-[#c5a059] border border-[#c5a059]/20 px-4 py-2 hover:bg-[#c5a059] hover:text-black transition-all uppercase tracking-widest"
            >
              {isStatsCollapsed ? 'Afficher Détails Stats' : 'Masquer Détails Stats'}
            </button>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 overflow-hidden ${isStatsCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
            <div className="bg-[#121212] p-8 border border-white/5 text-center"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Visites au Tabernacle</p><p className="font-serif text-4xl text-[#c5a059]">12,450</p></div>
            <div className="bg-[#121212] p-8 border border-white/5 text-center"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Fidèles</p><p className="font-serif text-4xl text-[#c5a059]">342</p></div>
            <div className="bg-[#121212] p-8 border border-white/5 text-center"><p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Dons XOF</p><p className="font-serif text-4xl text-[#c5a059]">4,250k</p></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
