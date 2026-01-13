import { useMemo } from 'react';
import { MarksData, FilterState } from '../types';

interface Props {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  data: MarksData[];
}

const DashboardHeader: React.FC<Props> = ({ filters, setFilters, data }) => {
  const years = useMemo(() => ['Все', ...new Set(data.map(d => d.Year).sort())], [data]);
  const classes = useMemo(() => ['Все', ...new Set(data.map(d => d.Class).sort())], [data]);
  const subjects = useMemo(() => ['Все', ...new Set(data.map(d => d.Subject).sort())], [data]);
  const municipalities = useMemo(() => ['Все', ...new Set(data.map(d => d.Municipality).sort())], [data]);
  const oos = useMemo(() => {
    const filtered = filters.municipality === 'Все' ? data : data.filter(d => d.Municipality === filters.municipality);
    return ['Все', ...new Set(filtered.map(d => d.OO).sort())];
  }, [data, filters.municipality]);

  const handleChange = (key: keyof FilterState) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, [key]: e.target.value };
    if (key === 'municipality') newFilters.oo = 'Все';
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select className="p-2 border rounded" value={filters.year} onChange={handleChange('year')}>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <select className="p-2 border rounded" value={filters.classLevel} onChange={handleChange('classLevel')}>
        {classes.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select className="p-2 border rounded" value={filters.subject} onChange={handleChange('subject')}>
        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select className="p-2 border rounded" value={filters.municipality} onChange={handleChange('municipality')}>
        {municipalities.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <select className="p-2 border rounded" value={filters.oo} onChange={handleChange('oo')}>
        {oos.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
};

export default DashboardHeader;
