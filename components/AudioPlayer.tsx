
import React, { useState, useRef, useEffect } from 'react';
import { PodcastEpisode } from '../types';

interface AudioPlayerProps {
  episode: PodcastEpisode | null;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ episode, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (episode) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [episode]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  if (!episode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] bg-black/90 backdrop-blur-2xl border-t border-white/10 p-4 lg:p-6 animate-fade-in-up pl-24">
      <audio 
        ref={audioRef} 
        src={episode.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Info */}
        <div className="flex items-center space-x-4 max-w-[30%] overflow-hidden">
          <div className="w-12 h-12 flex-shrink-0 bg-[#c5a059] rounded-sm overflow-hidden">
            <img src={episode.img} className="w-full h-full object-cover" alt={episode.title} />
          </div>
          <div className="hidden sm:block">
            <h4 className="text-white text-sm font-bold truncate">{episode.title}</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{episode.author}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-8">
            <button className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 19h2V5H7v14zm7-14v14h2V5h-2z" /></svg>
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 bg-[#c5a059] rounded-full flex items-center justify-center text-black hover:scale-110 transition-all"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 19h2V5H7v14zm7-14v14h2V5h-2z" /></svg>
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-4">
             <span className="text-[8px] text-gray-500 font-bold tabular-nums">00:00</span>
             <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-y-0 left-0 bg-[#c5a059] transition-all duration-300" style={{ width: `${progress}%` }} />
             </div>
             <span className="text-[8px] text-gray-500 font-bold tabular-nums">{episode.duration}</span>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="flex items-center space-x-6">
           <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg>
           </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
