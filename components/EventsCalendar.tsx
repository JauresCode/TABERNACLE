
import React, { useState } from 'react';
import { requestNotificationPermission, simulateIncomingPush } from '../services/notificationService';

interface EventsCalendarProps {
  fullPage?: boolean;
}

const EventsCalendar: React.FC<EventsCalendarProps> = ({ fullPage = false }) => {
  const [filter, setFilter] = useState('All');
  const [remindedEvents, setRemindedEvents] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const events = [
    { id: '1', title: 'Culte de Louange', date: 'Dim 16 Juin', time: '10:00', type: 'Service', image: 'https://picsum.photos/id/111/400/250' },
    { id: '2', title: 'Retraite Spirituelle', date: 'Ven 21 Juin', time: '18:00', type: 'Retreat', image: 'https://picsum.photos/id/112/400/250' },
    { id: '3', title: 'Conférence Jeunesse', date: 'Sam 22 Juin', time: '14:30', type: 'Conference', image: 'https://picsum.photos/id/113/400/250' },
    { id: '4', title: 'Culte de Jeudi', date: 'Jeu 20 Juin', time: '19:00', type: 'Service', image: 'https://picsum.photos/id/114/400/250' },
    { id: '5', title: 'Étude Biblique', date: 'Mer 19 Juin', time: '18:30', type: 'Community', image: 'https://picsum.photos/id/115/400/250' },
    { id: '6', title: 'Répétition Chorale', date: 'Sam 22 Juin', time: '09:00', type: 'Community', image: 'https://picsum.photos/id/116/400/250' },
  ];

  const handleReminder = async (event: any) => {
    const isGranted = await requestNotificationPermission();
    
    if (remindedEvents.includes(event.id)) {
      setRemindedEvents(remindedEvents.filter(rid => rid !== event.id));
    } else {
      setRemindedEvents([...remindedEvents, event.id]);
      
      if (isGranted) {
        // Simulation d'une notification push pour l'expérience utilisateur
        simulateIncomingPush('event', { 
          title: event.title, 
          time: event.time 
        });
      }

      // Simulation d'un toast visuel
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-24 right-8 bg-[#c5a059] text-black px-6 py-3 rounded-sm font-bold text-[10px] tracking-widest shadow-2xl z-[300] animate-fade-in-up';
      toast.innerText = isGranted ? 'RAPPEL PROGRAMMÉ AVEC SUCCÈS' : 'RAPPEL ACTIVÉ (SANS NOTIFICATION)';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => document.body.removeChild(toast), 500);
      }, 3000);
    }
  };

  const filteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter);
  const displayedEvents = fullPage || isExpanded ? filteredEvents : filteredEvents.slice(0, 4);

  return (
    <div className={`${fullPage ? 'py-12' : ''}`}>
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-serif text-4xl mb-2">Calendrier Sacré</h2>
          <p className="text-gray-500 text-sm italic">"Il y a un temps pour tout sous le ciel."</p>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Service', 'Retreat', 'Conference', 'Community'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 text-[10px] font-bold tracking-widest border transition-all uppercase whitespace-nowrap ${
                filter === f ? 'bg-[#c5a059] text-black border-[#c5a059]' : 'border-white/10 text-gray-500 hover:border-white/30'
              }`}
            >
              {f === 'All' ? 'TOUS' : f === 'Retreat' ? 'RETRAITES' : f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 transition-all duration-500">
        {displayedEvents.map((event, i) => (
          <div key={event.id} className="group bg-[var(--bg-secondary)] flex items-center p-4 rounded-sm border border-[var(--border-color)] hover:bg-white/5 transition-all cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-black flex flex-col items-center justify-center border border-white/10">
              <span className="text-[10px] text-gray-500 uppercase mb-1 font-bold">{event.date.split(' ')[0]}</span>
              <span className="text-lg font-serif text-[#c5a059] leading-none">{event.date.split(' ')[1]} {event.date.split(' ')[2]}</span>
            </div>
            
            <div className="ml-6 flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[9px] tracking-widest text-[#c5a059] font-bold uppercase">{event.type}</span>
                <span className="text-gray-700">•</span>
                <span className="text-[9px] tracking-widest text-gray-500 font-bold">{event.time}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl group-hover:text-[#c5a059] transition-colors">{event.title}</h3>
            </div>

            <div className="ml-4 flex items-center space-x-2">
              <button 
                onClick={(e) => { e.stopPropagation(); handleReminder(event); }}
                className={`p-3 rounded-full transition-all flex items-center space-x-2 ${
                  remindedEvents.includes(event.id) 
                  ? 'bg-[#c5a059] text-black' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                title="Me rappeler"
              >
                <svg className="w-5 h-5" fill={remindedEvents.includes(event.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {remindedEvents.includes(event.id) && <span className="text-[10px] font-bold hidden lg:inline uppercase tracking-widest">Rappel Actif</span>}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {!fullPage && filteredEvents.length > 4 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-6 py-4 text-[10px] tracking-[0.3em] font-bold text-gray-400 hover:text-[#c5a059] transition-colors uppercase border-t border-white/5"
        >
          {isExpanded ? 'Réduire la liste' : 'Voir tout le calendrier'}
        </button>
      )}
    </div>
  );
};

export default EventsCalendar;
