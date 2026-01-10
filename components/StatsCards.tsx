
import React from 'react';
import { StatsSummary } from '../types';

interface StatsCardsProps {
  stats: StatsSummary;
}

const Card: React.FC<{ title: string; value: string; icon: string; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center space-x-4 transition-transform hover:scale-[1.02]">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <i className={`fas ${icon} text-lg text-white`}></i>
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{value}</p>
    </div>
  </div>
);

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-8 max-w-7xl mx-auto">
      <Card 
        title="Количество ОО" 
        value={stats.schoolCount.toString()} 
        icon="fa-school" 
        color="bg-rose-500" 
      />
      <Card 
        title="Участников" 
        value={stats.participantCount.toLocaleString()} 
        icon="fa-users" 
        color="bg-slate-700" 
      />
      <Card 
        title="Успеваемость" 
        value={`${stats.successRate.toFixed(1)}%`} 
        icon="fa-check-double" 
        color="bg-emerald-500" 
      />
      <Card 
        title="Качество (4+5)" 
        value={`${stats.qualityRate.toFixed(1)}%`} 
        icon="fa-chart-line" 
        color="bg-indigo-500" 
      />
    </div>
  );
};

export default StatsCards;
