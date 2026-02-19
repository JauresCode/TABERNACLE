
import React, { useState } from 'react';
import SocialShare from './SocialShare';

interface Testimony {
  id: string;
  user: string;
  content: string;
  image?: string;
  likes: number;
  date: string;
}

const CommunitySpace: React.FC = () => {
  const [activeView, setActiveView] = useState<'forum' | 'testimonies'>('testimonies');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [sharingTestimonyId, setSharingTestimonyId] = useState<string | null>(null);

  const testimonies: Testimony[] = [
    {
      id: '1',
      user: 'Sarah M.',
      content: "Une grâce infinie lors du dernier culte. J'ai ressenti une paix que je ne saurais expliquer. Merci Lumina.",
      image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=800',
      likes: 124,
      date: 'Hier'
    },
    {
      id: '2',
      user: 'Marc-André',
      content: "Le groupe de prière matinale a changé ma vie. On se sent soutenu, on n'est plus seul face aux épreuves.",
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      likes: 89,
      date: 'Il y a 2 jours'
    },
    {
      id: '3',
      user: 'Bernadette K.',
      content: "Reconnaissante pour la bourse d'études accordée à mon fils par la fondation Lumina. Dieu est bon !",
      likes: 256,
      date: 'Il y a 5 jours'
    }
  ];

  return (
    <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="font-serif text-6xl mb-4 italic">Vie Communautaire</h2>
          <p className="text-gray-500 font-light max-w-xl">
            Un lieu d'échange, de partage et de soutien mutuel pour grandir ensemble dans la foi.
          </p>
        </div>
        
        <div className="flex bg-[#121212] p-1 rounded-sm border border-white/5">
          <button 
            onClick={() => setActiveView('testimonies')}
            className={`px-6 py-2 text-[10px] tracking-widest font-bold uppercase transition-all ${activeView === 'testimonies' ? 'bg-[#c5a059] text-black' : 'text-gray-500 hover:text-white'}`}
          >
            TÉMOIGNAGES
          </button>
          <button 
            onClick={() => setActiveView('forum')}
            className={`px-6 py-2 text-[10px] tracking-widest font-bold uppercase transition-all ${activeView === 'forum' ? 'bg-[#c5a059] text-black' : 'text-gray-500 hover:text-white'}`}
          >
            FORUM DE DISCUSSION
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          
          {activeView === 'testimonies' ? (
            <div className="space-y-12 animate-fade-in">
              <div className="bg-[#c5a059] p-8 rounded-sm flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-gold/10">
                <div className="text-black mb-6 md:mb-0 text-center md:text-left">
                  <h3 className="font-serif text-3xl italic mb-2">Partagez votre Lumière</h3>
                  <p className="text-sm opacity-80">Votre témoignage peut encourager un frère ou une sœur aujourd'hui.</p>
                </div>
                <button 
                  onClick={() => setShowSubmitModal(true)}
                  className="bg-black text-white px-8 py-4 rounded-sm font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  PUBLIER UN TÉMOIGNAGE
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonies.map((test) => (
                  <div key={test.id} className="bg-[#121212] border border-white/5 rounded-sm overflow-hidden flex flex-col group">
                    {test.image && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={test.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" alt="Témoignage visuel" />
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c5a059] to-black border border-white/10 flex items-center justify-center">
                            <span className="text-[10px] font-bold">{test.user.charAt(0)}</span>
                          </div>
                          <span className="text-xs font-bold text-white">{test.user}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{test.date}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed italic mb-8 flex-1">
                        "{test.content}"
                      </p>
                      
                      <div className="flex flex-col space-y-4 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <button className="flex items-center space-x-2 text-[#c5a059] group/btn">
                            <svg className="w-4 h-4 transition-transform group-hover/btn:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-[10px] font-bold tracking-widest">{test.likes} AMEN</span>
                          </button>
                          <button 
                            onClick={() => setSharingTestimonyId(sharingTestimonyId === test.id ? null : test.id)}
                            className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-white transition-colors uppercase flex items-center"
                          >
                            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Partager
                          </button>
                        </div>
                        
                        {sharingTestimonyId === test.id && (
                          <div className="bg-black/50 p-4 rounded-sm border border-white/5 animate-fade-in-up">
                            <SocialShare 
                              title={`Témoignage de ${test.user}`}
                              text={test.content}
                              className="justify-center"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xs tracking-widest font-bold text-gray-500 uppercase">DISCUSSIONS RÉCENTES</h3>
              {[
                { user: 'Marie D.', topic: 'Comment organisez-vous vos groupes de prière matinale ?', replies: 24, time: 'Il y a 2h' },
                { user: 'Paul K.', topic: 'Questions sur le prochain séminaire de couple', replies: 12, time: 'Hier' },
                { user: 'Julie L.', topic: 'Recrutement de nouveaux bénévoles pour la chorale des enfants', replies: 12, time: 'Hier' }
              ].map((post, i) => (
                <div key={i} className="bg-[#121212] p-8 border border-white/5 hover:border-[#c5a059]/30 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8a6d35]" />
                      <span className="text-xs font-bold text-gray-300">{post.user}</span>
                    </div>
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest">{post.time}</span>
                  </div>
                  <h4 className="font-serif text-2xl mb-6 group-hover:text-[#c5a059] transition-colors leading-snug">{post.topic}</h4>
                  <div className="flex items-center space-x-6 text-[10px] tracking-widest text-gray-500 uppercase font-bold">
                    <span className="flex items-center"><svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> {post.replies} RÉPONSES</span>
                    <span className="text-gray-800">•</span>
                    <span className="hover:text-white transition-colors cursor-pointer">PARTAGER</span>
                  </div>
                </div>
              ))}
              <button className="w-full py-6 border border-white/5 text-gray-500 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white hover:text-black transition-all">
                VOIR TOUTES LES DISCUSSIONS
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-[#121212] p-8 border border-white/5 rounded-sm">
            <h3 className="text-[10px] tracking-[0.2em] font-bold text-[#c5a059] uppercase mb-8">Espace Vie de l'Église</h3>
            <div className="space-y-6">
              {[
                { name: 'Prière Matinale', count: '450 membres' },
                { name: 'Chorale Lumina', count: '120 membres' },
                { name: 'Jeunesse Connectée', count: '890 membres' },
                { name: 'Étude Biblique', count: '230 membres' }
              ].map((g, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 group cursor-pointer hover:border-[#c5a059]/30 transition-all">
                  <div>
                    <span className="text-sm font-bold block mb-1">{g.name}</span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{g.count}</span>
                  </div>
                  <button className="text-[9px] text-[#c5a059] font-bold tracking-widest border border-[#c5a059]/30 px-3 py-1 rounded-sm group-hover:bg-[#c5a059] group-hover:text-black transition-all">REJOINDRE</button>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all">VOIR TOUS LES GROUPES</button>
          </div>

          <div className="bg-[#121212] p-8 border border-white/5 rounded-sm">
            <h3 className="text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase mb-8">Charte de Bienveillance</h3>
            <ul className="space-y-4 text-xs text-gray-400 font-light leading-relaxed">
              <li className="flex items-start"><span className="text-[#c5a059] mr-2">•</span> Restez respectueux et courtois.</li>
              <li className="flex items-start"><span className="text-[#c5a059] mr-2">•</span> Encouragez vos frères et sœurs.</li>
              <li className="flex items-start"><span className="text-[#c5a059] mr-2">•</span> Pas de messages à but commercial.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowSubmitModal(false)} />
          <div className="relative w-full max-w-2xl bg-[#121212] border border-white/10 p-12 rounded-sm shadow-2xl">
             <button 
               onClick={() => setShowSubmitModal(false)}
               className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
             >
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>

             <div className="text-center mb-10">
               <h3 className="font-serif text-4xl italic mb-4">Votre Témoignage</h3>
               <p className="text-gray-500 text-xs tracking-widest uppercase font-bold">Racontez comment Dieu a agi dans votre vie</p>
             </div>

             <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setShowSubmitModal(false); }}>
                <div className="space-y-3">
                   <label className="text-[10px] tracking-widest text-gray-500 uppercase font-bold">Message</label>
                   <textarea 
                     required
                     className="w-full bg-black border border-white/10 p-6 text-sm focus:outline-none focus:border-[#c5a059] transition-all rounded-sm min-h-[150px] font-light italic"
                     placeholder="Aujourd'hui, j'ai vu la main de Dieu..."
                   />
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] tracking-widest text-gray-500 uppercase font-bold">Image de témoignage (Optionnel)</label>
                   <div className="border-2 border-dashed border-white/10 p-10 flex flex-col items-center justify-center bg-black/20 hover:border-[#c5a059]/30 transition-all cursor-pointer group">
                      <svg className="w-8 h-8 text-gray-600 mb-4 group-hover:text-[#c5a059] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cliquez pour ajouter une photo</span>
                   </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-[#c5a059] text-black font-bold tracking-[0.3em] text-xs hover:bg-white transition-all transform hover:scale-[1.02] shadow-xl shadow-gold/10"
                >
                  PUBLIER LA LUMIÈRE
                </button>
             </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunitySpace;
