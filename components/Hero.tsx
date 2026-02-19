
import React, { useState, useEffect } from 'react';

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroProps {
  onDonationClick: () => void;
  onLiveClick: () => void;
  slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ onDonationClick, onLiveClick, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 1000);
  };

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Slides with smoother transition */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? 'opacity-60' : 'opacity-0'}`}
          >
            <img 
              src={slide.image} 
              alt="" 
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>

      {/* Content Area - Fixed HTML Rendering */}
      <div className={`relative z-10 text-center px-4 max-w-5xl transition-all duration-1000 ease-out ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <h1 
          className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tight leading-[1.1]"
          dangerouslySetInnerHTML={{ __html: activeSlide.title }}
        />
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light italic opacity-80">
          {activeSlide.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onLiveClick}
            className="bg-[#c5a059] text-black px-10 py-4 rounded-sm font-bold tracking-widest hover:bg-white transition-all w-full sm:w-auto shadow-2xl shadow-gold/20"
          >
            REJOINDRE LE CULTE
          </button>
          <button 
            onClick={onDonationClick}
            className="border border-white/30 backdrop-blur-sm px-10 py-4 rounded-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all w-full sm:w-auto"
          >
            SOUTENIR L'ÉGLISE
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index === currentSlide) return;
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              className={`h-1 transition-all duration-700 rounded-full ${index === currentSlide ? 'w-16 bg-[#c5a059]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
