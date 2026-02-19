
import React, { useState, useEffect } from 'react';
import { PodcastEpisode } from '../types';

interface LibraryProps {
  onPlayVideo: (id: string, title: string) => void;
  onPlayAudio?: (episode: PodcastEpisode) => void;
}

const Library: React.FC<LibraryProps> = ({ onPlayVideo, onPlayAudio }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [newEpisode, setNewEpisode] = useState({
    title: '',
    author: '',
    description: '',
    img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400',
    date: new Date().toLocaleDateString('fr-FR')
  });

  const defaultItems: PodcastEpisode[] = [
    { id: 'p1', title: 'La Foi en Temps Modernes', author: 'Pasteur Jean', date: '12 Jan 2024', description: 'Une réflexion profonde sur la spiritualité au 21ème siècle.', img: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&q=80&w=400', type: 'audio', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '45:20' },
    { id: 'p2', title: 'L\'Art du Pardon', author: 'Sœur Marie', date: '05 Jan 2024', description: 'Comment le pardon peut libérer votre âme.', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400', type: 'text', audioUrl: '', duration: '12 min' },
    { id: 'p3', title: 'Bâtir sa Communauté', author: 'Dr. Lucas', date: '28 Dec 2023', description: 'Les piliers d\'une église forte et unie.', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400', type: 'video', audioUrl: '', duration: '32:15' },
    { id: 'p4', title: 'Prière & Méditation', author: 'Équipe Louange', date: '15 Dec 2023', description: 'Session de louange acoustique et moments de silence.', img: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=400', type: 'audio', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '58:00' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('tabernacle_podcasts');
    if (saved) {
      setEpisodes(JSON.parse(saved));
    } else {
      setEpisodes(defaultItems);
    }
  }, []);

  const saveEpisodes = (list: PodcastEpisode[]) => {
    setEpisodes(list);
    localStorage.setItem('tabernacle_podcasts', JSON.stringify(list));
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const episode: PodcastEpisode = {
      id: Date.now().toString(),
      ...newEpisode,
      type: 'audio',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', // Mock audio
      duration: '42:00'
    };
    saveEpisodes([episode, ...episodes]);
    setShowUploadModal(false);
    setNewEpisode({ title: '', author: '', description: '', img: newEpisode.img, date: new Date().toLocaleDateString('fr-FR') });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Supprimer cet épisode ?")) {
      saveEpisodes(episodes.filter(ep => ep.id !== id));
    }
  };

  const handleItemClick = (item: PodcastEpisode) => {
    if (item.type === 'video') {
      onPlayVideo('dQw4w9WgXcQ', item.title);
    } else if (item.type === 'audio' && onPlayAudio) {
      onPlayAudio(item);
    }
  };

  const filteredItems = activeFilter === 'All' ? episodes : episodes.filter(e => e.type === activeFilter.toLowerCase());

  return (
    <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <h2 className="font-serif text-6xl mb-4 italic">Bibliothèque</h2>
          <p className="text-gray-500 font-light max-w-xl">Accédez à nos sermons, podcasts et enseignements sacrés.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex bg-[#121212] p-1 rounded-sm border border-white/5">
            {['All', 'Audio', 'Video', 'Text'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-[10px] tracking-widest font-bold uppercase transition-all ${activeFilter === f ? 'bg-[#c5a059] text-black' : 'text-gray-500 hover:text-white'}`}
              >
                {f === 'All' ? 'TOUS' : f}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-[#c5a059] text-black text-[10px] font-bold tracking-widest uppercase hover:bg-white transition-all rounded-sm flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth={2} strokeLinecap="round" /></svg>
            <span>AJOUTER PODCAST</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="group cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 rounded-sm hover:border-[#c5a059]/30 transition-all flex flex-col h-full"
            onClick={() => handleItemClick(item)}
          >
            <div className="relative aspect-square overflow-hidden mb-6 bg-black rounded-sm shadow-xl">
              <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={item.title} />
              
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <span className="bg-[#c5a059] text-black px-2 py-1 text-[8px] font-bold uppercase w-fit">{item.type}</span>
                <span className="bg-black/80 text-white px-2 py-1 text-[8px] font-bold uppercase w-fit border border-white/10">{item.duration}</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 bg-[#c5a059] text-black rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                   {item.type === 'video' ? (
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   ) : item.type === 'audio' ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                   )}
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl group-hover:text-[#c5a059] transition-colors leading-tight">{item.title}</h3>
                <button 
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-2 text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} /></svg>
                </button>
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-4">{item.author} • {item.date}</p>
              <p className="text-xs text-gray-400 font-light line-clamp-2 italic mb-6">
                "{item.description}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowUploadModal(false)} />
          <div className="relative w-full max-w-xl bg-[#121212] border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl">
            <button onClick={() => setShowUploadModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg>
            </button>
            
            <h3 className="font-serif text-3xl mb-10 italic border-b border-white/5 pb-4">Nouvel Épisode Podcast</h3>
            
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Titre de l'épisode</label>
                <input 
                  required
                  type="text" 
                  value={newEpisode.title}
                  onChange={(e) => setNewEpisode({...newEpisode, title: e.target.value})}
                  className="w-full bg-black border border-white/10 p-4 text-sm focus:border-[#c5a059] outline-none transition-all"
                  placeholder="Ex: La Grâce de Dieu"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Auteur / Host</label>
                <input 
                  required
                  type="text" 
                  value={newEpisode.author}
                  onChange={(e) => setNewEpisode({...newEpisode, author: e.target.value})}
                  className="w-full bg-black border border-white/10 p-4 text-sm focus:border-[#c5a059] outline-none transition-all"
                  placeholder="Ex: Pasteur Marc"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</label>
                <textarea 
                  required
                  value={newEpisode.description}
                  onChange={(e) => setNewEpisode({...newEpisode, description: e.target.value})}
                  className="w-full bg-black border border-white/10 p-4 text-sm h-32 focus:border-[#c5a059] outline-none transition-all"
                  placeholder="De quoi parle cet épisode ?"
                />
              </div>
              <button className="w-full bg-[#c5a059] text-black py-4 font-bold tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-xl shadow-gold/20">
                PUBLIER L'ÉPISODE
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Library;
