
import React, { useState, useEffect, useRef } from 'react';

interface LiveStreamProps {
  externalVideo?: {id: string, title: string, isLive: boolean} | null;
  onVideoSelect: (v: {id: string, title: string, isLive: boolean}) => void;
  videos: any[];
  liveVideo: any;
}

const LiveStream: React.FC<LiveStreamProps> = ({ externalVideo, onVideoSelect, videos, liveVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState(liveVideo);
  
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [showSettings, setShowSettings] = useState(false);
  const [isChangingQuality, setIsChangingQuality] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalVideo) {
      setActiveVideo(externalVideo);
      setIsPlaying(true);
    }
  }, [externalVideo]);

  useEffect(() => {
    if (!isPlaying) {
      setActiveVideo(liveVideo);
    }
  }, [liveVideo, isPlaying]);

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleQualityChange = (newQuality: string) => {
    if (newQuality === quality) return;
    setIsChangingQuality(true);
    setQuality(newQuality);
    setShowSettings(false);
    setTimeout(() => setIsChangingQuality(false), 1500);
  };

  const handlePlayVideo = (video: any) => {
    const v = { id: video.id, title: video.title, isLive: video.isLive || false };
    onVideoSelect(v);
    setActiveVideo(v);
    setIsPlaying(true);
  };

  return (
    <section id="live" className="max-w-7xl mx-auto px-4 md:px-8 py-12 scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-serif text-4xl mb-2">Sanctuaire Multimédia</h2>
          <div className="flex items-center space-x-2">
            {activeVideo.isLive && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
            <span className={`text-xs tracking-widest font-bold uppercase ${activeVideo.isLive ? 'text-red-500' : 'text-[#c5a059]'}`}>
              {activeVideo.isLive ? 'EN DIRECT' : 'REDIFFUSION'} : {activeVideo.title}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="hidden lg:flex items-center space-x-6 mr-6 border-r border-white/10 pr-6 text-right">
              <div>
                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Qualité</p>
                <p className="text-[10px] text-[#c5a059] font-bold">{quality}</p>
              </div>
           </div>
           <div className="text-gray-500 text-[10px] tracking-widest hidden sm:block font-bold bg-white/5 px-4 py-2 rounded-full border border-white/5">
            TABERNACLE PLAYER V2
          </div>
        </div>
      </div>

      <div 
        ref={playerRef}
        id="live-player-area" 
        className="relative aspect-video bg-[#050505] rounded-sm overflow-hidden group shadow-2xl border border-white/5"
      >
        {isPlaying ? (
          <div className="w-full h-full animate-fade-in bg-black relative">
             <iframe 
               className={`w-full h-full transition-opacity duration-700 ${isChangingQuality ? 'opacity-20' : 'opacity-100'}`}
               src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=0&iv_load_policy=3&enablejsapi=1`} 
               title={activeVideo.title} 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>

             {isChangingQuality && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                  <div className="w-12 h-12 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-[10px] tracking-[0.4em] text-white font-bold uppercase">Ajustement...</p>
               </div>
             )}

             <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between z-40">
                <div className="flex items-center space-x-6">
                  <button onClick={() => setIsPlaying(false)} className="text-white hover:text-[#c5a059] transition-colors">
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  </button>
                  <div className="text-[10px] font-bold text-white tracking-widest uppercase">
                     {activeVideo.isLive ? 'DIRECT' : 'VIDÉOTHÈQUE'}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button onClick={() => setShowSettings(!showSettings)} className="text-white hover:text-[#c5a059] p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                  </button>
                  <button onClick={toggleFullscreen} className="text-white hover:text-[#c5a059] p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </button>
                </div>
             </div>
          </div>
        ) : (
          <>
            <img 
              src={activeVideo.img || "https://images.unsplash.com/photo-1510519133417-2407bcaf0afd?auto=format&fit=crop&q=80&w=1280"} 
              alt="Le Tabernacle de la Foi"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <button 
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-[#c5a059] rounded-full flex items-center justify-center pl-1 transition-all hover:scale-110 shadow-2xl shadow-gold/40"
              >
                <svg className="w-8 h-8 text-black fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="mt-6 text-white text-[9px] font-bold tracking-[0.4em] uppercase opacity-60">Lancer la lecture</p>
            </div>
          </>
        )}
      </div>

      <div className="mt-12">
        <h3 className="text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase mb-6 border-b border-white/5 pb-4">Archives Multimédia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((replay, i) => (
            <div 
              key={i} 
              onClick={() => handlePlayVideo(replay)}
              className="bg-[var(--bg-secondary)] p-4 rounded-sm border border-[var(--border-color)] hover:border-[#c5a059]/30 transition-all cursor-pointer group"
            >
              <div className="relative aspect-video mb-4 overflow-hidden rounded-sm bg-black">
                <img src={replay.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" alt={replay.title} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-10 h-10 bg-[#c5a059] rounded-full flex items-center justify-center pl-1">
                      <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              </div>
              <h3 className="font-bold text-xs mb-1 uppercase tracking-wider group-hover:text-[#c5a059] transition-colors">{replay.title}</h3>
              <p className="text-[9px] text-[var(--text-secondary)] font-bold">{replay.date} • {replay.views} vues</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStream;
