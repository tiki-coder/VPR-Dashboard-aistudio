import * as XLSX from 'xlsx';

export const generateMockMarks = (): MarksData[] => {
  const marks: MarksData[] = [];
  const municipalities = ['Municipality1', 'Municipality2', 'Municipality3', 'Municipality4'];
  const years = ['2021', '2022', '2023'];
  const classes = ['4', '5'];
  const subjects = ['Русский язык', 'Математика', 'Окружающий мир'];
  for (const mun of municipalities) {
    for (let i = 1; i <= 10; i++) {
      const oo = `${mun} School ${i}`;
      const login = `login${mun}${i}`;
      for (const year of years) {
        for (const cls of classes) {
          for (const sub of subjects) {
            const participants = Math.floor(Math.random() * 200) + 50;
            let mark2 = Math.random() * 20;
            let mark3 = Math.random() * 30;
            let mark4 = Math.random() * 30;
            let mark5 = Math.random() * 20;
            const sum = mark2 + mark3 + mark4 + mark5 || 1; // avoid div by 0
            mark2 = (mark2 / sum) * 100;
            mark3 = (mark3 / sum) * 100;
            mark4 = (mark4 / sum) * 100;
            mark5 = (mark5 / sum) * 100;
            marks.push({
              Year: year,
              Class: cls,
              Subject: sub,
              Municipality: mun,
              OO: oo,
              Login: login,
              Participants: participants,
              Mark2: mark2,
              Mark3: mark3,
              Mark4: mark4,
              Mark5: mark5,
            });
          }
        }
      }
    }
  }
  return marks;
};

export const generateMockScores = (): ScoreData[] => {
  const scores: ScoreData[] = [];
  const maxPoint = 40; // Пример, можно адаптировать по предмету
  const municipalities = ['Municipality1', 'Municipality2', 'Municipality3', 'Municipality4'];
  const years = ['2021', '2022', '2023'];
  const classes = ['4', '5'];
  const subjects = ['Русский язык', 'Математика', 'Окружающий мир'];
  for (const mun of municipalities) {
    for (let i = 1; i <= 10; i++) {
      const oo = `${mun} School ${i}`;
      const login = `login${mun}${i}`;
      for (const year of years) {
        for (const cls of classes) {
          for (const sub of subjects) {
            const pointPercents: number[] = [];
            let totalPercent = 0;
            for (let point = 0; point <= maxPoint; point++) {
              const percent = Math.random() * 10;
              pointPercents.push(percent);
              totalPercent += percent;
            }
            for (let point = 0; point <= maxPoint; point++) {
              scores.push({
                Year: year,
                Class: cls,
                Subject: sub,
                Municipality: mun,
                OO: oo,
                Login: login,
                Point: point,
                Percent: totalPercent ? (pointPercents[point] / totalPercent) * 100 : 0,
              });
            }
          }
        }
      }
    }
  }
  return scores;
};

export const generateMockBias = (): BiasData[] => {
  const bias: BiasData[] = [];
  const municipalities = ['Municipality1', 'Municipality2', 'Municipality3', 'Municipality4'];
  const years = ['2021', '2022', '2023'];
  const markers = ['4 РУ', '5 МА', '4 ОМ'];
  for (const mun of municipalities) {
    for (let i = 1; i <= 10; i++) {
      const oo = `${mun} School ${i}`;
      const login = `login${mun}${i}`;
      for (const year of years) {
        const marker = markers[Math.floor(Math.random() * markers.length)];
        const count = Math.random() > 0.7 ? 1 : 0;
        if (count > 0) {
          bias.push({
            Year: year,
            Municipality: mun,
            OO: oo,
            Login: login,
            Marker: marker,
            MarkerCount: count,
          });
        }
      }
    }
  }
  return bias;
};

export const loadExcelData = async (file: string): Promise<any[]> => {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error('File not found');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
    return [];
  }
};
