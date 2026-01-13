import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  marksData: { name: string; value: number }[];
  scoresData: { point: number; percent: number }[];
}

const AnalysisCharts: React.FC<Props> = ({ marksData, scoresData }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Распределение оценок</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={marksData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" name="Процент" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="text-xl font-bold mb-2 mt-6">Распределение баллов</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={scoresData}>
          <XAxis dataKey="point" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="percent" fill="#82ca9d" name="Процент" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalysisCharts;
