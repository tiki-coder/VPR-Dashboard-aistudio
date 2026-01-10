import { MarksData, ScoreData, BiasData } from './types';

// Utility to generate mock data for the audit since real file loading is handled by the user
export const generateMockData = () => {
  const municipalities = ["г. Махачкала", "г. Каспийск", "Агульский муниципальный район", "Акушинский муниципальный район"];
  const subjects = ["Русский язык", "Математика", "Окружающий мир"];
  const years = [2021, 2022, 2023];
  const grades = ["4", "5"];

  const marks: MarksData[] = [];
  const scores: ScoreData[] = [];
  const bias: BiasData[] = [];

  municipalities.forEach(mun => {
    for (let i = 1; i <= 10; i++) {
      const login = `edu050${mun.charCodeAt(0)}${i}`;
      const oo = `МБОУ Школа №${i} ${mun}`;
      
      years.forEach(year => {
        grades.forEach(grade => {
          subjects.forEach(subject => {
            const participants = Math.floor(Math.random() * 200) + 50;
            
            // Marks
            marks.push({
              Year: year, Grade: grade, Subject: subject, Municipality: mun,
              Login: login, OO: oo, Participants: participants,
              Mark2: Math.random() * 15,
              Mark3: Math.random() * 30 + 10,
              Mark4: Math.random() * 40 + 20,
              Mark5: Math.random() * 25 + 5
            });

            // Scores
            const maxScore = subject === "Русский язык" ? 38 : 20;
            const scoreMap: Record<number, number> = {};
            for (let s = 0; s <= maxScore; s++) {
              scoreMap[s] = Math.random() * 10;
            }

            // Нормализуем распределение так, чтобы сумма процентов была 100 (или близко к тому)
            const total = Object.values(scoreMap).reduce((a, b) => a + b, 0);
            if (total > 0) {
              Object.keys(scoreMap).forEach(k => {
                const key = Number(k);
                scoreMap[key] = Number(((scoreMap[key] / total) * 100).toFixed(2));
              });
            }

            scores.push({
              Year: year, Grade: grade, Subject: subject, Municipality: mun,
              Login: login, OO: oo, Participants: participants,
              Scores: scoreMap
            });

            // Bias - простой пример
            bias.push({
              Year: year, Login: login, Municipality: mun, OO: oo,
              Markers: Math.random() > 0.9 ? ["Низкая выборка","Необъективность"] : [],
              MarkerCount: 0 // затем перезапишем ниже
            });
          });
        });
      });
    }
  });

  // Посчитаем реальные MarkerCount
  bias.forEach(b => {
    b.MarkerCount = b.Markers.length;
  });

  return { marks, scores, bias };
};
