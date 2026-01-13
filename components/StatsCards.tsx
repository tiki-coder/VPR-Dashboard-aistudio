import { Stats } from '../types';

const StatsCards: React.FC<{ stats: Stats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-blue-100 rounded shadow">
        <h3 className="font-bold">Количество ОО</h3>
        <p className="text-2xl">{stats.schoolCount}</p>
      </div>
      <div className="p-4 bg-green-100 rounded shadow">
        <h3 className="font-bold">Количество участников</h3>
        <p className="text-2xl">{stats.participantCount}</p>
      </div>
      <div className="p-4 bg-yellow-100 rounded shadow">
        <h3 className="font-bold">Успеваемость (%)</h3>
        <p className="text-2xl">{stats.successRate.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-purple-100 rounded shadow">
        <h3 className="font-bold">Качество (%)</h3>
        <p className="text-2xl">{stats.qualityRate.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StatsCards;
