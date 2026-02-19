
import React, { useState, useRef } from 'react';
import { UserProfile, DonationHistoryItem } from '../types';

interface MemberSpaceProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  onLogout?: () => void;
}

const MemberSpace: React.FC<MemberSpaceProps> = ({ profile, onUpdateProfile, onLogout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'groups' | 'history' | 'steps' | 'profile'>('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [isStatsCollapsed, setIsStatsCollapsed] = useState(false);
  const [editData, setEditData] = useState({ ...profile });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const history: DonationHistoryItem[] = [
    { id: '1', date: '12 Juin 2024', amount: 5000, method: 'Wave', status: 'Completed' },
    { id: '2', date: '01 Juin 2024', amount: 15000, method: 'Orange Money', status: 'Completed' },
    { id: '3', date: '15 Mai 2024', amount: 5000, method: 'Wave', status: 'Completed' },
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const updated = { ...profile, photoUrl: base64 };
        onUpdateProfile(updated);
        setEditData(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  return (
    <section className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen animate-fade-in text-[var(--text-primary)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-2">
          <div className="p-6 bg-[#121212] border border-white/5 rounded-sm mb-6 text-center lg:text-left relative group">
            <div 
              className="relative w-24 h-24 mx-auto lg:mx-0 mb-4 cursor-pointer overflow-hidden rounded-full border-2 border-white/10 shadow-2xl transition-all hover:border-[#c5a059]"
              onClick={() => fileInputRef.current?.click()}
            >
              {profile.photoUrl ? (
                <img src={profile.photoUrl} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#c5a059] to-black flex items-center justify-center">
                  <span className="text-2xl font-serif italic text-black">{profile.name.charAt(0)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoChange}
            />
            
            <h3 className="font-serif text-2xl mb-1 truncate">{profile.name}</h3>
            <p className="text-[10px] text-[#c5a059] font-bold tracking-widest uppercase">Membre depuis {profile.memberSince}</p>
          </div>

          {[
            { id: 'dashboard', label: 'TABLEAU DE BORD', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
            { id: 'steps', label: 'MES DÉMARCHES', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
            { id: 'groups', label: 'MES GROUPES', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { id: 'history', label: 'HISTORIQUE DONS', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'profile', label: 'GÉRER LE PROFIL', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSubTab(item.id as any)}
              className={`w-full flex items-center space-x-4 p-4 text-[10px] tracking-widest font-bold uppercase transition-all border-l-2 ${
                activeSubTab === item.id 
                ? 'bg-[#c5a059]/10 text-[#c5a059] border-[#c5a059]' 
                : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}

          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-4 p-4 text-[10px] tracking-widest font-bold uppercase text-red-500/60 hover:text-red-500 transition-all border-l-2 border-transparent mt-12"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-[#121212] border border-white/5 p-8 md:p-12 rounded-sm min-h-[600px] flex flex-col">
          
          {activeSubTab === 'dashboard' && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 gap-4">
                <div>
                  <h2 className="font-serif text-5xl italic mb-2">Mon Sanctuaire</h2>
                  <p className="text-gray-500 text-xs tracking-[0.2em] font-bold uppercase">Tableau de Bord Personnel</p>
                </div>
                <button 
                  onClick={() => setIsStatsCollapsed(!isStatsCollapsed)}
                  className="text-[9px] font-bold text-[#c5a059] border border-[#c5a059]/20 px-4 py-2 hover:bg-[#c5a059] hover:text-black transition-all"
                >
                  {isStatsCollapsed ? 'AFFICHER STATS' : 'MASQUER STATS'}
                </button>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 overflow-hidden ${isStatsCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
                <div className="p-6 bg-black/40 border border-white/5 rounded-sm">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Total Dons 2024</p>
                   <p className="text-3xl font-serif text-[#c5a059]">25,000 FCFA</p>
                </div>
                <div className="p-6 bg-black/40 border border-white/5 rounded-sm">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Groupes Actifs</p>
                   <p className="text-3xl font-serif text-[#c5a059]">{profile.groups.length}</p>
                </div>
                <div className="p-6 bg-black/40 border border-white/5 rounded-sm">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Démarches en cours</p>
                   <p className="text-3xl font-serif text-[#c5a059]">{profile.steps.filter(s => s.status === 'In Progress').length}</p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'profile' && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                <div>
                  <h2 className="font-serif text-5xl italic mb-2">Mon Profil</h2>
                  <p className="text-gray-500 text-xs tracking-[0.2em] font-bold uppercase">Gérez vos informations personnelles</p>
                </div>
                <button 
                  onClick={() => {
                    if (isEditing) handleSaveProfile();
                    else setIsEditing(true);
                  }}
                  className={`px-8 py-3 text-[10px] font-bold tracking-widest uppercase transition-all ${
                    isEditing ? 'bg-green-600 text-white' : 'bg-[#c5a059] text-black hover:bg-white'
                  }`}
                >
                  {isEditing ? 'ENREGISTRER' : 'ÉDITER'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Nom Complet</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="w-full bg-black border border-[#c5a059]/50 p-4 text-sm focus:border-[#c5a059] outline-none text-white rounded-sm"
                      />
                    ) : (
                      <p className="p-4 bg-white/5 border border-transparent text-sm text-white rounded-sm">{profile.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Adresse Email</label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        className="w-full bg-black border border-[#c5a059]/50 p-4 text-sm focus:border-[#c5a059] outline-none text-white rounded-sm"
                      />
                    ) : (
                      <p className="p-4 bg-white/5 border border-transparent text-sm text-white rounded-sm">{profile.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 bg-black/40 border border-white/5 rounded-sm">
                    <h4 className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest mb-6">Identité Numérique</h4>
                    <div className="flex items-center space-x-6">
                       <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/10 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          {profile.photoUrl ? (
                            <img src={profile.photoUrl} className="w-full h-full object-cover" alt="Profile" />
                          ) : (
                            <div className="w-full h-full bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059]">AI</div>
                          )}
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[8px] font-bold uppercase text-white">Changer</span>
                          </div>
                       </div>
                       <div>
                         <p className="text-xs font-bold text-gray-300">Avatar Tabernacle</p>
                         <p className="text-[10px] text-gray-500 mt-1">Format recommandé: JPG ou PNG</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'history' && (
            <div className="space-y-12 animate-fade-in">
               <h2 className="font-serif text-5xl italic mb-2 border-b border-white/5 pb-8">Historique des Dons</h2>
               <div className="space-y-4">
                 {history.map(item => (
                   <div key={item.id} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-sm group hover:border-[#c5a059]/30 transition-all">
                      <div>
                        <p className="text-sm font-bold text-white">{item.amount.toLocaleString()} FCFA</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.date} via {item.method}</p>
                      </div>
                      <span className="text-[8px] font-bold tracking-widest px-3 py-1 bg-green-500/10 text-green-500 rounded-sm uppercase">COMPLÉTÉ</span>
                   </div>
                 ))}
               </div>
            </div>
          )}
          
          {(activeSubTab === 'steps' || activeSubTab === 'groups') && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-30">
               <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
               <p className="text-xs tracking-widest font-bold uppercase">Section en cours de synchronisation</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MemberSpace;
