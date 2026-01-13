import { useState, useEffect, useMemo } from 'react';
import { MarksData, ScoreData, BiasData, FilterState, Stats } from './types';
import { loadExcelData, generateMockMarks, generateMockScores, generateMockBias } from './dataProcessor';
import DashboardHeader from './components/DashboardHeader';
import StatsCards from './components/StatsCards';
import AnalysisCharts from './components/AnalysisCharts';
import BiasAnalysis from './components/BiasAnalysis';

const App = () => {
  const [allMarks, setAllMarks] = useState<MarksData[]>([]);
  const [allScores, setAllScores] = useState<ScoreData[]>([]);
  const [allBias, setAllBias] = useState<BiasData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    year: 'Все',
    classLevel: 'Все',
    subject: 'Все',
    municipality: 'Все',
    oo: 'Все',
  });

  useEffect(() => {
    const fetchData = async () => {
      const marksData = await loadExcelData('marks.xlsx');
      const scoresData = await loadExcelData('scores.xlsx');
      const biasData = await loadExcelData('bias.xlsx');

      setAllMarks(marksData.length > 0 ? marksData : generateMockMarks());
      setAllScores(scoresData.length > 0 ? scoresData : generateMockScores());
      setAllBias(biasData.length > 0 ? biasData : generateMockBias());
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredMarks = useMemo(() => allMarks.filter(item => 
    (filters.year === 'Все' || item.Year === filters.year) &&
    (filters.classLevel === 'Все' || item.Class === filters.classLevel) &&
    (filters.subject === 'Все' || item.Subject === filters.subject) &&
    (filters.municipality === 'Все' || item.Municipality === filters.municipality) &&
    (filters.oo === 'Все' || item.OO === filters.oo)
  ), [allMarks, filters]);

  const filteredScores = useMemo(() => allScores.filter(item => 
    (filters.year === 'Все' || item.Year === filters.year) &&
    (filters.classLevel === 'Все' || item.Class === filters.classLevel) &&
    (filters.subject === 'Все' || item.Subject === filters.subject) &&
    (filters.municipality === 'Все' || item.Municipality === filters.municipality) &&
    (filters.oo === 'Все' || item.OO === filters.oo)
  ), [allScores, filters]);

  const filteredBias = useMemo(() => allBias.filter(item => 
    (filters.year === 'Все' || item.Year === filters.year) &&
    (filters.municipality === 'Все' || item.Municipality === filters.municipality) &&
    (filters.oo === 'Все' || item.OO === filters.oo)
  ), [allBias, filters]);

  const stats: Stats = useMemo(() => {
    if (filteredMarks.length === 0) return { schoolCount: 0, participantCount: 0, successRate: 0, qualityRate: 0 };
    const schoolSet = new Set(filteredMarks.map(m => m.Login));
    const totalParticipants = filteredMarks.reduce((sum, m) => sum + m.Participants, 0);
    const success = filteredMarks.reduce((sum, m) => sum + m.Participants * (m.Mark3 + m.Mark4 + m.Mark5) / 100, 0) / totalParticipants * 100;
    const quality = filteredMarks.reduce((sum, m) => sum + m.Participants * (m.Mark4 + m.Mark5) / 100, 0) / totalParticipants * 100;
    return { schoolCount: schoolSet.size, participantCount: totalParticipants, successRate: success, qualityRate: quality };
  }, [filteredMarks]);

  const marksChartData = useMemo(() => {
    if (filteredMarks.length === 0) return [];
    const totalParticipants = stats.participantCount;
    const avgMark2 = filteredMarks.reduce((sum, m) => sum + m.Participants * m.Mark2 / 100, 0) / totalParticipants * 100;
    const avgMark3 = filteredMarks.reduce((sum, m) => sum + m.Participants * m.Mark3 / 100, 0) / totalParticipants * 100;
    const avgMark4 = filteredMarks.reduce((sum, m) => sum + m.Participants * m.Mark4 / 100, 0) / totalParticipants * 100;
    const avgMark5 = filteredMarks.reduce((sum, m) => sum + m.Participants * m.Mark5 / 100, 0) / totalParticipants * 100;
    return [
      { name: '2', value: avgMark2 },
      { name: '3', value: avgMark3 },
      { name: '4', value: avgMark4 },
      { name: '5', value: avgMark5 },
    ];
  }, [filteredMarks, stats]);

  const scoresChartData = useMemo(() => {
    if (filteredScores.length === 0) return [];
    const pointsMap = new Map<number, { totalWeighted: number; totalParticipants: number }>();
    filteredScores.forEach(s => {
      const matchingMark = filteredMarks.find(m =>
        m.Year === s.Year && m.Class === s.Class && m.Subject === s.Subject &&
        m.Municipality === s.Municipality && m.OO === s.OO
      );
      const participants = matchingMark?.Participants || 0;
      if (participants > 0) {
        if (!pointsMap.has(s.Point)) {
          pointsMap.set(s.Point, { totalWeighted: 0, totalParticipants: 0 });
        }
        const data = pointsMap.get(s.Point)!;
        data.totalWeighted += participants * s.Percent / 100;
        data.totalParticipants += participants;
      }
    });
    return Array.from(pointsMap.entries())
      .map(([point, { totalWeighted, totalParticipants }]) => ({
        point,
        percent: totalParticipants ? (totalWeighted / totalParticipants) * 100 : 0,
      }))
      .sort((a, b) => a.point - b.point);
  }, [filteredScores, filteredMarks]);

  const selectedSchoolBias = useMemo(() => {
    if (filters.oo === 'Все') return [];
    return filteredBias.filter(b => b.OO === filters.oo).map(b => b.Marker);
  }, [filteredBias, filters]);

  const municipalityBiasList = useMemo(() => {
    return [...new Set(filteredBias.filter(b => b.MarkerCount > 0).map(b => b.OO))];
  }, [filteredBias]);

  const biasTrend = useMemo(() => {
    const years = [...new Set(allBias.map(b => b.Year))].sort().slice(-3);
    return years.map(year => {
      const yearBias = allBias.filter(b => b.Year === year);
      const biasedSchools = new Set(yearBias.filter(b => b.MarkerCount > 0).map(b => b.Login));
      const allSchools = new Set(yearBias.map(b => b.Login));
      return { year, percent: allSchools.size ? (biasedSchools.size / allSchools.size) * 100 : 0 };
    });
  }, [allBias]);

  if (loading) return <div className="text-center p-4">Загрузка данных...</div>;

  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Дашборд ВПР</h1>
      <DashboardHeader filters={filters} setFilters={setFilters} data={allMarks} />
      <StatsCards stats={stats} />
      <AnalysisCharts marksData={marksChartData} scoresData={scoresChartData} />
      <BiasAnalysis selectedSchoolBias={selectedSchoolBias} municipalityBiasList={municipalityBiasList} biasTrend={biasTrend} />
      <footer className="mt-8 text-center text-gray-500">© 2026 VPR Dashboard</footer>
    </div>
  );
};

export default App;
