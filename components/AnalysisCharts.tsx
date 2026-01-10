
import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  LabelList 
} from 'recharts';

interface ChartProps {
  marksData: { name: string; value: number }[];
  scoresData: { point: number; percentage: number }[];
}

const AnalysisCharts: React.FC<ChartProps> = ({ marksData, scoresData }) => {
  const markColors = ['#ef4444', '#f59e0b', '#10b981', '#6366f1'];

  // Calculate dynamic domain for Marks Chart
  const maxMarkValue = Math.max(...marksData.map(d => d.value), 0);
  const yDomainMax = Math.ceil(maxMarkValue + 5);

  // Generate specific ticks for Scores Chart to ensure max point is visible
  const scoreTicks = useMemo(() => {
    if (scoresData.length === 0) return [];
    const maxPoint = scoresData[scoresData.length - 1].point;
    const ticks = [];
    const step = maxPoint > 30 ? 5 : 2; // Adjust step based on max scale
    
    for (let i = 0; i <= maxPoint; i += step) {
      ticks.push(i);
    }
    // Always force the last point (max score) if it's not already there
    if (ticks[ticks.length - 1] !== maxPoint) {
      ticks.push(maxPoint);
    }
    return ticks;
  }, [scoresData]);

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (value === 0) return null;
    return (
      <text 
        x={x + width / 2} 
        y={y - 12} 
        fill="#64748b" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        className="text-xs font-bold"
      >
        {`${value}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 max-w-7xl mx-auto mb-8">
      {/* Chart 1: Marks Distribution */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 h-[450px]">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-8 flex items-center">
          <span className="w-1 h-6 bg-indigo-500 rounded-full mr-3"></span>
          Распределение отметок (%)
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={marksData} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 14, fontWeight: 600}}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 10}}
              domain={[0, yDomainMax]}
            />
            <Tooltip 
              cursor={{fill: '#f1f5f9', opacity: 0.4}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={100}>
              {marksData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={markColors[index % markColors.length]} />
              ))}
              <LabelList dataKey="value" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Score Distribution */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 h-[450px]">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-8 flex items-center">
          <span className="w-1 h-6 bg-indigo-500 rounded-full mr-3"></span>
          Распределение первичных баллов (%)
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={scoresData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="point" 
              axisLine={false} 
              tickLine={false} 
              ticks={scoreTicks}
              tick={{fill: '#64748b', fontSize: 10}}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 10}}
            />
            <Tooltip 
              cursor={{fill: '#f1f5f9', opacity: 0.4}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`${value}%`, 'Процент учащихся']}
              labelFormatter={(label) => `Балл: ${label}`}
            />
            <Bar dataKey="percentage" fill="#6366f1" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalysisCharts;
