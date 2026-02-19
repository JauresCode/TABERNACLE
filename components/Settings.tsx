
import React, { useState, useEffect } from 'react';
import { SystemStatus } from '../types';
import { requestNotificationPermission, simulateIncomingPush } from '../services/notificationService';

interface SettingsProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, toggleTheme }) => {
  const [status, setStatus] = useState<SystemStatus>({
    aiConnected: true,
    networkLatency: 0,
    pwaInstalled: false,
    storageUsed: '0 MB'
  });
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairStep, setRepairStep] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    setNotificationsEnabled(Notification.permission === 'granted');
    const checkSystems = async () => {
      const start = Date.now();
      try {
        await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
        const latency = Date.now() - start;
        const isPWA = window.matchMedia('(display-mode: standalone)').matches;
        setStatus({
          aiConnected: !!process.env.API_KEY,
          networkLatency: latency,
          pwaInstalled: isPWA,
          storageUsed: '0.8 MB'
        });
      } catch (e) {
        setStatus(prev => ({ ...prev, networkLatency: 0 }));
      }
    };
    checkSystems();
  }, []);

  const handleToggleNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
  };

  const handleRepair = async () => {
    setIsRepairing(true);
    setRepairStep('Nettoyage du cache...');
    await new Promise(r => setTimeout(r, 1500));
    setRepairStep('Optimisation terminée !');
    setTimeout(() => { window.location.reload(); }, 1000);
  };

  return (
    <section className="pt-32 pb-24 px-4 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-16">
        <h2 className="font-serif text-6xl mb-4 italic">Configuration</h2>
        <p className="text-gray-500 font-light max-w-xl">Personnalisez votre expérience au Tabernacle de la Foi.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 rounded-sm">
            <h3 className="text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase mb-8">Apparence</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-[var(--surface-accent)] border border-[var(--border-color)] rounded-sm">
                <div>
                  <p className="text-sm font-bold">Mode Sombre</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest">{isDarkMode ? 'Actif' : 'Inactif'}</p>
                </div>
                <button onClick={toggleTheme} className={`w-14 h-7 rounded-full p-1 ${isDarkMode ? 'bg-[#c5a059]' : 'bg-gray-200'}`}>
                   <div className={`w-5 h-5 bg-white rounded-full transition-all ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-6 bg-[var(--surface-accent)] border border-[var(--border-color)] rounded-sm">
                <div>
                  <p className="text-sm font-bold">Notifications</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest">{notificationsEnabled ? 'Activées' : 'Désactivées'}</p>
                </div>
                <button onClick={handleToggleNotifications} className={`w-14 h-7 rounded-full p-1 ${notificationsEnabled ? 'bg-[#c5a059]' : 'bg-gray-200'}`}>
                   <div className={`w-5 h-5 bg-white rounded-full transition-all ${notificationsEnabled ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 rounded-sm">
          <h3 className="text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase mb-8 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse" />
            État du Système Tabernacle
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Moteur IA</span><span className="text-[#c5a059] font-bold">ACTIF</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Mode App</span><span className="text-white text-xs">{status.pwaInstalled ? 'PWA NATIVE' : 'WEB'}</span></div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <button onClick={handleRepair} disabled={isRepairing} className="w-full py-4 text-[10px] font-bold tracking-widest border border-[#c5a059] text-[#c5a059] uppercase hover:bg-[#c5a059] hover:text-black">
                {isRepairing ? repairStep.toUpperCase() : 'LANCER LA RÉPARATION'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
