
import { MarksData, ScoreData, BiasData } from './types.ts';

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
            scores.push({
              Year: year, Grade: grade, Subject: subject, Municipality: mun,
              Login: login, OO: oo, Participants: participants,
              Scores: scoreMap
            });
          });
        });

        // Bias markers (some schools have them)
        if (Math.random() > 0.8) {
          const markers = year === 2023 ? ["4 РУ", "4 МА"] : ["4 РУ"];
          bias.push({
            Year: year, Login: login, Municipality: mun, OO: oo,
            Markers: markers,
            MarkerCount: markers.length
          });
        }
      });
    }
  });

  return { marks, scores, bias };
};
