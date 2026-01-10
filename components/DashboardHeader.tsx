
import React from 'react';
import { FilterState } from '../types.ts';

interface HeaderProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  options: {
    years: string[];
    grades: string[];
    subjects: string[];
    municipalities: string[];
    oos: string[];
  };
}

const DashboardHeader: React.FC<HeaderProps> = ({ filters, onFilterChange, options }) => {
  return (
    <header className="app-header sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[120px]">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Год</label>
          <select 
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Все</option>
            {options.years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="flex-1 min-w-[120px]">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Класс</label>
          <select 
            value={filters.grade}
            onChange={(e) => onFilterChange('grade', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Все</option>
            {options.grades.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Предмет</label>
          <select 
            value={filters.subject}
            onChange={(e) => onFilterChange('subject', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Все</option>
            {options.subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex-[1.5] min-w-[180px]">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Муниципалитет</label>
          <select 
            value={filters.municipality}
            onChange={(e) => onFilterChange('municipality', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Все</option>
            {options.municipalities.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="flex-[2] min-w-[220px]">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Организация (ОО)</label>
          <select 
            value={filters.oo}
            onChange={(e) => onFilterChange('oo', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
          >
            <option value="">Все ОО</option>
            {options.oos.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
