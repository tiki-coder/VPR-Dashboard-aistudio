
import React from 'react';
import { BiasData } from '../types';

interface BiasAnalysisProps {
  selectedSchoolBias?: BiasData;
  biasTrend: { year: number; percent: number }[];
  municipalityBiasList: BiasData[];
  selectedYear: number;
}

const BiasAnalysis: React.FC<BiasAnalysisProps> = ({ selectedSchoolBias, biasTrend, municipalityBiasList, selectedYear }) => {
  return (
    <div className="px-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center mb-6">
        <span className="w-1.5 h-6 bg-orange-500 rounded-full mr-3"></span>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Признаки необъективности</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Card: Specific School Analysis */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
           <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase text-center mb-6 tracking-widest italic">Анализ выбранной школы ({selectedYear})</h4>
           
           <div className="flex flex-col items-center justify-center min-h-[200px]">
             {!selectedSchoolBias ? (
               <div className="text-center group">
                 <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200 dark:border-slate-700 group-hover:border-indigo-300 transition-colors">
                    <span className="text-3xl text-slate-300">?</span>
                 </div>
                 <p className="text-slate-400 font-medium text-xs tracking-widest uppercase">Выберите ОО для детального анализа</p>
               </div>
             ) : (
               <div className="w-full">
                 <div className="flex justify-between items-center mb-6 p-5 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">Количество маркеров:</span>
                    <span className="text-4xl font-black text-orange-600 dark:text-orange-400">{selectedSchoolBias.MarkerCount}</span>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {selectedSchoolBias.Markers.map(m => (
                     <span key={m} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold shadow-sm">
                       {m}
                     </span>
                   ))}
                 </div>
                 {selectedSchoolBias.MarkerCount === 0 && (
                   <p className="text-emerald-500 font-bold text-center mt-4">Маркеров не обнаружено</p>
                 )}
               </div>
             )}
           </div>
        </div>

        {/* Right Card: Bias Trend (Improved styling with solid orange bars) */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
           <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase text-center mb-10 tracking-widest">Доля ОО с признаками необъективности (%)</h4>
           
           <div className="flex items-end justify-around h-[220px] px-4">
             {biasTrend.map(item => (
               <div key={item.year} className="flex flex-col items-center group relative h-full justify-end">
                 {/* Percent Label above bar */}
                 <span className="text-lg font-black text-slate-800 dark:text-white mb-3 transition-transform group-hover:scale-110">
                   {item.percent}%
                 </span>
                 
                 {/* Solid Orange Bar with smaller rounded corners */}
                 <div className="w-16 sm:w-20 bg-orange-500 rounded-t-lg overflow-hidden relative transition-all duration-300 group-hover:bg-orange-600"
                      style={{ height: `${Math.max(item.percent, 5)}%` }}>
                 </div>

                 <span className="text-xs font-bold text-slate-500 uppercase mt-4 tracking-widest">{item.year}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Bottom List: Municipality Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="flex items-center">
             <span className="w-1 h-5 bg-rose-500 rounded-full mr-3"></span>
             <h3 className="font-bold text-slate-800 dark:text-white uppercase text-sm">Список ОО муниципалитета с маркерами ({selectedYear})</h3>
           </div>
           <span className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-100 dark:border-rose-900/30">
             Найдено школ: {municipalityBiasList.length}
           </span>
        </div>
        
        <div className="min-h-[260px] flex flex-col items-center justify-center">
          {municipalityBiasList.length === 0 ? (
            <div className="p-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <i className="fas fa-thumbs-up text-5xl text-emerald-500"></i>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest max-w-sm mx-auto leading-relaxed italic">
                В этом году в выбранном районе школы с признаками необъективности отсутствуют. Качественная работа!
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Логин</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Наименование организации</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Маркеров</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Дисциплины</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {municipalityBiasList.map(school => (
                    <tr key={school.Login} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{school.Login}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-white">{school.OO}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 rounded-lg text-sm font-black">
                          {school.MarkerCount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {school.Markers.map(m => (
                            <span key={m} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiasAnalysis;
