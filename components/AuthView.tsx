
import React, { useState } from 'react';

interface AuthViewProps {
  onAuthSuccess: (user: { name: string; email: string }) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onAuthSuccess({
        name: formData.name || 'Fidèle du Tabernacle',
        email: formData.email
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-black font-sans">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=1920" 
          alt="Tabernacle de la Foi" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-[#c5a059]/10" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-[#121212]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl space-y-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#c5a059] flex items-center justify-center rounded-sm rotate-45">
                <span className="text-black font-serif text-4xl font-bold -rotate-45">T</span>
              </div>
            </div>
            <h1 className="font-serif text-4xl text-white italic">
              {isLogin ? 'Entrez dans le Sanctuaire' : 'Rejoignez la Communauté'}
            </h1>
            <p className="text-[10px] tracking-[0.4em] text-[#c5a059] font-bold uppercase">
              LE TABERNACLE DE LA FOI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2 text-left">
                <label className="text-[10px] tracking-widest text-gray-500 uppercase font-bold">Nom Complet</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 text-sm focus:outline-none focus:border-[#c5a059] transition-all rounded-sm text-white" />
              </div>
            )}
            <div className="space-y-2 text-left">
              <label className="text-[10px] tracking-widest text-gray-500 uppercase font-bold">Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 text-sm focus:outline-none focus:border-[#c5a059] transition-all rounded-sm text-white" />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] tracking-widest text-gray-500 uppercase font-bold">Mot de passe</label>
              <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 text-sm focus:outline-none focus:border-[#c5a059] transition-all rounded-sm text-white" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-[#c5a059] text-black py-5 font-bold tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-xl">
              {isLoading ? 'TRAITEMENT...' : (isLogin ? 'SE CONNECTER' : 'CRÉER MON COMPTE')}
            </button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] tracking-widest text-gray-400 hover:text-[#c5a059] uppercase font-bold">
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
