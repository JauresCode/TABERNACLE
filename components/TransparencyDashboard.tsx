
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TransparencyDashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const data = [
    { name: 'Jan', amount: 12400 },
    { name: 'Feb', amount: 15600 },
    { name: 'Mar', amount: 18900 },
    { name: 'Apr', amount: 21000 },
    { name: 'May', amount: 16500 },
    { name: 'Jun', amount: 24000 },
  ];

  const stats = [
    { label: 'Total Dons 2024', value: '108,400 €', change: '+12%' },
    { label: 'Projets Financés', value: '14', change: '80% accomplis' },
    { label: 'Fidèles Actifs', value: '2,450', change: '+150 ce mois' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 bg-[#121212]/50 border-y border-white/5 transition-all duration-700">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-serif text-5xl mb-4 italic">Transparence & Impact</h2>
          <p className="text-gray-400 max-w-2xl font-light leading-relaxed">
            Nous croyons en une gestion ouverte. Visualisez comment vos contributions transforment notre communauté.
          </p>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center space-x-3 px-6 py-3 border border-[#c5a059]/30 text-[#c5a059] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#c5a059] hover:text-black transition-all group"
        >
          <span>{isCollapsed ? 'DÉPLIER LE TABLEAU' : 'REPLIER LE TABLEAU'}</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-500 ${isCollapsed ? '' : 'rotate-180'}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 items-center transition-all duration-700 overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}>
        <div className="lg:col-span-2 bg-black/40 p-8 rounded-sm border border-white/5 h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs tracking-widest text-gray-500 uppercase font-bold">ÉVOLUTION DES DONS (6 MOIS)</h3>
            <div className="text-[10px] bg-[#c5a059]/10 text-[#c5a059] px-3 py-1 rounded-full">RAPPORT GÉNÉRÉ PAR IA</div>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="name" stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }}
                cursor={{ fill: '#222' }}
              />
              <Bar dataKey="amount" radius={[2, 2, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 5 ? '#c5a059' : '#333'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 bg-black/20 border border-white/5 rounded-sm hover:border-[#c5a059]/20 transition-all">
              <p className="text-[10px] tracking-widest text-gray-500 uppercase mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-serif">{stat.value}</span>
                <span className="text-xs text-[#c5a059] font-bold">{stat.change}</span>
              </div>
            </div>
          ))}
          <button className="w-full py-4 border border-[#c5a059]/30 text-[#c5a059] text-[10px] tracking-widest font-bold uppercase hover:bg-[#c5a059] hover:text-black transition-all">
            TÉLÉCHARGER LE RAPPORT ANNUEL (PDF)
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransparencyDashboard;
