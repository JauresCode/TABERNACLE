
import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { generatePhotoCaption } from '../services/geminiService';
import SocialShare from './SocialShare';

interface GalleryProps {
  photos: PhotoItem[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [filter, setFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const categories: string[] = ['All', ...(Array.from(new Set(photos.map(p => p.event))) as string[])];

  const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.event === filter);

  const handleOpenPhoto = async (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    if (!captions[photo.id]) {
      setIsGenerating(true);
      try {
        const caption = await generatePhotoCaption(photo.description);
        setCaptions(prev => ({ ...prev, [photo.id]: caption }));
      } catch (err) {
        setCaptions(prev => ({ ...prev, [photo.id]: "Une image de foi et d'unité au Tabernacle." }));
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <section className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="font-serif text-6xl mb-4 italic">Galerie Sacrée</h2>
          <p className="text-gray-500 font-light max-w-xl">Retracez les moments forts du Tabernacle de la Foi à travers l'objectif.</p>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 text-[10px] font-bold tracking-widest border transition-all uppercase whitespace-nowrap ${
                filter === f ? 'bg-[#c5a059] text-black border-[#c5a059]' : 'border-white/10 text-gray-500 hover:border-white/30'
              }`}
            >
              {f === 'All' ? 'TOUS' : f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, i) => (
          <div 
            key={i} 
            onClick={() => handleOpenPhoto(photo)}
            className="group relative aspect-square overflow-hidden bg-[#121212] cursor-pointer"
          >
            <img 
              src={photo.url} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
              alt={photo.event} 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-[10px] tracking-widest font-bold uppercase bg-white text-black px-6 py-2">VOIR LA PHOTO</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] tracking-widest font-bold uppercase text-[#c5a059] bg-black/80 px-3 py-1 border border-white/10">
                {photo.event}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedPhoto(null)} />
          
          <div className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 flex flex-col md:flex-row overflow-hidden">
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-[#c5a059] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1 bg-black flex items-center justify-center p-4">
              <img src={selectedPhoto.url} className="max-h-[80vh] w-auto object-contain" alt={selectedPhoto.event} />
            </div>

            <div className="w-full md:w-[350px] p-8 space-y-8 border-t md:border-t-0 md:border-l border-white/10 flex flex-col">
              <div>
                <span className="text-[#c5a059] text-[10px] font-bold tracking-widest uppercase mb-2 block">{selectedPhoto.event}</span>
                <h3 className="font-serif text-3xl italic mb-6">Légende Tabernacle AI</h3>
                
                <div className="bg-white/5 p-6 rounded-sm border border-white/5 relative">
                  {isGenerating ? (
                    <div className="flex items-center space-x-3 text-gray-500">
                      <div className="w-4 h-4 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs tracking-widest uppercase font-bold">Inspiration...</span>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm italic leading-relaxed font-light">
                      "{captions[selectedPhoto.id]}"
                    </p>
                  )}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#c5a059] flex items-center justify-center rounded-full text-black text-[10px] font-bold">
                    AI
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">Détails</p>
                <p className="text-xs text-gray-500 leading-relaxed">{selectedPhoto.description}</p>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Partager</p>
                <SocialShare 
                  title={`Tabernacle - ${selectedPhoto.event}`}
                  text={captions[selectedPhoto.id] || selectedPhoto.description}
                  url={selectedPhoto.url}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
