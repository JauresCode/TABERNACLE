
import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isDarkMode, toggleTheme }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: 'home', label: 'ACCUEIL', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'bible', label: 'BIBLE', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'quiz', label: 'QUIZ', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'sermons', label: 'BIBLIOTHÈQUE', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'gallery', label: 'GALERIE', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'community', label: 'COMMUNAUTÉ', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'members', label: 'ESPACE FIDÈLE', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'settings', label: 'PARAMÈTRES', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'admin', label: 'GESTION ADMIN', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full z-[100] transition-all duration-500 ease-in-out bg-[var(--bg-primary)] border-r border-[var(--border-color)] flex flex-col ${isExpanded ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-6 flex items-center h-24 overflow-hidden flex-shrink-0">
        <button onClick={() => setIsExpanded(!isExpanded)} className="flex-shrink-0 w-8 h-8 flex flex-col justify-center items-center space-y-1.5 group">
          <span className={`block h-0.5 bg-[#c5a059] transition-all duration-300 ${isExpanded ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
          <span className={`block h-0.5 bg-[#c5a059] transition-all duration-300 ${isExpanded ? 'opacity-0' : 'w-4'}`} />
          <span className={`block h-0.5 bg-[#c5a059] transition-all duration-300 ${isExpanded ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
        </button>
        <span className={`ml-4 font-serif text-xl tracking-[0.1em] transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          TABERNACLE
        </span>
      </div>

      <nav className="flex-1 mt-6 space-y-2 px-4 overflow-y-auto overflow-x-hidden custom-sidebar-scroll">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center h-12 rounded-sm transition-all duration-300 group relative ${
              activeTab === item.id ? 'bg-[#c5a059]/10 text-[#c5a059]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-accent)]'
            }`}
          >
            <div className={`w-12 h-full flex items-center justify-center flex-shrink-0`}>
              <svg className={`w-5 h-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
            </div>
            <span className={`ml-4 text-[9px] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
              {item.label}
            </span>
            {activeTab === item.id && <div className="absolute left-0 w-1 h-6 bg-[#c5a059] rounded-r-full" />}
          </button>
        ))}
      </nav>

      <div className="flex-shrink-0 pt-4 p-4 mb-6">
        <button onClick={() => setActiveTab('donations')} className={`w-full flex items-center justify-center rounded-sm transition-all duration-500 overflow-hidden ${isExpanded ? 'bg-[#c5a059] text-black h-12 px-4 shadow-lg' : 'bg-transparent text-[#c5a059] h-12 border border-[#c5a059]/20 hover:border-[#c5a059]'}`}>
          <div className="flex-shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
          <span className={`ml-4 text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${isExpanded ? 'opacity-100' : 'w-0 opacity-0'}`}>OFFRANDE</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
