import React, { useState, useMemo } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StatsCards from './components/StatsCards';
import AnalysisCharts from './components/AnalysisCharts';
import BiasAnalysis from './components/BiasAnalysis';
import { generateMockData } from './dataProcessor';
import { FilterState, StatsSummary } from './types';

const App: React.FC = () => {
  // Master data - conceptually separated into 3 sources
  const { marks, scores, bias } = useMemo(() => generateMockData(), []);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    year: '2023',
    grade: '',
    subject: '',
    municipality: '',
    oo: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Compute Filter Options using marks source
  const filterOptions = useMemo(() => {
    return {
      years: Array.from(new Set(marks.map(m => m.Year.toString()))).sort().reverse(),
      /*...*/
    };
  }, [marks]);

  // Filtered Data from Marks source
  const filteredMarks = useMemo(() => {
    return marks.filter(m => {
      const yearMatch = !filters.year || m.Year.toString() === filters.year;
      const gradeMatch = !filters.grade || m.Grade === filters.grade;
      const subMatch = !filters.subject || m.Subject === filters.subject;
      const munMatch = !filters.municipality || m.Municipality === filters.municipality;
      const ooMatch = !filters.oo || m.OO === filters.oo;
      return yearMatch && gradeMatch && subMatch && munMatch && ooMatch;
    });
  }, [marks, filters]);

  // Aggregate Stats — исправлено: единое имя переменной и защита от деления на 0
  const stats = useMemo<StatsSummary>(() => {
    if (filteredMarks.length === 0) return { schoolCount: 0, participantCount: 0, successRate: 0, qualityRate: 0 };
    
    const schools = new Set(filteredMarks.map(m => m.Login));
    const totalParticipants = filteredMarks.reduce((acc, m) => acc + m.Participants, 0);

    // Защита от деления на 0 (если участники равны 0 — возвращаем 0% по метрикам)
    if (totalParticipants === 0) {
      return { schoolCount: schools.size, participantCount: 0, successRate: 0, qualityRate: 0 };
    }

    const successCount = filteredMarks.reduce((acc, m) => acc + (m.Participants * (m.Mark3 + m.Mark4 + m.Mark5) / 100), 0);
    const qualityCount = filteredMarks.reduce((acc, m) => acc + (m.Participants * (m.Mark4 + m.Mark5) / 100), 0);

    return {
      schoolCount: schools.size,
      participantCount: totalParticipants,
      successRate: (successCount / totalParticipants) * 100,
      qualityRate: (qualityCount / totalParticipants) * 100
    };
  }, [filteredMarks]);

  // Chart Data Preparation
  const marksChartData = useMemo(() => {
    if (filteredMarks.length === 0) return [];
    const count = filteredMarks.length;
    /*...*/
  }, [filteredMarks]);

  const scoresChartData = useMemo(() => {
    if (filteredScores.length === 0) return [];
    
    const pointAgg: Record<number, number[]> = {};
    filteredScores.forEach(item => {
      /*...*/
    });
    /*...*/
  }, [filteredScores]);

  // Bias logic
  const selectedYearInt = parseInt(filters.year) || 2023;
  
  const selectedSchoolBias = useMemo(() => {
    if (!filters.oo) return undefined;
    return bias.find(b => b.Year === selectedYearInt && b.OO === filters.oo);
  }, [bias, filters.oo, selectedYearInt]);

  const municipalityBiasList = useMemo(() => {
    if (!filters.municipality) return [];
    /*...*/
  }, [bias, filters.municipality, selectedYearInt]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <DashboardHeader 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        options={filterOptions} 
      />
      
      <main className="animate-in fade-in slide-in-from-bottom-2 duration-700">
        <div className="px-6 py-10 max-w-7xl mx-auto flex items-center">
           <span className="w-2 h-8 bg-indigo-600 rounded-full mr-4 shadow-lg shadow-indigo-500/30"></span>
           <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Анализ результатов ВПР</h2>
        </div>

        <StatsCards stats={stats} />
        
        <AnalysisCharts 
          marksData={marksChartData} 
          scoresData={scoresChartData} 
        />

        <BiasAnalysis 
          selectedSchoolBias={selectedSchoolBias}
          biasTrend={biasTrend}
          /*...*/
        />
      </main>
      
      <footer className="text-center py-12 border-t border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
        <p className="font-medium tracking-widest uppercase">© 2024 VPR Dashboard Analytics. Финальная сборка.</p>
      </footer>
    </div>
  );
};

export default App;
