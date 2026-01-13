interface Props {
  selectedSchoolBias: string[];
  municipalityBiasList: string[];
  biasTrend: { year: string; percent: number }[];
}

const BiasAnalysis: React.FC<Props> = ({ selectedSchoolBias, municipalityBiasList, biasTrend }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Анализ предвзятости</h2>
      <p><strong>Предвзятость для выбранной ОО:</strong> {selectedSchoolBias.length > 0 ? selectedSchoolBias.join(', ') : 'Нет данных'}</p>
      <p><strong>Список ОО с предвзятостью в муниципалитете:</strong> {municipalityBiasList.length > 0 ? municipalityBiasList.join(', ') : 'Нет'}</p>
      <p><strong>Тренд предвзятости (% ОО за последние 3 года):</strong> {biasTrend.map(t => `${t.year}: ${t.percent.toFixed(2)}%`).join(' | ')}</p>
    </div>
  );
};

export default BiasAnalysis;
