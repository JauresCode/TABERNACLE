
import React from 'react';

const LocationSection: React.FC = () => {
  const address = "123 Avenue de la Lumière, Cocody, Abidjan, Côte d'Ivoire";
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY || ''}&q=Cathedrale+Saint-Paul+Plateau+Abidjan&zoom=15`;
  
  // Note: Using a standard embed for interactive UI. 
  // For a production app with a valid key, we'd use the JS API or a stylized embed.
  // Fallback embed URL (placeholder for interactive feel)
  const interactiveMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.483733224719!2d-4.0223!3d5.3333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTknNTkuOSJOIDTCsDAxJzIwLjMiVw!5e0!3m2!1sfr!2sci!4v1622543210000!5m2!1sfr!2sci";

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-12 bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden rounded-sm shadow-2xl">
        
        {/* Info Sidebar */}
        <div className="lg:w-[400px] p-10 flex flex-col justify-between">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-[#c5a059] font-bold uppercase mb-4 block">Nous Trouver</span>
            <h2 className="font-serif text-5xl italic mb-8 leading-tight">Au cœur de <br />la cité.</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#c5a059]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-gray-500 uppercase font-bold mb-1">Adresse</p>
                  <p className="text-sm font-light leading-relaxed">{address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#c5a059]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-gray-500 uppercase font-bold mb-1">Heures de Service</p>
                  <p className="text-sm font-light">Dimanche: 08:00 - 12:00</p>
                  <p className="text-sm font-light">Jeudi: 18:30 - 20:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#c5a059]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-gray-500 uppercase font-bold mb-1">Contact</p>
                  <p className="text-sm font-light">+225 07 00 00 00 00</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank')}
            className="mt-12 bg-[#c5a059] text-black py-4 px-8 font-bold tracking-widest text-[10px] hover:bg-white transition-all shadow-xl shadow-gold/10"
          >
            PLANIFIER L'ITINÉRAIRE
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-0 bg-black/20">
          <iframe 
            src={interactiveMap}
            className="absolute inset-0 w-full h-full grayscale-[0.8] invert-[0.05] contrast-[1.2] hover:grayscale-0 transition-all duration-700"
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
          />
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 text-[9px] font-bold tracking-widest uppercase text-white pointer-events-none">
            Interactive Precise Location
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
