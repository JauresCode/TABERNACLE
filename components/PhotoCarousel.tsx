
import React, { useState, useEffect } from 'react';

const images = [
  { url: 'https://images.unsplash.com/photo-1548625313-040497505311?q=80&w=1280&h=720&auto=format&fit=crop', title: 'Pâques 2024', desc: 'Une célébration de la résurrection.' },
  { url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1280&h=720&auto=format&fit=crop', title: 'Retraite Jeunesse', desc: 'Renouveler son esprit dans la nature.' },
  { url: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1280&h=720&auto=format&fit=crop', title: 'Concert Chorale', desc: 'Louanges divines en harmonie.' },
];

const PhotoCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-serif text-4xl mb-2">Moments Lumina</h2>
          <p className="text-gray-500 text-xs tracking-[0.3em] font-bold uppercase">L'histoire de notre foi en images</p>
        </div>
      </div>

      <div className="relative aspect-[21/9] bg-[#121212] overflow-hidden rounded-sm group">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              idx === current ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
            }`}
          >
            <img src={img.url} className="w-full h-full object-cover opacity-60" alt={img.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 max-w-lg">
              <span className="text-[#c5a059] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block animate-fade-in-up">Collection 2024</span>
              <h3 className="font-serif text-4xl mb-4 italic text-white animate-fade-in-up">{img.title}</h3>
              <p className="text-gray-400 text-sm font-light animate-fade-in-up">{img.desc}</p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-10 right-10 flex space-x-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-[2px] transition-all duration-500 ${
                idx === current ? 'w-12 bg-[#c5a059]' : 'w-6 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;
