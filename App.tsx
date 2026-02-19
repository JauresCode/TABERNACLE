
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero, { HeroSlide } from './components/Hero';
import DailyVerse from './components/DailyVerse';
import LiveStream from './components/LiveStream';
import DonationModule from './components/DonationModule';
import EventsCalendar from './components/EventsCalendar';
import Library from './components/Library';
import QuizModule from './components/QuizModule';
import BibleView from './components/BibleView';
import MemberSpace from './components/MemberSpace';
import CommunitySpace from './components/CommunitySpace';
import ChatBot from './components/ChatBot';
import TransparencyDashboard from './components/TransparencyDashboard';
import PhotoCarousel from './components/PhotoCarousel';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Settings from './components/Settings';
import LocationSection from './components/LocationSection';
import AdminDashboard from './components/AdminDashboard';
import AuthView from './components/AuthView';
import AudioPlayer from './components/AudioPlayer';
import { UserProfile, PodcastEpisode, PhotoItem, QuizQuestion } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [globalVideo, setGlobalVideo] = useState<{id: string, title: string, isLive: boolean} | null>(null);
  const [activeAudio, setActiveAudio] = useState<PodcastEpisode | null>(null);
  
  const [churchVideos, setChurchVideos] = useState(() => {
    const saved = localStorage.getItem('tabernacle_videos');
    return saved ? JSON.parse(saved) : [
      { id: 'dQw4w9WgXcQ', title: "La Puissance de la Prière", date: "12 Mai 2024", views: "24k", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400", isLive: false },
      { id: 'dQw4w9WgXcQ', title: "Le Pardon au Quotidien", date: "05 Mai 2024", views: "18k", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400", isLive: false }
    ];
  });

  const [mainLiveVideo, setMainLiveVideo] = useState(() => {
    const saved = localStorage.getItem('tabernacle_live');
    return saved ? JSON.parse(saved) : { id: 'dQw4w9WgXcQ', title: 'Culte de Dimanche - En Direct', isLive: true };
  });

  const [churchPhotos, setChurchPhotos] = useState<PhotoItem[]>(() => {
    const saved = localStorage.getItem('tabernacle_photos');
    return saved ? JSON.parse(saved) : [
      { id: '1', url: 'https://images.unsplash.com/photo-1548625313-040497505311?auto=format&fit=crop&q=80&w=800', event: 'Pâques', description: 'Célébration matinale au Tabernacle de la Foi.' },
      { id: '2', url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800', event: 'Retraite', description: 'Moments de communion spirituelle au Tabernacle.' },
      { id: '3', url: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&q=80&w=800', event: 'Chorale', description: 'Louanges divines par notre chorale.' }
    ];
  });

  const [customQuizQuestions, setCustomQuizQuestions] = useState<QuizQuestion[]>(() => {
    const saved = localStorage.getItem('tabernacle_custom_quiz');
    return saved ? JSON.parse(saved) : [
      { 
        question: "En quelle année le Tabernacle de la Foi a-t-il été fondé ?", 
        options: ["1995", "2000", "2010", "2015"], 
        correctAnswer: 1, 
        explanation: "Le Tabernacle de la Foi a ouvert ses portes au début du nouveau millénaire." 
      }
    ];
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('tabernacle_hero');
    return saved ? JSON.parse(saved) : [
      { 
        image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=1920", 
        title: "Bienvenue au <br /> <span class='italic text-[#c5a059]'>Tabernacle de la Foi</span>",
        subtitle: "Un sanctuaire où chaque âme trouve sa place. Rejoignez notre communauté dès aujourd'hui."
      },
      { 
        image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=1920", 
        title: "Bâtir Ensemble <br /> <span class='italic text-[#c5a059]'>Votre Destinée Divine</span>",
        subtitle: "Découvrez nos enseignements bibliques et participez à nos projets communautaires."
      },
      { 
        image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&q=80&w=1920", 
        title: "La Louange <br /> <span class='italic text-[#c5a059]'>Ouvre les Portes</span>",
        subtitle: "Venez célébrer la grandeur du Seigneur avec nos chorales passionnées."
      }
    ];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('tabernacle_auth') === 'true');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('tabernacle_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('tabernacle_theme') !== 'light');

  useEffect(() => {
    localStorage.setItem('tabernacle_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) document.body.classList.remove('light-theme');
    else document.body.classList.add('light-theme');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    const initialProfile: UserProfile = {
      name: userData.name, email: userData.email, memberSince: "Juin 2024", groups: ["Nouveau Fidèle"],
      steps: [{ id: 'wel', title: 'Accueil', status: 'In Progress', progress: 20, nextTask: 'Visite du Tabernacle' }],
      preferences: { notifications: true, language: "Français", newsletter: true, fontSize: 'normal', highContrast: false }
    };
    setUserProfile(initialProfile);
    setIsAuthenticated(true);
    localStorage.setItem('tabernacle_auth', 'true');
    localStorage.setItem('tabernacle_profile', JSON.stringify(initialProfile));
  };

  const handleUpdateVideos = (videos: any[], live: any) => {
    setChurchVideos(videos); setMainLiveVideo(live);
    localStorage.setItem('tabernacle_videos', JSON.stringify(videos));
    localStorage.setItem('tabernacle_live', JSON.stringify(live));
  };

  const handleUpdatePhotos = (photos: PhotoItem[]) => {
    setChurchPhotos(photos);
    localStorage.setItem('tabernacle_photos', JSON.stringify(photos));
  };

  const handleUpdateHeroSlides = (newSlides: HeroSlide[]) => {
    setHeroSlides(newSlides);
    localStorage.setItem('tabernacle_hero', JSON.stringify(newSlides));
  };

  const handleUpdateQuiz = (newQuestions: QuizQuestion[]) => {
    setCustomQuizQuestions(newQuestions);
    localStorage.setItem('tabernacle_custom_quiz', JSON.stringify(newQuestions));
  };

  const startGlobalVideo = (id: string, title: string, isLive: boolean = false) => {
    setGlobalVideo({ id, title, isLive });
    if (activeTab !== 'home') setActiveTab('home');
    setTimeout(() => { document.getElementById('live-player-area')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
  };

  const renderContent = () => {
    if (!userProfile) return null;
    switch (activeTab) {
      case 'home': return (
        <div className="space-y-24 pb-20 animate-fade-in">
          <Hero onDonationClick={() => setActiveTab('donations')} onLiveClick={() => startGlobalVideo(mainLiveVideo.id, mainLiveVideo.title, mainLiveVideo.isLive)} slides={heroSlides} />
          <DailyVerse />
          <LiveStream externalVideo={globalVideo} onVideoSelect={(v) => setGlobalVideo(v)} videos={churchVideos} liveVideo={mainLiveVideo} />
          <PhotoCarousel />
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <EventsCalendar />
            <div className="bg-[var(--bg-secondary)] p-8 rounded-sm border border-[var(--border-color)] flex flex-col justify-center text-center">
               <h2 className="font-serif text-3xl mb-4 italic text-white">Soutenir Le Tabernacle</h2>
               <p className="text-[var(--text-secondary)] text-sm mb-8">Votre contribution permet de financer nos œuvres et missions de foi.</p>
               <button onClick={() => setActiveTab('donations')} className="bg-[#c5a059] text-black py-4 font-bold tracking-widest hover:bg-white transition-all">SOUTENIR L'ÉGLISE</button>
            </div>
          </div>
          <TransparencyDashboard />
          <LocationSection />
        </div>
      );
      case 'donations': return <div className="pt-32 pb-24 min-h-screen animate-fade-in"><div className="max-w-7xl mx-auto px-4"><DonationModule fullPage /></div></div>;
      case 'bible': return <BibleView />;
      case 'quiz': return <QuizModule customQuestions={customQuizQuestions} />;
      case 'sermons': return <Library onPlayVideo={(id, title) => startGlobalVideo(id, title)} onPlayAudio={(episode) => setActiveAudio(episode)} />;
      case 'gallery': return <Gallery photos={churchPhotos} />;
      case 'community': return <CommunitySpace />;
      case 'members': return <MemberSpace profile={userProfile} onUpdateProfile={(p) => setUserProfile(p)} onLogout={() => setIsAuthenticated(false)} />;
      case 'settings': return <Settings isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      case 'admin': return <AdminDashboard heroSlides={heroSlides} onUpdateHeroSlides={handleUpdateHeroSlides} videos={churchVideos} liveVideo={mainLiveVideo} onUpdateVideos={handleUpdateVideos} photos={churchPhotos} onUpdatePhotos={handleUpdatePhotos} quizQuestions={customQuizQuestions} onUpdateQuiz={handleUpdateQuiz} />;
      default: return <Hero onDonationClick={() => setActiveTab('donations')} onLiveClick={() => {}} slides={heroSlides} />;
    }
  };

  if (!isAuthenticated) return <AuthView onAuthSuccess={handleAuthSuccess} />;

  return (
    <div className={`min-h-screen theme-transition bg-[var(--bg-primary)] text-[var(--text-primary)]`}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className={`transition-all duration-500 pl-20 lg:pl-24 ${activeAudio ? 'pb-32' : ''}`}>{renderContent()}</main>
      <ChatBot />
      <AudioPlayer episode={activeAudio} onClose={() => setActiveAudio(null)} />
      <Footer />
    </div>
  );
};

export default App;
