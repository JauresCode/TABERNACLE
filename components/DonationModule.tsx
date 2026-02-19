
import React, { useState } from 'react';
import { PaymentMethod } from '../types';

interface DonationModuleProps {
  fullPage?: boolean;
}

const DonationModule: React.FC<DonationModuleProps> = ({ fullPage = false }) => {
  const presets = [500, 2000, 5000, 10000, 25000];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.WAVE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWaveInstruction, setShowWaveInstruction] = useState(false);
  const [transactionId, setTransactionId] = useState<string>('');

  const WAVE_PHONE = "+225 01 03 80 72 07";
  const WAVE_PHONE_RAW = "0103807207"; 

  const handleDonate = async () => {
    const finalAmount = customAmount ? parseInt(customAmount) : (selectedAmount || 0);
    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Veuillez entrer un montant valide.");
      return;
    }
    setIsProcessing(true);
    if (method === PaymentMethod.WAVE) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setTransactionId(`TAB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      setShowWaveInstruction(true);
      setIsProcessing(false);
      window.location.href = "wave://";
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="bg-[#121212] p-12 rounded-sm border border-[#c5a059]/30 text-center animate-fade-in">
        <div className="w-20 h-20 bg-[#c5a059] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold/20">
          <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="font-serif text-4xl mb-4 italic text-white">Merci pour votre don !</h2>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">Votre générosité soutient les missions du Tabernacle de la Foi.</p>
        <button onClick={() => setShowSuccess(false)} className="text-[#c5a059] text-xs font-bold tracking-widest border-b border-[#c5a059] pb-1 uppercase">Fermer</button>
      </div>
    );
  }

  return (
    <div className={`${fullPage ? 'max-w-xl mx-auto pt-10' : 'bg-[#121212] p-8 rounded-sm border border-white/5'}`}>
      <div className="mb-10 text-center">
        <h2 className="font-serif text-4xl mb-2 text-white">Soutenir Le Tabernacle</h2>
        <div className="w-12 h-[1px] bg-[#c5a059] mx-auto mb-4" />
        <p className="text-gray-500 text-sm italic">Votre contribution est un acte de foi pour notre communauté.</p>
      </div>
      <div className="space-y-8">
        <div>
          <label className="text-[10px] tracking-[0.2em] text-gray-400 font-bold block mb-4 uppercase text-center">Montant du don</label>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {presets.map((amount) => (
              <button key={amount} onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }} className={`py-3 text-[10px] font-bold transition-all border rounded-sm ${selectedAmount === amount && !customAmount ? 'bg-[#c5a059] text-black border-[#c5a059]' : 'bg-black text-gray-500 border-white/5'}`}>
                {amount.toLocaleString()} FCFA
              </button>
            ))}
          </div>
          <input type="number" placeholder="Montant personnalisé" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }} className="w-full bg-black border border-white/10 p-4 text-center text-sm focus:border-[#c5a059] outline-none text-white" />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.2em] text-gray-400 font-bold block mb-4 uppercase text-center">Mode de paiement</label>
          <div className="grid grid-cols-2 gap-3">
            {[PaymentMethod.WAVE, PaymentMethod.ORANGE_MONEY, PaymentMethod.MTN_MONEY, PaymentMethod.MOOV].map((pm) => (
              <button key={pm} onClick={() => setMethod(pm)} className={`p-4 border rounded-sm text-[10px] font-bold uppercase tracking-widest ${method === pm ? 'border-[#c5a059] text-[#c5a059]' : 'border-white/5 text-gray-600'}`}>{pm}</button>
            ))}
          </div>
        </div>
        <button onClick={handleDonate} disabled={isProcessing} className={`w-full py-5 rounded-sm text-[10px] font-bold tracking-[0.3em] transition-all bg-[#c5a059] text-black`}>
          {isProcessing ? 'INITIALISATION...' : 'VALIDER MON DON'}
        </button>
      </div>
    </div>
  );
};

export default DonationModule;
