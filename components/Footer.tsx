
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#c5a059] flex items-center justify-center rounded-sm">
                <span className="text-black font-bold text-xl">T</span>
              </div>
              <span className="font-serif text-2xl tracking-widest uppercase">Le Tabernacle</span>
            </div>
            <p className="text-gray-500 max-w-sm font-light leading-relaxed italic">
              "Que ta lumière brille devant les hommes, afin qu'ils voient tes bonnes œuvres et glorifient ton Père qui est dans les cieux."
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-400">Liens Rapides</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><button className="hover:text-[#c5a059] transition-colors">Le Culte</button></li>
              <li><button className="hover:text-[#c5a059] transition-colors">Nos Missions</button></li>
              <li><button className="hover:text-[#c5a059] transition-colors">Témoignages</button></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.2em] font-bold uppercase text-gray-400">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>Abidjan, Côte d'Ivoire</li>
              <li>contact@tabernacle-foi.org</li>
              <li>+225 07 00 00 00 00</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <div className="text-[10px] tracking-widest text-gray-600 uppercase">
            © 2024 LE TABERNACLE DE LA FOI. TOUS DROITS RÉSERVÉS.
          </div>
          <div className="flex space-x-8 text-[10px] tracking-widest text-gray-600 uppercase font-bold">
            <a href="#" className="hover:text-white transition-colors">CONFIDENTIALITÉ</a>
            <a href="#" className="hover:text-white transition-colors">SÉCURITÉ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
