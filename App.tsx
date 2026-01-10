
import React, { useState, useMemo } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StatsCards from './components/StatsCards';
import AnalysisCharts from './components/AnalysisCharts';
import BiasAnalysis from './components/BiasAnalysis';
import { generateMockData } from './dataProcessor';
import { FilterState, StatsSummary } from './types';

const App: React.FC = () => {
  const { marks, scores, bias } = useMemo(() => generateMockData(), []);
  
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

  const filterOptions = useMemo(() => {
    return {
      years: Array.from(new Set(marks.map(m => m.Year.toString()))).sort().reverse(),
      grades: Array.from(new Set(marks.map(m => m.Grade))).sort(),
      subjects: Array.from(new Set(marks.map(m => m.Subject))).sort(),
      municipalities: Array.from(new Set(marks.map(m => m.Municipality))).sort(),
      oos: Array.from(new Set(marks
        .filter(m => !filters.municipality || m.Municipality === filters.municipality)
        .map(m => m.OO))).sort()
    };
  }, [marks, filters.municipality]);

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

  const filteredScores = useMemo(() => {
    return scores.filter(s => {
      const yearMatch = !filters.year || s.Year.toString() === filters.year;
      const gradeMatch = !filters.grade || s.Grade === filters.grade;
      const subMatch = !filters.subject || s.Subject === filters.subject;
      const munMatch = !filters.municipality || s.Municipality === filters.municipality;
      const ooMatch = !filters.oo || s.OO === filters.oo;
      return yearMatch && gradeMatch && subMatch && munMatch && ooMatch;
    });
  }, [scores, filters]);

  const stats = useMemo<StatsSummary>(() => {
    const schools = new Set(filteredMarks.map(m => m.Login));
    const totalParticipants = filteredMarks.reduce((acc, m) => acc + m.Participants, 0);
    
    if (filteredMarks.length === 0) return { schoolCount: 0, participantCount: 0, successRate: 0, qualityRate: 0 };
    
    const sumParticipants = filteredMarks.reduce((acc, m) => acc + m.Participants, 0);
    const successCount = filteredMarks.reduce((acc, m) => acc + (m.Participants * (m.Mark3 + m.Mark4 + m.Mark5) / 100), 0);
    const qualityCount = filteredMarks.reduce((acc, m) => acc + (m.Participants * (m.Mark4 + m.Mark5) / 100), 0);

    return {
      schoolCount: schools.size,
      participantCount: totalParticipants,
      successRate: (successCount / sumParticipants) * 100,
      qualityRate: (qualityCount / sumParticipants) * 100
    };
  }, [filteredMarks]);

  const marksChartData = useMemo(() => {
    if (filteredMarks.length === 0) return [];
    const count = filteredMarks.length;
    const avg2 = filteredMarks.reduce((acc, m) => acc + m.Mark2, 0) / count;
    const avg3 = filteredMarks.reduce((acc, m) => acc + m.Mark3, 0) / count;
    const avg4 = filteredMarks.reduce((acc, m) => acc + m.Mark4, 0) / count;
    const avg5 = filteredMarks.reduce((acc, m) => acc + m.Mark5, 0) / count;
    return [
      { name: '2', value: Number(avg2.toFixed(1)) },
      { name: '3', value: Number(avg3.toFixed(1)) },
      { name: '4', value: Number(avg4.toFixed(1)) },
      { name: '5', value: Number(avg5.toFixed(1)) }
    ];
  }, [filteredMarks]);

  const scoresChartData = useMemo(() => {
    if (filteredScores.length === 0) return [];
    
    const pointAgg: Record<number, number[]> = {};
    filteredScores.forEach(item => {
      Object.entries(item.Scores).forEach(([pt, val]) => {
        const p = Number(pt);
        if (!pointAgg[p]) pointAgg[p] = [];
        pointAgg[p].push(val);
      });
    });

    return Object.entries(pointAgg)
      .map(([pt, vals]) => ({
        point: Number(pt),
        percentage: Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1))
      }))
      .sort((a, b) => a.point - b.point);
  }, [filteredScores]);

  const selectedYearInt = parseInt(filters.year) || 2023;
  
  const selectedSchoolBias = useMemo(() => {
    if (!filters.oo) return undefined;
    return bias.find(b => b.Year === selectedYearInt && b.OO === filters.oo);
  }, [bias, filters.oo, selectedYearInt]);

  const municipalityBiasList = useMemo(() => {
    if (!filters.municipality) return [];
    return bias.filter(b => b.Year === selectedYearInt && b.Municipality === filters.municipality && b.MarkerCount > 0);
  }, [bias, filters.municipality, selectedYearInt]);

  const biasTrend = useMemo(() => {
    const yearsArr = [selectedYearInt - 2, selectedYearInt - 1, selectedYearInt];
    return yearsArr.map(y => {
      const yearSchools = new Set(marks.filter(m => m.Year === y).map(m => m.Login));
      const yearBiased = new Set(bias.filter(b => b.Year === y && b.MarkerCount > 0).map(b => b.Login));
      const percent = yearSchools.size > 0 ? (yearBiased.size / yearSchools.size) * 100 : 0;
      return { year: y, percent: Number(percent.toFixed(1)) };
    });
  }, [marks, bias, selectedYearInt]);

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
          municipalityBiasList={municipalityBiasList}
          selectedYear={selectedYearInt}
        />
      </main>
      
      <footer className="text-center py-12 border-t border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
        <p className="font-medium tracking-widest uppercase">© 2024 VPR Dashboard Analytics. Финальная сборка.</p>
      </footer>
    </div>
  );
};

export default App;
